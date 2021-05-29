/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */
import { productConstants } from '../actions/constants'

const initState = {
  products: [],
  productsByPrice: {
    under50: [],
    under100: [],
    under150: [],
    under250: [],
    under400: [],
    over400: [],
  },
  pageRequest: false,
}

export default (state = initState, action) => {
  switch (action.type) {
    case productConstants.GET_PRODUCTS_BY_SLUG:
      state = {
        ...state,
        products: action.payload.products,
        productsByPrice: {
          ...action.payload.productsByPrice,
        },
      }
      break
  }

  return state
}