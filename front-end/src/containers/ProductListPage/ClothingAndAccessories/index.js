import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsBySlug } from '../../../actions'
import Card from '../../../components/UI/Card'
import { BiDollar } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { generatePublicUrl } from '../../../urlConfig'
import './style.css'

/**
 * @author
 * @function ClothingAndAccessories
 **/

const ClothingAndAccessories = (props) => {
  const product = useSelector((state) => state.product)
  const dispatch = useDispatch()
  const { match } = props
  const pageTitle =
    match.params.slug.charAt(0).toUpperCase() + match.params.slug.slice(1)
  useEffect(() => {
    dispatch(getProductsBySlug(match.params.slug))
  }, [])

  return (
    <div style={{ padding: '10px' }}>
      <div className='categoryTitle'>{pageTitle}</div>
      <Card
        style={{
          boxSizing: 'border-box',
          padding: '10px',
          display: 'flex',
        }}
      >
        {product.products.map((product, index) => (
          <div key={index} className='caContainer'>
            <Link
              className='caImgContainer'
              to={`/${product.slug}/${product._id}/p`}
            >
              <img src={generatePublicUrl(product.productPictures[0].img)} />
            </Link>
            <div>
              <div className='caProductName'>{product.name}</div>
              <div className='caProductPrice'>
                <BiDollar />
                {product.price}
              </div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  )
}

export default ClothingAndAccessories
