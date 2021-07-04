import React from 'react'
import Layout from '../../components/Layout'
import Card from '../../components/UI/Card'
import { generatePublicUrl } from '../../urlConfig'
import { useDispatch, useSelector } from 'react-redux'
const HomePage = (props) => {
  const categories = useSelector((state) => state.category)
  const categoriesList = categories.categories
  return (
    <div>
      <Layout>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            margin: '10px 0',
          }}
        >
          {categoriesList &&
            categoriesList.map((category, index) => (
              <Card
                headerLeft={category.name}
                key={index}
                style={{
                  width: '300px',
                  height: '430px',
                  margin: '30px',
                }}
              >
                <a
                  href={`/${category.slug}?cid=${category._id}&type=${category.type}`}
                >
                  <img
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    src={category.categoryImage}
                    alt=''
                  />
                </a>
              </Card>
            ))}
        </div>
      </Layout>
    </div>
  )
}

export default HomePage
