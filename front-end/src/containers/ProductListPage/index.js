import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsBySlug } from '../../actions'
import { generatePublicUrl } from '../../urlConfig'
import './style.css'
const ProductListPage = (props) => {
  const product = useSelector((state) => state.product)
  const [priceRange, setPriceRange] = useState({})
  const dispatch = useDispatch()
  useEffect(() => {
    const { match } = props
    dispatch(getProductsBySlug(match.params.slug))
  }, [])
  return (
    <Layout>
      {Object.keys(product.productsByPrice).map((key, index) => {
        return (
          <div className='card'>
            <div className='cardHeader'>
              <div>Apple Mobile {key}</div>
              <button>view all</button>
            </div>

            <div style={{ display: 'flex' }}>
              {product.productsByPrice[key].map((product) => (
                <div key={product.name} className='productContainer'>
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
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </Layout>
  )
}

export default ProductListPage
