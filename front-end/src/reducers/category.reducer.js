/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */
import { categoryConstansts } from '../actions/constants'

const initState = {
  categories: [],
  loading: false,
  error: null,
}

export default (state = initState, action) => {
  switch (action.type) {
    case categoryConstansts.GET_ALL_CATEGORIES_REQUEST:
      state = {
        ...state,
        loading: true,
      }
      break
    case categoryConstansts.GET_ALL_CATEGORIES_SUCCESS:
      state = {
        ...state,
        loading: false,
        categories: action.payload.categories,
      }
      break
    case categoryConstansts.GET_ALL_CATEGORIES_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      }
      break
  }

  return state
}
