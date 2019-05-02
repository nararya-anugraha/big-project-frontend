import React, { Component, Fragment } from "react";
import DataTable from "./DataTable";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const formatNull = string => {
  if (string == null) {
    return "-";
  } else {
    return string;
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetched: false,
      users: [],
      currentPage: 1,
      pageSize: 20,
      totalPages: 1,
      filter: "",
      visitorCount: "Loading..."
    };
  }

  getVisitorCount() {
    fetch("/api/visitor")
      .then(response => response.json())
      .then(visitorCount => {
        this.setState({ visitorCount });
      });
  }

  getUsers() {
    fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({
        current_page: this.state.currentPage,
        page_size: this.state.pageSize,
        filter: this.state.filter
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(pagedResponse => {
        this.setState({
          fetched: true,
          users: pagedResponse.users,
          currentPage: pagedResponse.current_page,
          pageSize: pagedResponse.page_size,
          totalPages: pagedResponse.total_pages
        });
      });
  }

  changePage(direction) {
    let newPage = this.state.currentPage;
    const fastCrement = Math.floor(Math.sqrt(this.state.totalPages));
    switch (direction) {
      case "first":
        newPage = 1;
        break;
      case "previous-fast":
        newPage -= fastCrement;
        break;
      case "previous":
        newPage -= 1;
        break;
      case "next":
        newPage += 1;
        break;
      case "next-fast":
        newPage += fastCrement;
        break;
      case "last":
        newPage = this.state.totalPages;
        break;
    }
    if (newPage < 0) {
      newPage = 1;
    }
    if (newPage > this.state.totalPages) {
      newPage = this.state.totalPages;
    }
    this.setState({
      fetched: false,
      currentPage: newPage
    });
  }

  applyFilter(event) {
    this.setState({
      filter: event.target.value
    });
  }

  componentDidMount() {
    this.getVisitorCount();
  }

  render() {
    if (!this.state.fetched) {
      this.getUsers();
    }

    const columns = [
      {
        header: "User ID",
        fieldName: "user_id"
      },
      {
        header: "User Name",
        fieldName: "user_name",
        render: formatNull
      },
      {
        header: "MSISDN",
        fieldName: "msisdn",
        render: formatNull
      },
      {
        header: "Email",
        fieldName: "user_email",
        render: formatNull
      },
      {
        header: "Birth Date",
        fieldName: "birth_date",
        render: formatNull
      },
      {
        header: "Create Time",
        fieldName: "create_time",
        render: formatNull
      },
      {
        header: "Update Time",
        fieldName: "update_time",
        render: formatNull
      },
      {
        header: "User Age",
        fieldName: "user_age",
        render: formatNull
      }
    ];

    return (
      <Container fluid={true}>
        <Row>
          <Col>
            <div>Visitor Count: {this.state.visitorCount}</div>
          </Col>
          <Col>
            <div>CurrentPage: {this.state.currentPage}</div>
            <ButtonGroup>
              <Button type="Button" onClick={() => this.changePage("first")}>
                First
              </Button>
              <Button
                type="Button"
                onClick={() => this.changePage("previous-fast")}
              >
                {"<<"}
              </Button>
              <Button type="Button" onClick={() => this.changePage("previous")}>
                {"<"}
              </Button>
              <Button type="Button" onClick={() => this.changePage("next")}>
                {">"}
              </Button>
              <Button
                type="Button"
                onClick={() => this.changePage("next-fast")}
              >
                {">>"}
              </Button>
              <Button type="Button" onClick={() => this.changePage("last")}>
                Last
              </Button>
            </ButtonGroup>
          </Col>
          <Col>
            <Form>
              <Form.Group controlId="formPlaintextEmail">
                <Form.Label>Filter By Name</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.filter}
                  onChange={this.applyFilter.bind(this)}
                />
              </Form.Group>
              <Button
                onClick={() =>
                  this.setState({ currentPage: 1, fetched: false })
                }
              >
                Search
              </Button>
            </Form>
          </Col>
        </Row>

        <DataTable size="sm" columns={columns} rows={this.state.users} />
      </Container>
    );
  }
}

export default App;
