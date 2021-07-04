const jwt = require('jsonwebtoken')
const shortid = require('shortid')
const multer = require('multer')
const path = require('path')
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), 'uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + '-' + file.originalname)
  },
})

const s3 = new aws.S3({
  accessKeyId: 'AKIATUUOPMUWHPY5DDDY',
  secretAccessKey: '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',
})
exports.upload = multer({ storage: storage })

exports.uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'vivian-ecommerce-app',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname })
    },
    key: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    },
  }),
})

exports.requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]
    const user = jwt.verify(token, process.env.JWT_SECRET)
    req.user = user
  } else {
    return res.status(400).json({ message: 'auth requires' })
  }
  next()
}

exports.userMiddleware = (req, res, next) => {
  if (req.user.role !== 'user') {
    return res.status(400).json({ message: 'User Access denied' })
  }
  next()
}
exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(400).json({ message: 'Admin access denied' })
  }
  next()
}
