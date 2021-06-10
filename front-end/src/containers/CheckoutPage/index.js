import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAddress, getCartItems, addOrder } from '../../actions'
import Layout from '../../components/Layout'
import {
  Anchor,
  MaterialButton,
  MaterialInput,
} from '../../components/MaterialUI'
import Card from '../../components/UI/Card'
import CartPage from '../CartPage'
import AddressForm from './AddressForm'
import PriceDetails from '../../components/PriceDetails'
import './style.css'
import { Link } from 'react-router-dom'
/**
 * @author
 * @function CheckoutPage
 **/

const CheckoutStep = (props) => {
  return (
    <div className='checkoutStep'>
      <div
        onClick={props.onClick}
        className={`checkoutHeader ${props.active && 'active'}`}
      >
        <div>
          <span className='stepNumber'>{props.stepNumber}</span>
          <span className='stepTitle'>{props.title}</span>
        </div>
      </div>
      {props.body && props.body}
    </div>
  )
}

const Address = ({
  adr,
  selectAddress,
  enableAddressEditForm,
  confirmDeliveryAddress,
  onAddressSubmit,
}) => {
  return (
    <div className='flexRow addressContainer'>
      <div>
        <input name='address' onClick={() => selectAddress(adr)} type='radio' />
      </div>
      <div className='flexRow sb addressinfo'>
        {!adr.edit ? (
          <div className='addressInfo' style={{ width: '100%' }}>
            <div className='addressDetail'>
              <div>
                <span className='addressName'>{adr.name}</span>
                <span className='addressType'>{adr.addressType}</span>
                <span className='addressMobileNumber'>{adr.mobileNumber}</span>
              </div>
              {adr.selected && (
                <Anchor
                  name='EDIT'
                  onClick={() => enableAddressEditForm(adr)}
                  style={{
                    fontWeight: '500',
                    color: '#2874f0',
                  }}
                />
              )}
            </div>
            <div className='fullAddress'>
              {adr.address} <br /> {`${adr.state} - ${adr.zipCode}`}
            </div>
            {adr.selected && (
              <MaterialButton
                title='DELIVERY HERE'
                onClick={() => confirmDeliveryAddress(adr)}
                style={{
                  overflow: 'hidden',
                  margin: '10px 0',
                  clear: 'both',
                }}
              />
            )}
          </div>
        ) : (
          <AddressForm
            withoutLayout={true}
            onSubmitForm={onAddressSubmit}
            initialData={adr}
            onCancel={() => {}}
          />
        )}
      </div>
    </div>
  )
}
const CheckoutPage = (props) => {
  const user = useSelector((state) => state.user)
  const auth = useSelector((state) => state.auth)
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  const [newAddress, setNewAddress] = useState(false)
  const [address, setAddress] = useState()
  const [confirmAddress, setConfirmAddress] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState(false)
  const [orderSummary, setOrderSummary] = useState(false)
  const [orderConfirmation, setOrderConfirmation] = useState(false)
  const [orderedItems, setOrderedItems] = useState({})
  const [paymentOption, setPaymentOption] = useState(false)
  const [confirmOrder, setConfirmOrder] = useState(false)
  const [order, setOrder] = useState({})
  const [totalCost, setTotalCost] = useState(0)
  useEffect(() => {
    auth.authenticate && dispatch(getAddress())
    auth.authenticate && dispatch(getCartItems())
  }, [auth.authenticate, dispatch, props.location])

  useEffect(() => {
    const address = user.address.map((adr) => ({
      ...adr,
      selected: false,
      edit: false,
    }))
    setAddress(address)
  }, [user.address])

  const selectAddress = (addr) => {
    const updatedAddress = address.map((adr) =>
      adr._id === addr._id
        ? { ...adr, selected: true }
        : { ...adr, selected: false }
    )

    setAddress(updatedAddress)
  }

  const confirmDeliveryAddress = (addr) => {
    setSelectedAddress(addr)
    setConfirmAddress(true)
    setOrderSummary(true)
  }

  const onAddressSubmit = (addr) => {
    setSelectedAddress(addr)
    setConfirmAddress(true)
    setOrderSummary(true)
  }

  const userOrderConfirmation = () => {
    setOrderConfirmation(true)
    setOrderSummary(false)
    setPaymentOption(true)
  }

  const enableAddressEditForm = (addr) => {
    const updatedAddress = address.map((adr) =>
      adr._id === addr._id ? { ...adr, edit: true } : { ...adr, edit: false }
    )
    setAddress(updatedAddress)
  }

  const onConfirmOrder = () => {
    const totalAmount = Object.keys(cart.cartItems).reduce(
      (totalPrice, key) => {
        const { price, qty } = cart.cartItems[key]
        return Math.round((totalPrice + price * qty) * 100) / 100
      },
      0
    )

    setTotalCost(totalAmount)
    const items = Object.keys(cart.cartItems).map((key) => ({
      productId: key,
      payablePrice: cart.cartItems[key].price,
      purchasedQty: cart.cartItems[key].qty,
    }))
    const orderedItems = Object.keys(cart.cartItems).map((key) => ({
      productId: key,
      payablePrice: cart.cartItems[key].price,
      purchasedQty: cart.cartItems[key].qty,
      productName: cart.cartItems[key].name,
    }))
    setOrderedItems(orderedItems)
    const payload = {
      addressId: selectedAddress._id,
      totalAmount,
      items,
      paymentStatus: 'pending',
      paymentType: 'cod',
    }
    setOrder(payload)
    console.log(payload)
    dispatch(addOrder(payload))

    setConfirmOrder(true)
  }

  if (confirmOrder) {
    return (
      <Layout>
        <Card>
          <div className='thankYouTitle'>Thank You for your order</div>
          <div className='orderNumber'>Order Details </div>
          <div className='deliveryAddress'>
            Delivery Address:
            <span
              style={{ fontWeight: '100' }}
            >{`${selectedAddress.name} ${selectedAddress.address} - ${selectedAddress.zipCode}`}</span>
          </div>
          <div className='itemsList'>
            <div>
              <div style={{ fontWeight: 'bold' }}>Product</div>
              <div style={{ fontWeight: 'bold' }}>Cost</div>
            </div>
            {orderedItems &&
              orderedItems.map((item, index) => (
                <div>
                  <div>
                    {item.productName} X {item.purchasedQty}
                  </div>
                  <div>{item.payablePrice}</div>
                </div>
              ))}
            <div>
              <div style={{ fontWeight: 'bold' }}>Total:</div>
              <div style={{ fontWeight: 'bold' }}>{totalCost}</div>
            </div>
            <Link className='orderStatusLink' to={'/account/orders'}>
              View Order Status
            </Link>
          </div>
        </Card>
      </Layout>
    )
  }
  return (
    <Layout>
      <div className='cartContainer' style={{ alignItems: 'flex-start' }}>
        <div className='checkoutContainer'>
          {/* check if user logged in or not */}
          <CheckoutStep
            stepNumber={'1'}
            title={'LOGIN'}
            active={!auth.authenticate}
            body={
              auth.authenticate ? (
                <div className='loggedInId'>
                  <span style={{ fontWeight: 500 }}>{auth.user.fullName}</span>
                  <span style={{ margin: '0 5px' }}>{auth.user.email}</span>
                </div>
              ) : (
                <div>
                  <MaterialInput label='Email' />
                </div>
              )
            }
          />
          <CheckoutStep
            stepNumber={'2'}
            title={'DELIVERY ADDRESS'}
            active={!confirmAddress && auth.authenticate}
            body={
              <>
                {confirmAddress ? (
                  <div>
                    <div className='stepCompleted'>{`${selectedAddress.name} ${selectedAddress.address} - ${selectedAddress.zipCode}`}</div>
                  </div>
                ) : address ? (
                  address.map((adr, index) => (
                    <Address
                      key={index}
                      selectAddress={selectAddress}
                      enableAddressEditForm={enableAddressEditForm}
                      confirmDeliveryAddress={confirmDeliveryAddress}
                      onAddressSubmit={onAddressSubmit}
                      setAddress={setAddress}
                      adr={adr}
                    />
                  ))
                ) : null}
              </>
            }
          />

          {confirmAddress ? null : newAddress ? (
            <AddressForm onSubmitForm={onAddressSubmit} onCancel={() => {}} />
          ) : auth.authenticate ? (
            <CheckoutStep
              stepNumber={'+'}
              title={'ADD NEW ADDRESS'}
              active={false}
              onClick={() => setNewAddress(true)}
            />
          ) : null}

          <CheckoutStep
            stepNumber={'3'}
            title={'ORDER SUMMARY'}
            active={orderSummary}
            body={
              orderSummary ? (
                <>
                  <CartPage onlyCartItems={true} />
                </>
              ) : null
            }
          />

          {orderSummary && (
            <Card
              style={{
                margin: '10px 0',
              }}
            >
              <div
                className='flexRow sb'
                style={{
                  padding: '20px',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <p style={{ fontSize: '14px' }}>
                  Order confirmation email will be sent to{' '}
                  <strong>{auth.user.email}</strong>
                </p>
                <MaterialButton
                  title='CONTINUE'
                  onClick={userOrderConfirmation}
                  style={{
                    width: '200px',
                  }}
                />
              </div>
            </Card>
          )}

          <CheckoutStep
            stepNumber={'4'}
            title={'PAYMENT OPTIONS'}
            active={paymentOption}
            body={
              paymentOption && (
                <div>
                  <div
                    className='flexRow'
                    style={{
                      alignItems: 'center',
                      padding: '20px',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div
                      className='flexRow'
                      style={{
                        alignItems: 'center',
                        padding: '20px',
                        fontSize: '20px',
                        margin: '0 0 20px',
                      }}
                    >
                      <input
                        style={{}}
                        type='radio'
                        name='paymentOption'
                        value='cod'
                      />
                      <div>Cash on delivery</div>
                    </div>

                    <MaterialButton
                      title='CONFIRM ORDER'
                      onClick={onConfirmOrder}
                      style={{
                        width: '200px',
                        margin: '0 0 20px 20px',
                      }}
                    />
                  </div>
                </div>
              )
            }
          />
        </div>
        <PriceDetails
          totalItem={
            cart.cartItems
              ? Object.keys(cart.cartItems).reduce(function (qty, key) {
                  return qty + cart.cartItems[key].qty
                }, 0)
              : 0
          }
          totalPrice={
            cart.cartItems
              ? Object.keys(cart.cartItems).reduce((totalPrice, key) => {
                  const { price, qty } = cart.cartItems[key]
                  return Math.round((totalPrice + price * qty) * 100) / 100
                }, 0)
              : 0
          }
        />

        {/* Price Component */}
      </div>
    </Layout>
  )
}

export default CheckoutPage
