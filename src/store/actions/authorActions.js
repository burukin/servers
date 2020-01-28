import { BASE_URL } from "../../constants/constants"
import {
  GET_AUTHORS_START,
  GET_AUTHORS_SUCCESS,
  GET_AUTHORS_ERROR,
  GET_SINGLE_AUTHOR_START,
  GET_SINGLE_AUTHOR_SUCCESS,
  GET_SINGLE_AUTHOR_ERROR
} from "./actionTypes"
// eslint-disable-next-line import/no-cycle
import { getSelectedAuthorMessages } from "./messageActions"

// eslint-disable-next-line import/prefer-default-export
export const getAuthorsInfo = () => (dispatch, getState) => {
  const state = getState()
  const { authorIds } = state.authors
  const authorsInfo = {}

  dispatch({ type: GET_AUTHORS_START })
  const promises = authorIds.map(id =>
    fetch(`${BASE_URL}/users/${id}`).then(res => res.json())
  )

  Promise.all(promises)
    .then(data => {
      data.forEach(item => {
        authorsInfo[item.id] = item
      })
      dispatch({ type: GET_AUTHORS_SUCCESS, payload: authorsInfo })
    })
    .catch(err => {
      dispatch({ type: GET_AUTHORS_ERROR, payload: err })
    })
}

export const getSingleAuthorInfo = id => dispatch => {
  dispatch({ type: GET_SINGLE_AUTHOR_START })
  fetch(`${BASE_URL}/users/${id}`)
    .then(res => res.json())
    .then(data => {
      dispatch({ type: GET_SINGLE_AUTHOR_SUCCESS, payload: data })
      dispatch(getSelectedAuthorMessages(id))
    })
    .catch(err => dispatch({ type: GET_SINGLE_AUTHOR_ERROR, payload: err }))
}
