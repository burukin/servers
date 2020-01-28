import React, { useState } from "react"
import PropTypes from "prop-types"
import { Modal, Button } from "antd"
import { connect } from "react-redux"
import Form from "../Form/Form"
import MessageCard from "../../components/MessageCard/MessageCard"

const ModalWindow = ({ postedMessage }) => {
  const [state, setState] = useState({
    loading: false,
    visible: false
  })

  const showModal = () => {
    setState({
      visible: true
    })
  }

  const handleOk = () => {
    setState({ loading: true })
    setTimeout(() => {
      setState({ loading: false, visible: false })
    }, 3000)
  }

  const handleCancel = () => {
    setState({ visible: false })
  }

  const { visible, loading } = state

  const renderContent = () => {
    if (!postedMessage.author) {
      return <Form />
    }
    return <MessageCard message={postedMessage} author={postedMessage.author} />
  }

  return (
    <div style={{ float: "right" }}>
      <Button type="primary" onClick={showModal}>
        Write message
      </Button>
      <Modal
        visible={visible}
        title="Title"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel} disabled={loading}>
            Cancel
          </Button>
        ]}
      >
        {renderContent()}
      </Modal>
    </div>
  )
}

ModalWindow.propTypes = {
  postedMessage: PropTypes.shape()
}

ModalWindow.defaultProps = {
  postedMessage: {}
}

const mapStateToProps = state => ({
  postedMessage: state.messages.postedMessage
})

export default connect(mapStateToProps)(ModalWindow)
