const persons = require("../models/persons");

const getSeniorityCounts = async (req, res) => {
  try {

    const pipeline = [

      {
        $group: {
          _id: "$seniority",
          count: {
            $sum: 1,
          },
        },
      },

      {
        $sort: {
          count: -1,
        },
      },

    ];

    const result = await persons.aggregate(pipeline);

    const formattedData = {};

    result.forEach((item) => {

      if (item._id) {
        formattedData[item._id] = item.count;
      }

    });

    return res.status(200).json({
      success: true,
      data: formattedData,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  getSeniorityCounts,
};