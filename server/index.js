import express from "express";
import cors from "cors"
import dotenv from "dotenv";

import { connectToDatabase } from "./src/mongoConnection.js"
import { dailyOrderPipeLine, monthlyOrderPipeline, QuarterlyOrderPipeline, yearlyOrderPipeline } from "./src/pipelines/OrderPipeline.js";
import { monthLyCustomerTrackpipeline, quarterlyCustomerTrackpipeline, yearlyCustomerTrackpipeline } from "./src/pipelines/customerPipeline.js";
import { monthlyCustomerOrderPipeLine, quarterlyCustomerOrderPipeline, yearlyCustomerOrderPipeline } from "./src/pipelines/customerOrderPipeline.js";

const PORT = 3000
const app = express();

app.use(cors());
app.use(express.json());
dotenv.config()

app.get('/orders/totalpriceset', async (req, res) => {
    try {

        const { intervalType } = req.query;
        let pipeline;
        if (intervalType === "year")
            pipeline = yearlyOrderPipeline;
        if (intervalType === "quarter")
            pipeline = QuarterlyOrderPipeline;
        if (intervalType === "month")
            pipeline = monthlyOrderPipeline;
        if (intervalType === "daily")
            pipeline = dailyOrderPipeLine;

        const { database } = await connectToDatabase();
        const collection = database.collection('shopifyOrders');

        const results = await collection.aggregate(pipeline).toArray();
        res.json(results);
    } catch (err) {
        res.status(500).send(err);
        console.log(err)
    }
});


app.get('/customers/track', async (req, res) => {
    const { intervalType } = req.query;
    let pipeline;
    if (intervalType === "year")
        pipeline = yearlyCustomerTrackpipeline;
    if (intervalType === "quarter")
        pipeline = quarterlyCustomerTrackpipeline;
    if (intervalType === "month")
        pipeline = monthLyCustomerTrackpipeline;

    try {
        const { database } = await connectToDatabase();
        const collection = database.collection('shopifyCustomers');
        const results = await collection.aggregate(pipeline).toArray();
        res.json(results);
    } catch (error) {
        console.error('Aggregation Error:', error);
    }

})


app.get('/orders/repeatorders', async (req, res) => {
    const { intervalType } = req.query;
    let pipeline;
    if (intervalType === "year")
        pipeline = yearlyCustomerOrderPipeline;
    else if (intervalType === "quarter")
        pipeline = quarterlyCustomerOrderPipeline;
    else if (intervalType === "month")
        pipeline = monthlyCustomerOrderPipeLine;
    else {
        res.status(500).send('unable to find interval type');
        return;
    }
    try {
        const { database } = await connectToDatabase();
        const collection = database.collection('shopifyOrders');
        const results = await collection.aggregate(pipeline).toArray();
        res.json(results);
    } catch (err) {
        res.status(500).send('Error retrieving customers');
    }
})

app.get('/customerbycity', async (req, res) => {
    try {
        const { database } = await connectToDatabase();
        const collection = database.collection('shopifyCustomers');
        const customers = await collection.aggregate([
            {
                $project: {
                    _id: 0,
                    name: { $concat: ["$first_name", " ", "$last_name"] },
                    city: "$default_address.city"
                },

            },
            { $sample: { size: 10 } }
        ]).toArray();
        res.json(customers);
    } catch (error) {
        res.status(500).send('Error retrieving customers');
    }
})


app.get('/customers/cohortsvalue', async (req, res) => {



    const pipeline = [
        {
            $match: {
                "customer.id": { $ne: null }
            }
        },
        {
            $group: {
                _id: "$customer.id",
                first_purchase: { $min: { $dateFromString: { dateString: "$created_at" } } },
                total_spent: { $sum: { $toDouble: "$total_price_set.shop_money.amount" } }
            }
        },
        {
            $lookup: {
                from: "shopifyCustomers",
                localField: "_id",
                foreignField: "id",
                as: "customer_info"
            }
        },
        {
            $unwind: "$customer_info"
        },
        {
            $project: {
                _id: 0,
                customer_name: {
                    $concat: [
                        "$customer_info.first_name",
                        " ",
                        "$customer_info.last_name"
                    ]
                },
                first_purchase: {
                    $dateToString: {
                        format: "%d-%m-%Y",
                        date: "$first_purchase",
                        timezone: "UTC"
                    }
                },
                total_spent: 1
            }
        }
    ];

    try {
        const { database } = await connectToDatabase();
        const collection = database.collection('shopifyOrders');
        const results = await collection.aggregate(pipeline).toArray();
        res.json(results);

    } catch (error) {
        res.status(500).send('Error retrieving customers');
    }
})

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});