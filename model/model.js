const mongoose = require('mongoose');

const userlogindata = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  firstName: {
    type: String,
    default: ""
  },
  lastName: {
    type: String,
    default: ""
  },
  city: {
    type: String,
    default: ""
  },
  state: {
    type: String,
    default: ""
  },
  country: {
    type: String,
    default: ""
  },
  photo: {
    type: String,
    default: ""
  }
});

const user_info = mongoose.model('user_info', userlogindata)

// Country schema
const countrySchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  }
});

const Country = mongoose.model('Country', countrySchema);

// State schema
const stateSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
    required: true
  }
});

const State = mongoose.model('State', stateSchema);

// City schema
const citySchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  state: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'State',
    required: true
  }
});

const City = mongoose.model('City', citySchema);


module.exports = { user_info, Country, State, City };