import {
  GET_MESSAGES_SUCCESS,
  GET_AUTHORS_ERROR,
  GET_AUTHORS_START,
  GET_AUTHORS_SUCCESS,
  GET_SINGLE_AUTHOR_START,
  GET_SINGLE_AUTHOR_SUCCESS,
  GET_SINGLE_AUTHOR_ERROR
} from "../actions/actionTypes"

const initialState = {
  authors: {},
  selectedAuthor: {},
  authorIds: [],
  isAuthorLoading: false,
  error: null
}

// eslint-disable-next-line import/prefer-default-export
export const authorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES_SUCCESS: {
      const authorIds = new Set()
      action.payload.forEach(message => authorIds.add(message.userId))
      return { ...state, authorIds: [...authorIds] }
    }
    case GET_AUTHORS_START:
      return state
    case GET_AUTHORS_SUCCESS:
      return { ...state, authors: action.payload, isAuthorLoading: false }
    case GET_AUTHORS_ERROR:
      return { ...state, error: action.payload, isAuthorLoading: false }
    case GET_SINGLE_AUTHOR_START:
      return { ...state, isAuthorLoading: true }
    case GET_SINGLE_AUTHOR_SUCCESS:
      return {
        ...state,
        selectedAuthor: action.payload,
        isAuthorLoading: false
      }
    case GET_SINGLE_AUTHOR_ERROR:
      return { ...state, isAuthorLoading: false, error: action.payload }
    default:
      return state
  }
}
