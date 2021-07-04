const mongoose = require("mongoose");
// to have crypto, the process is frim docs
/**
 * FIXME: potman query with "password" not happening, "encry_password" needed
 * DONE: following debugs
 */
const crypto = require("crypto"); // DEBUG:
// const createHmac = require("crypto");

// to have uuid, the process is from docs
const { v4: uuidv4 } = require("uuid");

//   const { Schema } = mongoose;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    lastname: {
      type: String,
      maxlength: 32,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    userinfo: {
      type: String,
      trim: true,
    },
    //   TODO: modification required DONE:
    encry_password: {
      type: String,
      required: true,
    },
    salt: String,
    role: {
      type: Number,
      default: 0,
    },
    purchases: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

// adding virtual properties with getter-setters to userSchema
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password; // _<var-name> makes the var private
    this.salt = uuidv4();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

// schema method to encrypt the user provided plain password
userSchema.methods = {
  authenticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
    // returns true/false depending upon the match
  },
  // DEBUG:
  securePassword: function (plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (error) {
      return "";
    }
  },
  // securePassword: function (plainpassword) {
  //   if (!plainpassword) {
  //     try {
  //       return createHmac("sha256", this.salt)
  //         .update(plainpassword)
  //         .digest("hex");
  //     } catch (error) {
  //       return "";
  //     }
  //   }
  // },
};

module.exports = mongoose.model("UserModel", userSchema);
