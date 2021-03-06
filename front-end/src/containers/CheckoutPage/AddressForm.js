import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addAddress } from '../../actions'
import { MaterialButton, MaterialInput } from '../../components/MaterialUI'

/**
 * @author
 * @function AddressForm
 **/

const AddressForm = (props) => {
  const { initialData } = props
  const [name, setName] = useState(initialData ? initialData.name : '')
  const [mobileNumber, setMobileNumber] = useState(
    initialData ? initialData.mobileNumber : ''
  )
  const [zipCode, setZipCode] = useState(initialData ? initialData.zipCode : '')
  const [country, setCountry] = useState(initialData ? initialData.country : '')
  const [address, setAddress] = useState(initialData ? initialData.address : '')
  const [cityDistrictTown, setCityDistrictTown] = useState(
    initialData ? initialData.cityDistrictTown : ''
  )
  const [state, setState] = useState(initialData ? initialData.state : '')

  const [addressType, setAddressType] = useState(
    initialData ? initialData.addressType : ''
  )
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const [submitFlag, setSubmitFlag] = useState(false)
  const [id, setId] = useState(initialData ? initialData._id : '')

  const inputContainer = {
    width: '100%',
    marginRight: 10,
  }

  const submitAddress = (e) => {
    const payload = {
      address: {
        name,
        mobileNumber,
        zipCode,
        country,
        address,
        cityDistrictTown,
        state,
        addressType,
      },
    }

    if (id) {
      payload.address._id = id
    }

    props.onSubmitForm(payload.address)
    dispatch(addAddress(payload))
    setSubmitFlag(true)
  }

  const renderAddressForm = () => {
    return (
      <>
        <div className='flexRow'>
          <div style={inputContainer}>
            <MaterialInput
              label='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div style={inputContainer}>
            <MaterialInput
              label='10-digit mobile number'
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
        </div>
        <div className='flexRow'>
          <div style={inputContainer}>
            <MaterialInput
              label='Zip Code'
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>
          <div style={inputContainer}>
            <MaterialInput
              label='Country'
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
        </div>
        <div className='flexRow'>
          <div style={inputContainer}>
            <MaterialInput
              label='Address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>

        <div className='flexRow'>
          <div style={inputContainer}>
            <MaterialInput
              label='City/District/Town'
              value={cityDistrictTown}
              onChange={(e) => setCityDistrictTown(e.target.value)}
            />
          </div>
          <div style={inputContainer}>
            <MaterialInput
              label='State'
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
        </div>
        <div style={{ marginTop: '15px' }}>
          <label style={{ fontWeight: 'bold' }}>Address Type</label>
          <div style={{ marginTop: '5px' }} className='flexRow'>
            <div style={{ marginRight: '10px' }}>
              <input
                type='radio'
                onClick={() => setAddressType('home')}
                name='addressType'
                value='home'
              />
              <span>Home</span>
            </div>
            <div>
              <input
                type='radio'
                onClick={() => setAddressType('work')}
                name='addressType'
                value='work'
              />
              <span>Work</span>
            </div>
          </div>
        </div>
        <div className=''>
          <MaterialButton
            title='SAVE AND DELIVER HERE'
            onClick={submitAddress}
            float='left'
            style={{
              margin: '20px 0',
            }}
          />
        </div>
      </>
    )
  }

  if (props.withoutLayout) {
    return <div>{renderAddressForm()}</div>
  }

  return (
    <div className='checkoutStep' style={{ background: '#f5faff' }}>
      <div className={`checkoutHeader`}>
        <div>
          <span className='stepNumber'>+</span>
          <span className='stepTitle'>{'ADD NEW ADDRESS'}</span>
        </div>
      </div>
      <div
        style={{
          padding: '0 60px',
          paddingBottom: '20px',
          boxSizing: 'border-box',
        }}
      >
        {renderAddressForm()}
      </div>
    </div>
  )
}

export default AddressForm
