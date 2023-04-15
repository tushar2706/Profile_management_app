const { user_info, Country, State, City } = require('../model/model');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const validate  = require('../middleware/middleware');
const jwt = require('jsonwebtoken');
const path = require('path');
const upload = validate.upload;

const getalluserdata = async (req, res, next) => {
  try {
    const User = await user_info.find({});
    if (User) {
      return res.status(200).json(User)
    }
    return res.status(400).json({
      success: false,
      Message: 'Users not found!'
    })
  }
  catch (err) {
    console.log(err)
  }
}

const signup = async (req, res, next) => {
  const { email } = req.body;

  try {
    let user = await user_info.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const otp = generateOTP();
    const newuser = new user_info({
      email
    });

    await newuser.save()
    console.log(`OTP for ${email}: ${otp}`);
    return res.status(200).json({
      Success: 'Account created!',
      message: `OTP for ${email}: ${otp}`
    });

  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

const generateOTP = () => {
  let otp = Math.random();
  otp = otp * 1000000;
  otp = parseInt(otp);
  console.log(otp);
  return otp;
}


const login = async (req, res) => {
  const { email } = req.body;

  try {
    let user = await user_info.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found. Please register first!' });
    }
    const otp = generateOTP();
    // Set JWT token and return user details
    const options = { expiresIn: '1h' };
    const JWT_SECRET = 'mysecretkey';
    const payload = { user: { email: user.email } };
    const token = jwt.sign(payload, JWT_SECRET, options);

    return res.status(200).json({ token, user, otp });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: 'Server error' });
  }
};


const updateprofile = async (req, res) => {
  const { email } = req.body.email;

  try {
    const user = await user_info.findOne({ email: email });
    console.log(user)

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate and update first name
    const firstName = req.body.firstname;

    if (!firstName || firstName.trim().length === 0 || firstName.length > 40) {
      return res.status(400).json({ message: 'Invalid first name' });
    }

    user.firstName = firstName;

    // Validate and update last name
    const lastName = req.body.lastname;

    if (!lastName || lastName.trim().length === 0 || lastName.length > 40) {
      return res.status(400).json({ message: 'Invalid last name' });
    }

    user.lastName = lastName;

    // Validate and update city
    const received_city = req.body.city;
    const city = await City.findOne({ name: received_city });

    if (!city) {
      return res.status(400).json({ message: 'Invalid city' });
    }

    let stringId = city.state.toString()
    const statemodel = await State.findOne({ _id: stringId });

    if (statemodel.name !== req.body.state) {
      return res.status(400).json({ message: 'City does not belong to selected state' });
    }

    user.city = city.name;

    // Validate and update state
    const state = await State.findOne({ name: req.body.state });
    console.log(state)

    if (!state) {
      return res.status(400).json({ message: 'Invalid state' });
    }

    let stringId2 = state.country.toString()
    const countrymodel = await Country.findOne({ _id: stringId2 });

    if (countrymodel.name !== req.body.country) {
      return res.status(400).json({ message: 'State does not belong to selected country' });
    }

    user.state = state.name;

    // Validate and update country
    const country = await Country.findOne({ name: req.body.country });

    if (!country) {
      return res.status(400).json({ message: 'Invalid country' });
    }

    user.country = country.name;

    // Save changes to user profile
    await user.save();

    return res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getprofile = async (req, res) => {
  const user = await user_info.find({ email: req.user.user.email });
  console.log(user)

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({
    email: req.user.user.email,
    firstName: user[0].firstName,
    lastName: user[0].lastName,
    city: user[0].city,
    state: user[0].state,
    country: user[0].country,
    photo: user[0].photo
  });
};


const photoupload = async (req, res) => {
  try {
  const data = {
    photo: req.file.path,
    email: JSON.parse(req.body.json)
  };
  console.log(data.photo)
  console.log(data.email)
    const user = await user_info.findOne({ email: data.email.email });
    console.log(user)

    if (!user) {
      return res.status(404).send('User not found');
    }

    user.photo = data.photo;
    await user.save();
    console.log(user)

    res.status(200).json({user, message: 'Photo uploaded successfully' })
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};


module.exports = { getalluserdata, signup, login, getprofile, updateprofile, photoupload }