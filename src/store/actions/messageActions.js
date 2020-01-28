import { BASE_URL } from "../../constants/constants"
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
} from "./actionTypes"
// eslint-disable-next-line import/no-cycle
import { getAuthorsInfo } from "./authorActions"

const shuffle = arr => {
  return arr.sort(() => Math.random() - 0.5)
}

const removeLineBreaks = arr => {
  arr.forEach(message => {
    // eslint-disable-next-line no-param-reassign
    message.body = message.body.replace(/\r?\n|\r/g, "")
  })
  return arr
}

export const getMessages = () => dispatch => {
  dispatch({ type: GET_MESSAGES_START })

  fetch(`${BASE_URL}/posts`)
    .then(res => res.json())
    .then(data => {
      const processedData = removeLineBreaks(data)
      const shuffledData = shuffle(processedData)
      dispatch({
        type: GET_MESSAGES_SUCCESS,
        payload: shuffledData
      })
      dispatch(getAuthorsInfo())
    })
    .catch(err => {
      dispatch({
        type: GET_MESSAGES_ERROR,
        payload: err
      })
    })
}

export const getSelectedAuthorMessages = id => dispatch => {
  dispatch({ type: GET_SELECTED_AUTHOR_MESSAGES_START })
  fetch(`${BASE_URL}/posts`)
    .then(res => res.json())
    .then(data => {
      let posts = data.filter(post => post.userId === +id)
      posts = removeLineBreaks(posts)
      dispatch({
        type: GET_SELECTED_AUTHOR_MESSAGES_SUCCESS,
        payload: posts
      })
    })
    .catch(err =>
      dispatch({ type: GET_SELECTED_AUTHOR_MESSAGES_ERROR, payload: err })
    )
}

export const getFilteredAuthorMessages = id => dispatch => {
  dispatch({ type: GET_FILTERED_AUTHOR_MESSAGES_START })
  fetch(`${BASE_URL}/posts`)
    .then(res => res.json())
    .then(data => {
      let posts = data.filter(post => post.userId === +id)
      posts = removeLineBreaks(posts)
      dispatch({
        type: GET_FILTERED_AUTHOR_MESSAGES_SUCCESS,
        payload: posts
      })
    })
    .catch(err =>
      dispatch({ type: GET_FILTERED_AUTHOR_MESSAGES_ERROR, payload: err })
    )
}

export const postMessage = values => dispatch => {
  dispatch({ type: POST_MESSAGE_START })
  fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...values })
  })
    .then(res => res.json())
    .then(data => {
      // eslint-disable-next-line no-param-reassign
      data.author = { id: Math.ceil(Math.random() * 100), name: "John Doe" }
      dispatch({ type: POST_MESSAGE_SUCCESS, payload: data })
    })
    .catch(err => {
      dispatch({ type: POST_MESSAGE_ERROR, payload: err })
    })
}
