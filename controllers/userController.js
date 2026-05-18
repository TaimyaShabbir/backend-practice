const persons = require("../models/persons");
const User = require("../models/User");

const getUser = async (req, res) => {
  try {

    const user = await User.findById(req.user.id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getPaginatedPersons = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const skip = (page - 1) * limit;
    
    const seniority = req.query.seniority;

    const matchStage = {
      user: "marketing_and_sales@endress.com",

      email_status: "verified",

      "address.lng": {
        $exists: true,
        $ne: null,
      },
    };
    if (seniority) {
      matchStage.seniority = seniority;
    }

    const pipeline = [

      {
        $match: matchStage,
      },

      {
        $project: {
          seniority: 1,
          title: 1,
          _id: 0,
        },
      },

      {
        $skip: skip,
      },

      {
        $limit: limit,
      },

    ];

    const users = await persons.aggregate(pipeline);

    const totalUsers = await persons.countDocuments(matchStage);

    return res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers,
      users,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  getUser,
  getPaginatedPersons,
};