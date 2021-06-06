const express = require('express')
const router = express.Router()
const multer = require('multer')
const { requireSignin, adminMiddleware } = require('../common-middleware/index')
const {
  createProduct,
  getProductsBySlug,
  getProductDetailsById,
  deleteProductById,
  getProducts,
} = require('../controller/product')
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
router.get('/products/:slug', getProductsBySlug)
router.get('/product/:productId', getProductDetailsById)
router.delete(
  '/product/deleteProductById',
  requireSignin,
  adminMiddleware,
  deleteProductById
)
router.post('/product/getProducts', requireSignin, adminMiddleware, getProducts)
module.exports = router
