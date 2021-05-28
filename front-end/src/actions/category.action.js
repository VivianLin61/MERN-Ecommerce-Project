import axios from '../helpers/axios'
import { categoryConstansts } from './constants'
export const getAllCategory = () => {
  return async (dispatch) => {
    dispatch({ type: categoryConstansts.GET_ALL_CATEGORIES_REQUEST })
    const res = await axios.get('category/getcategory')
    const { categoryList } = res.data
    if (res.status === 200) {
      dispatch({
        type: categoryConstansts.GET_ALL_CATEGORIES_SUCCESS,
        payload: { categories: categoryList },
      })
    } else {
      dispatch({
        type: categoryConstansts.GET_ALL_CATEGORIES_FAILURE,
        payload: { error: res.data.error },
      })
    }
  }
}
