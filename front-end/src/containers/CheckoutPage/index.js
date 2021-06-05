import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAddress } from '../../actions'
import Layout from '../../components/Layout'
import {
  Anchor,
  MaterialButton,
  MaterialInput,
} from '../../components/MaterialUI'
import Card from '../../components/UI/Card'
import CartPage from '../CartPage'
import AddressForm from './AddressForm'

import './style.css'

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

const CheckoutPage = (props) => {
  const user = useSelector((state) => state.user)
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [newAddress, setNewAddress] = useState(false)
  const [address, setAddress] = useState()
  const [confirmAddress, setConfirmAddress] = useState(false)
  const [selectedAddress, setSelectedAddress] = useState(false)
  useEffect(() => {
    console.log('request address')
    auth.authenticate && dispatch(getAddress())
  }, [auth.authenticate, dispatch])

  useEffect(() => {
    const address = user.address.map((adr) => ({
      ...adr,
      selected: false,
      edit: false,
    }))
    setAddress(address)
  }, [user.address])
  const onAddressSubmit = (addr) => {}

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
            active={!confirmAddress}
            body={
              <>
                {confirmAddress
                  ? 'show address'
                  : auth.authenticate &&
                    address.map((adr, index) => (
                      <div key={index} className='flexRow addressContainer'>
                        <div>
                          <input
                            name='address'
                            onClick={() => selectAddress(adr)}
                            type='radio'
                          />
                        </div>
                        <div className='flexRow sb addressinfo'>
                          <div style={{ width: '100%' }}>
                            <div className='addressDetail'>
                              <div>
                                <span className='addressName'>{adr.name}</span>
                                <span className='addressType'>
                                  {adr.addressType}
                                </span>
                                <span className='addressMobileNumber'>
                                  {adr.mobileNumber}
                                </span>
                              </div>
                            </div>
                            <div className='fullAddress'>
                              {adr.address} <br />{' '}
                              {`${adr.state} ${adr.country} - ${adr.zipCode}`}
                            </div>

                            {confirmAddress
                              ? null
                              : adr.selected && (
                                  <MaterialButton
                                    title='DELIVERY HERE'
                                    onClick={() => confirmDeliveryAddress(adr)}
                                    style={{
                                      width: '200px',
                                      margin: '10px 0',
                                    }}
                                  />
                                )}
                          </div>
                          {adr.selected && <div>edit</div>}
                        </div>
                      </div>
                    ))}
              </>
            }
          />
          {newAddress ? (
            <AddressForm
              withoutLayout={true}
              onSubmitForm={onAddressSubmit}
              onCancel={() => {}}
            />
          ) : (
            <CheckoutStep
              stepNumber={'+'}
              title={'ADD NEW ADDRESS'}
              active={false}
              onClick={() => setNewAddress(true)}
            />
          )}

          <CheckoutStep
            stepNumber={'3'}
            title={'ORDER SUMMARY'}
            active={false}
            body={<> </>}
          />

          <CheckoutStep
            stepNumber={'4'}
            title={'PAYMENT OPTIONS'}
            active={false}
            body={<></>}
          />
        </div>

        {/* Price Component */}
      </div>
    </Layout>
  )
}

export default CheckoutPage
