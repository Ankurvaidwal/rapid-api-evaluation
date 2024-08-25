export const monthLyCustomerTrackpipeline = [
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
                month: {
                    $dateToString: { format: "%Y-%m", date: "$created_date" }
                }
            },
            new_customers: { $sum: 1 }
        }
    },
    {
        $project: {
            date: "$_id.month",
            new_customers: 1,
            _id: 0
        }
    },
    { $sort: { "date": 1 } }
];

export const quarterlyCustomerTrackpipeline = [
    {
        $addFields: {
            created_date: {
                $dateFromString: { dateString: "$created_at" }
            }
        }
    },
    {
        $addFields: {
            quarter: {
                $concat: [
                    { $toString: { $year: "$created_date" } },
                    "-Q",
                    { $toString: { $ceil: { $divide: [{ $month: "$created_date" }, 3] } } }
                ]
            }
        }
    },
    {
        $group: {
            _id: "$quarter",
            new_customers: { $sum: 1 }
        }
    },
    {
        $project: {
            date: "$_id",
            new_customers: 1,
            _id: 0
        }
    },
    { $sort: { "date": 1 } }
];

export const yearlyCustomerTrackpipeline = [
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
                year: {
                    $dateToString: { format: "%Y", date: "$created_date" }
                }
            },
            new_customers: { $sum: 1 }
        }
    },
    {
        $project: {
            date: "$_id.year",
            new_customers: 1,
            _id: 0
        }
    },
    { $sort: { "date": 1 } }
];
