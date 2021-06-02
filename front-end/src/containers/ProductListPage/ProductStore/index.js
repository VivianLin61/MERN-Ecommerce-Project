import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getProductsBySlug } from '../../../actions'
import { generatePublicUrl } from '../../../urlConfig'
import './style.css'
import { Link } from 'react-router-dom'
import Card from '../../../components/UI/Card'
import { MaterialButton } from '../../../components/MaterialUI'

/**
 * @author
 * @function ProductStore
 **/

const ProductStore = (props) => {
  const product = useSelector((state) => state.product)
  const [priceRange, setPriceRange] = useState({})
  const dispatch = useDispatch()
  useEffect(() => {
    const { match } = props
    dispatch(getProductsBySlug(match.params.slug))
  }, [])

  return (
    <>
      {Object.keys(product.productsByPrice).map((key, index) => {
        return (
          <Card
            headerLeft={`${props.match.params.slug} mobile under ${key}`}
            headerRight={
              <MaterialButton
                title={'VIEW ALL'}
                style={{
                  width: '96px',
                }}
                bgColor='#2874f0'
                fontSize='12px'
              />
            }
            style={{
              width: 'calc(100% - 40px)',
              margin: '20px',
            }}
          >
            <div style={{ display: 'flex' }}>
              {product.productsByPrice[key].map((product) => (
                <Link
                  to={`/${product.slug}/${product._id}/p`}
                  style={{ display: 'block' }}
                  key={product.name}
                  className='productContainer'
                >
                  <div className='productImgContainer'>
                    <img
                      alt=''
                      src={generatePublicUrl(product.productPictures[0].img)}
                    />
                  </div>
                  <div className='productInfo'>
                    <div style={{ margin: '5px 0' }}>{product.name}</div>
                    <div>
                      <span>4.3</span>&nbsp;
                      <span>3353</span>
                    </div>
                  </div>

                  <div className='productPrice'>{product.price}</div>
                </Link>
              ))}
            </div>
          </Card>
        )
      })}
    </>
  )
}

export default ProductStore
