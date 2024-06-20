const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const dataSchema = new mongoose.Schema({
  // email: {
  //   type: String,
  //   required: true,
  //   unique: true,
  //   lowercase: true,
  //   validate: {
  //     validator: function(v) {
  //       // Email must be a valid email address
  //       return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(v);
  //     },
  //     message: props => `${props.value} is not a valid email address.`
  //   }
  // },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    validate: {
      validator: function(v) {
        // Username must contain at least three letters
        return /^[a-zA-Z]{3,}$/.test(v);
      },
      message: props => `${props.value} is not a valid username. It must contain at least three letters.`
    }
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        // Password must have at least 4 characters
        if (v.length < 4) return false;

        // Password must contain at least one capital letter
        if (!/[A-Z]/.test(v)) return false;

        // Password must contain at least one symbol
        if (!/[^A-Za-z0-9]/.test(v)) return false;

        return true;
      },
      message: props => `${props.value} is not a valid password. It must have at least 4 characters, one capital letter, and one symbol.`
    }
  }, location: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        // Location should not be an empty string
        return v.length > 0;
      },
      message: props => 'Location is required.'
    }
  }
}, { validateBeforeSave: true });
dataSchema.pre('save', async function (next) {
    try {
      if (this.isNew) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
      }
      next()
    } catch (error) {
      next(error)
    }
  })

const DataModel = mongoose.model('DataModel', dataSchema);

module.exports = DataModel;







