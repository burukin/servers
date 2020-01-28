import React, { useEffect } from "react"
import { Spin } from "antd"
import PropTypes, { shape } from "prop-types"
import { connect } from "react-redux"

import { getMessages } from "../../store/actions/messageActions"
import MessageCard from "../../components/MessageCard/MessageCard"
import Filter from "../Filter/Filter"

const Feed = ({
  messages,
  isLoading,
  authors,
  isAuthorLoading,
  // eslint-disable-next-line no-shadow
  getMessages
}) => {
  useEffect(() => {
    getMessages()
  }, [getMessages])

  let renderMessages = null

  if (!isLoading && !isAuthorLoading) {
    renderMessages = messages.map(message => {
      return (
        <MessageCard
          key={message.id}
          message={message}
          author={authors[message.userId]}
        />
      )
    })
  } else {
    renderMessages = (
      <div>
        <Spin size="small" />
        <Spin />
        <Spin size="large" />
      </div>
    )
  }

  return (
    <div>
      <Filter />
      {renderMessages}
    </div>
  )
}

Feed.propTypes = {
  messages: PropTypes.arrayOf(shape()),
  isLoading: PropTypes.bool,
  getMessages: PropTypes.func,
  authors: PropTypes.shape(),
  isAuthorLoading: PropTypes.bool
}

Feed.defaultProps = {
  messages: [],
  isLoading: true,
  getMessages: () => {},
  isAuthorLoading: true,
  authors: {}
}

const mapStateToProps = state => ({
  messages: state.messages.messages,
  authors: state.authors.authors,
  isLoading: state.messages.isLoading,
  isAuthorLoading: state.authors.isAuthorLoading
})

export default connect(mapStateToProps, { getMessages })(Feed)
