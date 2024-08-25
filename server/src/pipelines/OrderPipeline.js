export const dailyOrderPipeLine = [
  {
    $addFields: {
      created_date: {
        $dateFromString: { dateString: "$created_at" }
      }
    }
  },
  {
    $addFields: {
      total_amount: {
        $toDouble: "$total_price_set.shop_money.amount"
      }
    }
  },
  {
    $group: {
      _id: {
        date: {
          $dateToString: { format: "%Y-%m-%d", date: "$created_date" }
        }
      },
      total_price: { $sum: "$total_amount" }
    }
  },
  {
    $project: {
      date: "$_id.date",
      total_price: 1,
      _id: 0
    }
  },
  { $sort: { "date": 1 } }
];

export const monthlyOrderPipeline = [
  {
    $addFields: {
      created_date: {
        $dateFromString: { dateString: "$created_at" }
      }
    }
  },
  {
    $addFields: {
      total_amount: {
        $toDouble: "$total_price_set.shop_money.amount"
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
      total_price: { $sum: "$total_amount" }
    }
  },
  {
    $project: {
      date: "$_id.month",
      total_price: 1,
      _id: 0
    }
  },
  { $sort: { "date": 1 } }
];

export const QuarterlyOrderPipeline = [
  {
    $addFields: {
      created_date: {
        $dateFromString: { dateString: "$created_at" }
      }
    }
  },
  {
    $addFields: {
      total_amount: {
        $toDouble: "$total_price_set.shop_money.amount"
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
      total_price: { $sum: "$total_amount" }
    }
  },
  {
    $project: {
      date: "$_id",
      total_price: 1,
      _id: 0
    }
  },
  { $sort: { "date": 1 } }
];

export const yearlyOrderPipeline = [
  {
    $addFields: {
      created_date: {
        $dateFromString: { dateString: "$created_at" }
      }
    }
  },
  {
    $addFields: {
      total_amount: {
        $toDouble: "$total_price_set.shop_money.amount"
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
      total_price: { $sum: "$total_amount" }
    }
  },
  {
    $project: {
      date: "$_id.year",
      total_price: 1,
      _id: 0
    }
  },
  { $sort: { "date": 1 } }
];