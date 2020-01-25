import { BASE_URL } from "../../constants/constants"
import {
  GET_ALL_MESSAGES_START,
  GET_ALL_MESSAGES_SUCCESS,
  GET_ALL_MESSAGES_ERROR
} from "./actionTypes"

export const getAllMessages = () => dispatch => {
  dispatch({ type: GET_ALL_MESSAGES_START })

  fetch(`${BASE_URL}/posts`)
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: GET_ALL_MESSAGES_SUCCESS,
        payload: data
      })
    })
    .catch(err => {
      dispatch({
        type: GET_ALL_MESSAGES_ERROR,
        payload: err
      })
    })
}

export const getAuthorsMessages = authorId => dispatch => {
  dispatch({})
  return authorId
}
