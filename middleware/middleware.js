const { user_info, Country, State, City } = require('../model/model');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'mysecretkey';
const multer = require('multer');


const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = decoded;
    console.log(req.user.user)
    next();
  });
};


// Create a storage engine for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../Profile_management_app/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop());
  }
});

// Create a Multer instance
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // Maximum image size allowed 5MB
});

module.exports = {
  upload: upload,
  verifyTokenfunction: verifyToken
};
