/* eslint-disable default-case */
/* eslint-disable import/no-anonymous-default-export */
import { pageConstants } from '../actions/constants'

const initState = {
  error: null,
  loading: false,
  page: {},
}

export default (state = initState, action) => {
  switch (action.type) {
    case pageConstants.CREATE_PAGE_REQUEST:
      state = {
        ...state,
        loading: true,
      }
      break
    case pageConstants.CREATE_PAGE_SUCCESS:
      state = {
        ...state,
        loading: false,
        page: action.payload.page,
      }
      break
    case pageConstants.CREATE_PAGE_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      }
      break
  }

  return state
}
