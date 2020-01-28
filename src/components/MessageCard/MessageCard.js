import React, { useState } from "react"
import PropTypes from "prop-types"
import { Comment, Icon, Tooltip, Avatar } from "antd"
import moment from "moment"
import { Link } from "react-router-dom"

const MessageCard = ({ message, author }) => {
  const [state, setState] = useState({ likes: 0, dislikes: 0, action: null })

  console.log(message)

  const like = () => {
    setState({
      likes: 1,
      dislikes: 0,
      action: "liked"
    })
  }

  const dislike = () => {
    setState({
      likes: 0,
      dislikes: 1,
      action: "disliked"
    })
  }

  const { likes, dislikes, action } = state

  const actions = [
    <span key="comment-basic-like">
      <Tooltip title="Like">
        <Icon
          type="like"
          theme={action === "liked" ? "filled" : "outlined"}
          onClick={like}
        />
      </Tooltip>
      <span style={{ paddingLeft: 8, cursor: "auto" }}>{likes}</span>
    </span>,
    <span key=' key="comment-basic-dislike"'>
      <Tooltip title="Dislike">
        <Icon
          type="dislike"
          theme={action === "disliked" ? "filled" : "outlined"}
          onClick={dislike}
        />
      </Tooltip>
      <span style={{ paddingLeft: 8, cursor: "auto" }}>{dislikes}</span>
    </span>
  ]

  return (
    <Comment
      actions={actions}
      author={<Link to={`/author/${author.id}`}>{author.name}</Link>}
      avatar={
        <Link to={`/author/${author.id}`}>
          <Avatar
            src="https://cdn.cnn.com/cnnnext/dam/assets/180907100732-elon-musk-smokes-marijuana-podcast-1-large-169.jpg"
            alt={author.name}
          />
        </Link>
      }
      content={<p>{message.body}</p>}
      datetime={
        <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
          <span>{moment().fromNow()}</span>
        </Tooltip>
      }
    />
  )
}

MessageCard.propTypes = {
  message: PropTypes.shape(),
  author: PropTypes.shape()
}

MessageCard.defaultProps = {
  message: {},
  author: {}
}

export default MessageCard
