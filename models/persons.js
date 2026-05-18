const mongoose = require("mongoose");

const employmentSchema = new mongoose.Schema(
  {
    company_name: {
      type: String,
      required: true,
      trim: true,
    },

    current: {
      type: Boolean,
      required: true,
      default: false,
    },

    description: {
      type: String,
      default: null,
    },

    end_date: {
      type: Date,
      default: null,
    },

    start_date: {
      type: Date,
      default: null,
    },

    title: {
      type: String,
      default: null,
      trim: true,
    },
  },
  {
    _id: false,
  }
);

const addressSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      default: null,
      trim: true,
    },

    country: {
      type: String,
      required: true,
      trim: true,
    },

    formattedValue: {
      type: String,
      required: true,
      trim: true,
    },

    lat: {
      type: Number,
      required: true,
    },

    lng: {
      type: Number,
      required: true,
    },

    postalCode: {
      type: String,
      default: null,
      trim: true,
    },

    state: {
      type: String,
      default: null,
      trim: true,
    },
  },
  {
    _id: false,
  }
);

const phoneSchema = new mongoose.Schema(
  {
    sanitized_number: {
      type: String,
      required: true,
      trim: true,
    },

    status_cd: {
      type: String,
      default: null,
      trim: true,
    },

    type_cd: {
      type: String,
      default: null,
      trim: true,
    },
  },
  {
    _id: false,
  }
);

const personSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    person_id: {
      type: String,
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      default: null,
      trim: true,
    },

    seniority: {
      type: String,
      enum: [
        "executive",
        "director",
        "manager",
        "senior",
        "entry",
        null,
      ],
      default: null,
    },
    email: {
      type: String,
      default: null,
      lowercase: true,
      trim: true,
    },

    email_status: {
      type: String,
      enum: [
        "verified",
        "unverified",
        "invalid",
        null,
      ],
      default: null,
    },
    linkedin_url: {
      type: String,
      required: true,
      trim: true,
    },

    photo_url: {
      type: String,
      default: null,
    },
    persona_name: {
      type: String,
      required: true,
      trim: true,
    },

    recommendation_reason: {
      type: String,
      required: true,
      trim: true,
    },
    company_id: [
      {
        type: String,
        trim: true,
      },
    ],

    segment_id: [
      {
        type: String,
        default: null,
      },
    ],
    address: {
      type: addressSchema,
      required: true,
    },

    phone_numbers: {
      type: phoneSchema,
      default: null,
    },

    employment: {
      type: [employmentSchema],
      required: true,
      default: [],
    },
    user: {
      type: String,
      default: null,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// module.exports = mongoose.model("Person", personSchema);
module.exports = mongoose.model("persons", personSchema);