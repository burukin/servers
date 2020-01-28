import { combineReducers } from "redux"
import messages from "./messageReducer"
import { authorsReducer } from "./authorsReducer"

export default combineReducers({ messages, authors: authorsReducer })
