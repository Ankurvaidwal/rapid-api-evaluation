export const monthlyCustomerOrderPipeLine = [
    {
        $addFields: {
            created_date: {
                $dateFromString: { dateString: "$created_at" }
            }
        }
    },
    {
        $group: {
            _id: {
                customer_id: "$customer.id",
                month: {
                    $dateToString: { format: "%Y-%m", date: "$created_date" }
                }
            },
            purchase_count: { $sum: 1 }
        }
    },
    {
        $match: {
            purchase_count: { $gt: 1 }
        }
    },
    {
        $lookup: {
            from: "shopifyCustomers",
            localField: "_id.customer_id",
            foreignField: "id",
            as: "customer_info"
        }
    },
    {
        $unwind: "$customer_info"
    },
    {
        $project: {
            date: "$_id.month",
            customer_name: {
                $concat: [
                    "$customer_info.first_name",
                    " ",
                    "$customer_info.last_name"
                ]
            },
            purchase_count: 1,
            _id: 0
        }
    },
    { $sort: { "date": 1, "customer_name": 1 } }
];

export const quarterlyCustomerOrderPipeline = [
    {
        $addFields: {
            created_date: {
                $dateFromString: { dateString: "$created_at" }
            }
        }
    },
    {
        $group: {
            _id: {
                customer_id: "$customer.id",
                quarter: {
                    $concat: [
                        { $dateToString: { format: "%Y Q", date: "$created_date" } },
                        { $toString: { $ceil: { $divide: [{ $month: "$created_date" }, 3] } } }
                    ]
                }
            },
            purchase_count: { $sum: 1 }
        }
    },
    {
        $match: {
            purchase_count: { $gt: 1 }
        }
    },
    {
        $lookup: {
            from: "shopifyCustomers",
            localField: "_id.customer_id",
            foreignField: "id",
            as: "customer_info"
        }
    },
    {
        $unwind: "$customer_info"
    },
    {
        $project: {
            date: "$_id.quarter",
            customer_name: {
                $concat: [
                    "$customer_info.first_name",
                    " ",
                    "$customer_info.last_name"
                ]
            },
            purchase_count: 1,
            _id: 0
        }
    },
    { $sort: { "date": 1, "customer_name": 1 } }
];

export const yearlyCustomerOrderPipeline = [
    {
        $addFields: {
            created_date: {
                $dateFromString: { dateString: "$created_at" }
            }
        }
    },
    {
        $group: {
            _id: {
                customer_id: "$customer.id",
                year: {
                    $dateToString: { format: "%Y", date: "$created_date" }
                }
            },
            purchase_count: { $sum: 1 }
        }
    },
    {
        $match: {
            purchase_count: { $gt: 1 }
        }
    },
    {
        $lookup: {
            from: "shopifyCustomers",
            localField: "_id.customer_id",
            foreignField: "id",
            as: "customer_info"
        }
    },
    {
        $unwind: "$customer_info"
    },
    {
        $project: {
            date: "$_id.year",
            customer_name: {
                $concat: [
                    "$customer_info.first_name",
                    " ",
                    "$customer_info.last_name"
                ]
            },
            purchase_count: 1,
            _id: 0
        }
    },
    {
        $sort: {
            "date": 1,
            "customer_name": 1
        }
    }
];