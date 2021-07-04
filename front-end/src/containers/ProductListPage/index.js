import React from 'react'
import Layout from '../../components/Layout'
import getParams from '../../utils/getParams'
import ClothingAndAccessories from './ClothingAndAccessories/index.js'
// import ClothingAndAccessories from './ClothingAndAccessories'
import CategoryPage from './CategoryPage'
import ProductStore from './ProductStore'
import './style.css'

const ProductListPage = (props) => {
  const renderProduct = () => {
    const params = getParams(props.location.search)
    let content = null
    switch (params.type) {
      case 'store':
        content = <ProductStore {...props} />
        break
      case 'page':
        content = <CategoryPage {...props} />
        break
      default:
        content = <ClothingAndAccessories {...props} />
    }

    return content
  }

  return <Layout>{renderProduct()}</Layout>
}

export default ProductListPage
