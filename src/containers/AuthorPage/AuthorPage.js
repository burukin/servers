/* eslint-disable no-shadow */
import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Card, Row, Col } from "antd"

import { getSingleAuthorInfo } from "../../store/actions/authorActions"
import MessageCard from "../../components/MessageCard/MessageCard"

const { Meta } = Card

// eslint-disable-next-line no-shadow
const AuthorPage = ({
  match,
  getSingleAuthorInfo,
  selectedAuthor,
  selectedAuthorMessages
}) => {
  useEffect(() => {
    getSingleAuthorInfo(match.params.id)
  }, [getSingleAuthorInfo, match.params.id])

  let renderMessages = null
  if (selectedAuthorMessages) {
    renderMessages = selectedAuthorMessages.map(message => {
      return (
        <MessageCard
          key={message.id}
          message={message}
          author={selectedAuthor}
        />
      )
    })
  }

  if (selectedAuthor) {
    return (
      <div>
        <Row>
          <Col span={16} push={8}>
            {renderMessages}
          </Col>
          <Col span={8} pull={16}>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={
                <img
                  alt={selectedAuthor.name}
                  src="https://cdn.cnn.com/cnnnext/dam/assets/180907100732-elon-musk-smokes-marijuana-podcast-1-large-169.jpg"
                />
              }
            >
              <Meta
                title={selectedAuthor.name}
                description={selectedAuthor.website}
              />
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
  return null
}

AuthorPage.propTypes = {
  match: PropTypes.shape().isRequired,
  selectedAuthor: PropTypes.shape(),
  getSingleAuthorInfo: PropTypes.func,
  selectedAuthorMessages: PropTypes.arrayOf
}

AuthorPage.defaultProps = {
  getSingleAuthorInfo: () => {},
  selectedAuthor: {},
  selectedAuthorMessages: []
}

const mapStateToProps = state => {
  return {
    selectedAuthor: state.authors.selectedAuthor,
    authors: state.authors.authors,
    selectedAuthorMessages: state.messages.selectedAuthorMessages,
    isLoading: state.messages.isLoading,
    isAuthorsLoading: state.authors.isAuthorsLoading
  }
}

export default connect(mapStateToProps, {
  getSingleAuthorInfo
})(AuthorPage)
