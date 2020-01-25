import React, { useEffect } from "react"
import { Pagination } from "antd"
import { connect } from "react-redux"

import PropTypes, { shape } from "prop-types"
import { getAllMessages } from "../../store/actions/messageActions"

// eslint-disable-next-line no-shadow
const Feed = ({ messages, isLoading, getAllMessages }) => {
  useEffect(() => {
    getAllMessages()
  }, [getAllMessages])

  let renderMessages = null

  if (!isLoading) {
    renderMessages = messages.map(message => {
      return <div key={message.id}>{message.id}</div>
    })
  }

  return (
    <div>
      {renderMessages}
      <Pagination defaultCurrent={1} total={Math.ceil(messages.length / 20)} />
    </div>
  )
}

Feed.propTypes = {
  messages: PropTypes.arrayOf(shape()),
  isLoading: PropTypes.bool,
  getAllMessages: PropTypes.func
}

Feed.defaultProps = {
  messages: [],
  isLoading: true,
  getAllMessages: () => {}
}

const mapStatetoProps = state => ({
  messages: state.messages.messages,
  isLoading: state.messages.isLoading
})

export default connect(mapStatetoProps, { getAllMessages })(Feed)
