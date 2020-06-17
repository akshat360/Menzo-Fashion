var mongoose = require('mongoose');
const crypto = require('crypto');

const bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema(
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
      trim: true,
      required: true,
      unique: true,
    },
    userinfo: {
      type: String,
      trim: true,
    },
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

userSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;

    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (plainpassword) {
    return bcrypt.compareSync(plainpassword, this.encry_password);
  },

  securePassword: function (plainpassword) {
    if (!plainpassword) return 'error';
    try {
      return bcrypt.hashSync(plainpassword, 10);
    } catch (err) {
      return err;
    }
  },
};

module.exports = mongoose.model('User', userSchema);
