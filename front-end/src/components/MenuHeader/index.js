import React, { useEffect } from 'react'
import './style.css'
import { useSelector, useDispatch } from 'react-redux'
import { getAllCategory } from '../../actions'
import { Link } from 'react-router-dom'
/**
 * @author
 * @function MenuHeader
 **/

const MenuHeader = (props) => {
  const category = useSelector((state) => state.category)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllCategory())
  }, [])

  const renderCategories = (categories) => {
    let myCategories = []
    for (let category of categories) {
      myCategories.push(
        <li key={category.name}>
          {category.parentId ? (
            <a
              href={`/${category.slug}?cid=${category._id}&type=${category.type}`}
            >
              {category.name}
            </a>
          ) : (
            <>
              {' '}
              <Link
                to={`/${category.slug}?cid=${category._id}&type=${category.type}`}
                className='categoryLink'
              >
                {category.name}
              </Link>
              {/* <span>{category.name}</span> */}
            </>
          )}
          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      )
    }
    return myCategories
  }
  return (
    <div className='menuHeader'>
      <ul>
        {category.categories.length > 0
          ? renderCategories(category.categories)
          : null}
      </ul>
    </div>
  )
}

export default MenuHeader
