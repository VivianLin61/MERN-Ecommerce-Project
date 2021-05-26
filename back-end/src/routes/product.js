const express = require('express')
const router = express.Router()
const multer = require('multer')
const { requireSignin, adminMiddleware } = require('../common-middleware/index')
const { createProduct } = require('../controller/product')
const path = require('path')
const shortid = require('shortid')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), 'uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + '-' + file.originalname)
  },
})
const upload = multer({ storage: storage })
router.post(
  '/product/create',
  requireSignin,
  adminMiddleware,
  upload.array('productPicture'),
  createProduct
)

module.exports = router
