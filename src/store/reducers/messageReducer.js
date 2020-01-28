import {
  GET_MESSAGES_START,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_ERROR,
  GET_SELECTED_AUTHOR_MESSAGES_START,
  GET_SELECTED_AUTHOR_MESSAGES_SUCCESS,
  GET_SELECTED_AUTHOR_MESSAGES_ERROR,
  GET_FILTERED_AUTHOR_MESSAGES_START,
  GET_FILTERED_AUTHOR_MESSAGES_SUCCESS,
  GET_FILTERED_AUTHOR_MESSAGES_ERROR,
  POST_MESSAGE_START,
  POST_MESSAGE_SUCCESS,
  POST_MESSAGE_ERROR
} from "../actions/actionTypes"

const initialState = {
  messages: [],
  selectedAuthorMessages: [],
  postedMessage: {},
  isLoading: false,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES_START:
      return { ...state, isLoading: true }
    case GET_MESSAGES_SUCCESS:
      return { ...state, messages: action.payload, isLoading: false }
    case GET_MESSAGES_ERROR:
      return { ...state, isLoading: false, error: action.payload }
    case GET_SELECTED_AUTHOR_MESSAGES_START:
      return { ...state, isLoading: true }
    case GET_SELECTED_AUTHOR_MESSAGES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        selectedAuthorMessages: action.payload
      }
    case GET_SELECTED_AUTHOR_MESSAGES_ERROR:
      return { ...state, isLoading: false, error: action.payload }
    case GET_FILTERED_AUTHOR_MESSAGES_START:
      return { ...state, isLoading: true }
    case GET_FILTERED_AUTHOR_MESSAGES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        messages: action.payload
      }
    case GET_FILTERED_AUTHOR_MESSAGES_ERROR:
      return { ...state, isLoading: false, error: action.payload }
    case POST_MESSAGE_START:
      return { ...state, isLoading: true }
    case POST_MESSAGE_SUCCESS:
      return { ...state, isLoading: false, postedMessage: action.payload }
    case POST_MESSAGE_ERROR:
      return { ...state, isLoading: false, error: action.payload }
    default:
      return state
  }
}
