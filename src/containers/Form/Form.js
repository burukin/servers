import React from "react"
import { Form, Input, Button } from "antd"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { postMessage } from "../../store/actions/messageActions"

// eslint-disable-next-line no-shadow
const MessageForm = ({ form, postMessage }) => {
  const handleSubmit = e => {
    e.preventDefault()

    form.validateFields((err, values) => {
      if (!err) {
        postMessage(values)
      }
    })
  }

  const { getFieldDecorator } = form

  const validator = (rule, value, callback) => {
    const words = value.split(" ")
    if (words.length < 10) {
      callback("Your description is too short")
    } else {
      callback()
    }
  }

  return (
    <Form
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 12 }}
      onSubmit={handleSubmit}
    >
      <Form.Item label="Title">
        {getFieldDecorator("title", {
          rules: [{ required: true, message: "Please input title" }]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="Description">
        {getFieldDecorator("body", {
          rules: [
            { required: true, message: "Please input description" },
            { validator }
          ]
        })(<Input.TextArea />)}
      </Form.Item>
      <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

MessageForm.propTypes = {
  form: PropTypes.shape().isRequired,
  postMessage: PropTypes.func
}

MessageForm.defaultProps = {
  postMessage: () => {}
}

export default Form.create({ name: "message" })(
  connect(null, { postMessage })(MessageForm)
)
