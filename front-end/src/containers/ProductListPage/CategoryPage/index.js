import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductPage } from '../../../actions'
import getParams from '../../../utils/getParams'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import Card from '../../../components/UI/Card'
import { api } from '../../../urlConfig'
import { generatePublicUrl } from '../../../urlConfig'
import './style.css'
import { Link } from 'react-router-dom'
const ProductPage = (props) => {
  const dispatch = useDispatch()
  const product = useSelector((state) => state.product)
  const categories = useSelector((state) => state.category)
  const { page } = product
  let category
  if (page) {
    category = categories.categories.find((cat) => cat._id === page.category)
  }
  useEffect(() => {
    const params = getParams(props.location.search)
    const payload = {
      params,
    }
    dispatch(getProductPage(payload))
  }, [])

  return (
    <>
      {page ? (
        <>
          <div style={{ margin: '0 10px' }}>
            <h3>{page.title}</h3>
            <Carousel renderThumbs={() => {}}>
              {page.banners &&
                page.banners.map((banner, index) => (
                  <a key={index} style={{ display: 'block' }}>
                    <img src={generatePublicUrl(banner.img)} alt='' />
                  </a>
                ))}
            </Carousel>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                margin: '10px 0',
              }}
            >
              {page.products &&
                page.products.map((product, index) => (
                  <>
                    {' '}
                    <Card
                      headerLeft={category ? category.children[index].name : ''}
                      key={index}
                      style={{
                        width: '300px',
                        height: '430px',
                        margin: '30px',
                      }}
                    >
                      <img
                        style={{
                          width: '100%',
                          height: '100%',
                        }}
                        src={generatePublicUrl(product.img)}
                        alt=''
                      />
                      <div className='subCategories' href='/'>
                        {category &&
                          category.children[index].children.map(
                            (cate, index) => (
                              <div style={{ margin: '5px' }} key={index}>
                                <Link
                                  className='subCategoriesLink'
                                  to={`/${cate.slug}?cid=${cate._id}&type=${cate.type}`}
                                >
                                  {cate.name}
                                </Link>
                              </div>
                            )
                          )}
                      </div>
                    </Card>{' '}
                    {/* <div>
                      {JSON.stringify(category.children[index].children.length)}
                    </div> */}
                  </>
                ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div id='loader'></div>
        </>
      )}
    </>
  )
}

export default ProductPage
