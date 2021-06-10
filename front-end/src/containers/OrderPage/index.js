/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getOrders } from '../../actions'
import Layout from '../../components/Layout'
import Card from '../../components/UI/Card'
import { BiDollar } from 'react-icons/bi'
import { IoIosArrowForward } from 'react-icons/io'
import { generatePublicUrl } from '../../urlConfig'
import './style.css'
import { Breed } from '../../components/MaterialUI'

/**
 * @author
 * @function OrderPage
 **/

const OrderPage = (props) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(getOrders())
  }, [])

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date)
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
    }
    return ''
  }

  return (
    <Layout>
      <div style={{ maxWidth: '1160px', margin: '5px auto' }}>
        <Breed
          breed={[
            { name: 'Home', href: '/' },
            { name: 'My Account', href: '/account' },
            { name: 'My Orders', href: '/account/orders' },
          ]}
          breedIcon={<IoIosArrowForward />}
        />
        <div className='orderTitle'>Orders</div>
        {user.orders.map((order) => {
          return order.items.map((item) => (
            <Card style={{ display: 'block', margin: '5px 0' }}>
              <Link
                to={`/order_details/${order._id}`}
                className='orderItemContainer'
              >
                <div className='orderImgContainer'>
                  <img
                    className='orderImg'
                    src={generatePublicUrl(
                      item.productId.productPictures[0].img
                    )}
                  />
                </div>
                <div className='orderRow'>
                  <div className='orderName'>{item.productId.name}</div>
                  <div className='orderPrice'>
                    Price:
                    <span style={{ fontWeight: '300' }}>
                      <BiDollar />
                      {item.payablePrice}
                    </span>
                  </div>
                  <div className='orderQuantity'>
                    Quantity:{' '}
                    <span style={{ fontWeight: '300' }}>
                      {item.purchasedQty}
                    </span>
                  </div>
                  <div className='orderDate'>
                    Date Ordered:{' '}
                    <span style={{ fontWeight: '300' }}>
                      {' '}
                      {formatDate(order.createdAt)}
                    </span>
                  </div>

                  {/* <div>{order.paymentStatus}</div> */}
                </div>
              </Link>
            </Card>
          ))
        })}
      </div>
    </Layout>
  )
}

export default OrderPage
