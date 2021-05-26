const Cart = require('../models/cart')
exports.addItemToCart = (req, res) => {
  Cart.find({ user: req.user._id }).exec((error, cart) => {
    if (error) return res.status(400).json({ error })
    if (cart[0]) {
      const product = req.body.cartItems.product
      const item = cart[0].cartItems.find((c) => c.product == product)
      let condition, action
      if (item) {
        condition = { user: req.user._id, 'cartItems.product': product }
        update = {
          $set: {
            'cartItems.$': {
              ...req.body.cartItems,
              quantity: item.quantity + req.body.cartItems.quantity,
            },
          },
        }
        Cart.findOneAndUpdate(condition, update).exec((error, _cart) => {
          if (error) return res.status(400).json({ error })
          if (_cart) {
            return res.status(201).json({ cart: _cart })
          }
        })
      } else {
        condition = { user: req.user._id }
        update = {
          $push: {
            cartItems: req.body.cartItems,
          },
        }
        Cart.findOneAndUpdate(condition, update).exec((error, _cart) => {
          if (error) return res.status(400).json({ error })
          if (_cart) {
            return res.status(201).json({ cart: _cart })
          }
        })
      }
    } else {
      const cart = new Cart({
        user: req.user._id,
        cartItems: req.body.cartItems,
      })

      cart.save((error, cart) => {
        if (error) return res.status(400).json({ error })
        if (cart) {
          return res.status(201).json({ cart })
        }
      })
    }
  })
}
