import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../components/Layout'
import Card from '../../components/UI/Card'
import { MaterialButton } from '../../components/MaterialUI'
import CartItem from './CartItem'
import { addToCart, getCartItems, removeCartItem } from '../../actions'
import './style.css'

const CartPage = (props) => {
  const cart = useSelector((state) => state.cart)
  const auth = useSelector((state) => state.auth)
  const [cartItems, setCartItems] = useState(cart.cartItems)
  const dispatch = useDispatch()

  useEffect(() => {
    setCartItems(cart.cartItems)
  }, [cart.cartItems])

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCartItems())
    }
  }, [auth.authenticate])
  const onQuantityIncrement = (_id, qty) => {
    //console.log({_id, qty});
    const { name, price, img } = cartItems[_id]
    dispatch(addToCart({ _id, name, price, img }, 1))
  }

  const onQuantityDecrement = (_id, qty) => {
    const { name, price, img } = cartItems[_id]
    dispatch(addToCart({ _id, name, price, img }, -1))
  }

  const onRemoveCartItem = (_id) => {
    dispatch(removeCartItem({ productId: _id }))
  }

  return (
    <div>
      <Layout>
        <div className='cartContainer' style={{ alignItems: 'flex-start' }}>
          <Card
            headerLeft={`My Cart`}
            headerRight={<div>Deliver to</div>}
            // style={{ width: 'calc(100% - 400px)', overflow: 'hidden' }}
          >
            <div>
              {cartItems ? (
                <div className='cartItemsContainer'>
                  {Object.keys(cartItems).map((key, index) => (
                    <CartItem
                      key={index}
                      cartItem={cartItems[key]}
                      onQuantityInc={onQuantityIncrement}
                      onQuantityDec={onQuantityDecrement}
                      onRemoveCartItem={onRemoveCartItem}
                    />
                  ))}
                </div>
              ) : (
                <div></div>
              )}

              <div style={{ width: '250px' }}>
                <MaterialButton
                  title='PLACE ORDER'
                  onClick={() => props.history.push(`/checkout`)}
                />
              </div>
            </div>
          </Card>
          <Card headerLeft={`Checkout`} style={{ width: '500px' }}>
            Price
          </Card>
        </div>

        <>
          <div></div>
        </>
      </Layout>
    </div>
  )
}

export default CartPage
