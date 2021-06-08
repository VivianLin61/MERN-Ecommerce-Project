import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetailsById } from '../../actions'
import Layout from '../../components/Layout'
import { IoIosArrowForward, IoIosStar, IoMdCart } from 'react-icons/io'
import { BiDollar } from 'react-icons/bi'
import { AiFillThunderbolt } from 'react-icons/ai'
import { MaterialButton } from '../../components/MaterialUI'
import './style.css'
import { generatePublicUrl } from '../../urlConfig'
import { addToCart } from '../../actions'
/**
 * @author
 * @function ProductDetailsPage
 **/

const ProductDetailsPage = (props) => {
  const dispatch = useDispatch()
  const product = useSelector((state) => state.product)

  useEffect(() => {
    const { productId } = props.match.params
    console.log(props)
    const payload = {
      params: {
        productId,
      },
    }
    dispatch(getProductDetailsById(payload))
  }, [])

  if (Object.keys(product.productDetails).length === 0) {
    return null
  }

  return (
    <Layout>
      {/* <div>{product.productDetails.name}</div> */}
      <div className='productDescriptionContainer'>
        <div className='flexRow'>
          <div className='verticalImageStack'>
            {product.productDetails.productPictures.map((thumb, index) => (
              <div key={index} className='thumbnail'>
                <img src={generatePublicUrl(thumb.img)} alt={thumb.img} />
              </div>
            ))}
          </div>
          <div className='productDescContainer'>
            <div className='productDescImgContainer'>
              <img
                src={generatePublicUrl(
                  product.productDetails.productPictures[0].img
                )}
                alt={`${generatePublicUrl(
                  product.productDetails.productPictures[0].img
                )}`}
              />
            </div>
          </div>
        </div>
        <div>
          {/*breed*/}
          {/* product description */}
          <div className='productDetails'>
            <p className='productTitle'>{product.productDetails.name}</p>

            <div className='flexRow priceContainer'>
              <span className='price'>
                <BiDollar />
                {product.productDetails.price}
              </span>
              {/* <span>i</span> */}
            </div>
            <div>
              <p
                style={{
                  color: '#212121',
                  fontSize: '14px',
                  fontWeight: '600',
                }}
              >
                Description
              </p>
              <p style={{ display: 'flex' }}>
                <span
                  style={{
                    fontSize: '12px',
                    color: '#212121',
                  }}
                >
                  {product.productDetails.description}
                </span>
              </p>
            </div>
            {/* action buttons */}
            <div className='flexRow'>
              <MaterialButton
                title='ADD TO CART'
                bgColor='#ff9f00'
                textColor='#ffffff'
                float='left'
                style={{
                  marginRight: '5px',
                }}
                icon={<IoMdCart />}
                onClick={() => {
                  const { _id, name, price } = product.productDetails
                  const img = product.productDetails.productPictures[0].img
                  dispatch(addToCart({ _id, name, price, img }))
                  props.history.push(`/cart`)
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProductDetailsPage
