import React, { useEffect, useState } from 'react'
import './style.css'
import { IoIosArrowDown, IoIosCart, IoIosSearch } from 'react-icons/io'
import {
  Modal,
  MaterialInput,
  MaterialButton,
  DropdownMenu,
} from '../MaterialUI'
import { useDispatch, useSelector } from 'react-redux'
import { login, signout, signup as _signup } from '../../actions'
import Cart from '../UI/Cart'

/**
 * @author
 * @function Header
 **/

const Header = (props) => {
  const [loginModal, setLoginModal] = useState(false)
  const [signup, setSignup] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  // state cart value
  const cart = useSelector((state) => state.cart)

  const userSignup = () => {
    const user = { firstName, lastName, email, password }
    if (
      firstName === '' ||
      lastName === '' ||
      email === '' ||
      password === ''
    ) {
      return
    }

    dispatch(_signup(user))
  }

  const userLogin = () => {
    if (signup) {
      userSignup()
    } else {
      dispatch(login({ email, password }))
    }
  }

  const logout = () => {
    dispatch(signout())
  }

  useEffect(() => {
    if (auth.authenticate) {
      setLoginModal(false)
    }
  }, [auth.authenticate])

  // useEffect(() => {
  //   dispatch(getCartItems());
  // }, []);

  const renderLoggedInMenu = () => {
    return (
      <DropdownMenu
        menu={
          <a className='fullName'>{auth.user ? auth.user.firstName : <> </>}</a>
        }
        menus={[
          {
            label: 'Orders',
            href: `/account/orders`,
            icon: null,
          },
          { label: 'Logout', href: '', icon: null, onClick: logout },
        ]}
      />
    )
  }

  const renderNonLoggedInMenu = () => {
    return (
      <DropdownMenu
        menu={
          <a
            className='loginButton'
            onClick={() => {
              setSignup(false)
              setLoginModal(true)
            }}
          >
            Login
          </a>
        }
        menus={[
          {
            label: 'Orders',
            href: `/account/orders`,
            icon: null,
            onClick: () => {
              !auth.authenticate && setLoginModal(true)
            },
          },
        ]}
        firstMenu={
          <div className='firstmenu'>
            <span>New Customer?</span>
            <a
              onClick={() => {
                setLoginModal(true)
                setSignup(true)
              }}
              style={{ color: '#2874f0' }}
            >
              Sign Up
            </a>
          </div>
        }
      />
    )
  }

  return (
    <div className='header'>
      <Modal visible={loginModal} onClose={() => setLoginModal(false)}>
        <div className='authContainer'>
          <div className='row'>
            <div className='leftspace'>
              {signup ? (
                <>
                  {' '}
                  <h2>Sign Up</h2>
                  <p>Get access to your Orders, Wishlist and Recommendations</p>
                </>
              ) : (
                <>
                  <h2>Login</h2>
                  <p>Get access to your Orders, Wishlist and Recommendations</p>
                </>
              )}
            </div>
            <div className='rightspace'>
              <div className='loginInputContainer'>
                {auth.error && (
                  <div style={{ color: 'red', fontSize: 12 }}>{auth.error}</div>
                )}
                {signup && (
                  <MaterialInput
                    type='text'
                    label='First Name'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                )}
                {signup && (
                  <MaterialInput
                    type='text'
                    label='Last Name'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                )}

                <MaterialInput
                  type='text'
                  label='Email/Mobile Number'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MaterialInput
                  type='password'
                  label='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  // rightElement={<a href="#">Forgot?</a>}
                />
                <MaterialButton
                  title={signup ? 'Register' : 'Login'}
                  bgColor='#fb641b'
                  textColor='#ffffff'
                  style={{
                    margin: '40px 0 20px 0',
                  }}
                  onClick={userLogin}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div className='subHeader'>
        {/* Logo  */}
        <div className='logo'>
          <a href='/' className='logoimage' style={{ color: 'white' }}>
            SHOP
          </a>
        </div>
        {/* logo ends here */}

        {/* search component */}
        <div
          style={{
            padding: '0 10px',
          }}
        >
          
          <div className='searchInputContainer'>
            <input
              className='searchInput'
              placeholder={'search for products, brands and more'}
            />
            <div className='searchIconContainer'>
              <IoIosSearch
                style={{
                  color: 'var(--main-color)',
                }}
              />
            </div>
          </div>
        </div>
        {/* search component ends here */}

        {/* right side menu */}
        <div className='rightMenu'>
          {auth.authenticate ? renderLoggedInMenu() : renderNonLoggedInMenu()}

          <div>
            <a href={`/cart`} className='cart'>
              <Cart
                count={cart.cartItems ? Object.keys(cart.cartItems).length : 0}
              />
              <span style={{ margin: '0 10px' }}>Cart</span>
            </a>
          </div>
        </div>
        {/* right side menu ends here */}
      </div>
    </div>
  )
}

export default Header
