import React, { Component } from "react";
import PropTypes from "prop-types";
class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPage: 1,
      currentPage: 1
    };
  }

  render() {
    const tableHeaders = this.props.columns.map(column => {
      return <td>{column.header}</td>;
    });

    let rows = this.props.rows;
    if (!rows) {
      rows = [];
    }

    const tableBody = rows.map(row => {
      const fields = this.props.columns.map(column => {
        let field = row[column.fieldName];
        if (column.render) {
          field = column.render(field);
        }
        return <td>{field}</td>;
      });
      return <tr>{fields}</tr>;
    });

    return (
      <table>
        <thead>
          <tr>{tableHeaders}</tr>
        </thead>
        <tbody>{tableBody}</tbody>
      </table>
    );
  }
}

Table.propTypes = {
  columns: PropTypes.array,
  rows: PropTypes.array
};

export default Table;
