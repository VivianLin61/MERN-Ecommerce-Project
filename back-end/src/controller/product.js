const Product = require('../models/product')
const shortid = require('shortid')
const slugify = require('slugify')
const Category = require('../models/category')

exports.createProduct = (req, res) => {
  //   res.status(200).json({ file: req.files, body: req.body })

  const { name, price, description, category, quantity, createdBy } = req.body
  let productPictures = []

  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename }
    })
  }

  const product = new Product({
    name: name,
    slug: slugify(name),
    price,
    quantity,
    description,
    productPictures,
    category,
    createdBy: req.user._id,
  })

  product.save((error, product) => {
    if (error) return res.status(400).json({ error })
    if (product) {
      res.status(201).json({ product })
    }
  })
}

exports.getProductsBySlug = (req, res) => {
  const { slug } = req.params
  Category.findOne({ slug: slug })
    .select('_id')
    .exec((error, category) => {
      if (error) {
        return res.status(400).json({ error })
      }

      if (category) {
        Product.find({ category: category._id }).exec((error, products) => {
          if (error) {
            return res.status(400).json({ error })
          }

          if (products.length > 0) {
            res.status(200).json({
              products,
              priceRange: {
                under50: 50,
                under100: 100,
                under150: 150,
                under250: 250,
                under400: 400,
                over400: 401,
              },
              productsByPrice: {
                under50: products.filter((product) => product.price <= 50),
                under100: products.filter(
                  (product) => product.price > 50 && product.price <= 100
                ),
                under150: products.filter(
                  (product) => product.price > 100 && product.price <= 150
                ),
                under250: products.filter(
                  (product) => product.price > 150 && product.price <= 250
                ),
                under400: products.filter(
                  (product) => product.price > 250 && product.price <= 400
                ),
                over400: products.filter((product) => product.price > 400),
              },
            })
          }
        })
      }
    })
}
