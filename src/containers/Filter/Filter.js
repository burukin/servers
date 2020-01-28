import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { Select } from "antd"
import { getFilteredAuthorMessages } from "../../store/actions/messageActions"

const { Option } = Select

// eslint-disable-next-line no-shadow
const Filter = ({ authors, getFilteredAuthorMessages }) => {
  let renderAuthors = []

  if (authors) {
    renderAuthors = Object.values(authors).map(author => (
      <Option key={author.id} value={author.name}>
        {author.name}
      </Option>
    ))
  }

  function onSearch(val) {
    getFilteredAuthorMessages(authors[val].id)
  }

  function onChange(value) {
    const selectedAuthor = Object.values(authors).find(
      author => author.name === value
    )
    getFilteredAuthorMessages(selectedAuthor.id)
  }

  return (
    <Select
      showSearch
      style={{ width: 200 }}
      placeholder="Select an author"
      optionFilterProp="children"
      onChange={onChange}
      onSearch={onSearch}
      filterOption={(input, option) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {renderAuthors}
    </Select>
  )
}

Filter.propTypes = {
  authors: PropTypes.shape(),
  getFilteredAuthorMessages: PropTypes.func
}

Filter.defaultProps = {
  authors: {},
  getFilteredAuthorMessages: () => {}
}

const mapStateToProps = state => ({
  authors: state.authors.authors
})

export default connect(mapStateToProps, { getFilteredAuthorMessages })(Filter)
