import * as Actions from "../actions/actionTypes"

const initialState = {
  messages: [],
  isLoading: false,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_ALL_MESSAGES_START:
      return { ...state, isLoading: true }
    case Actions.GET_ALL_MESSAGES_SUCCESS:
      return { ...state, messages: action.payload, isLoading: false }
    case Actions.GET_ALL_MESSAGES_ERROR:
      return { ...state, isLoading: false, error: action.payload }
    default:
      return state
  }
}

export const getMessages = state => state.messages
