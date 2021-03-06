import React, { Component } from "react";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPage: 1,
      currentPage: 1
    };
  }

  render() {
    const tableHeaders = this.props.columns.map(column => {
      return <th>{column.header}</th>;
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
      <Table {...this.props}>
        <thead>
          <tr>{tableHeaders}</tr>
        </thead>
        <tbody>{tableBody}</tbody>
      </Table>
    );
  }
}

Table.propTypes = {
  columns: PropTypes.array,
  rows: PropTypes.array
};

export default DataTable;
