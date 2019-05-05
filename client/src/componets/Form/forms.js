import React, { Component } from "react";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";

import axios from "axios";
const defaultSatte = {
  city: "",
  email: "",
  inputError: "",
  successMessage: ""
};
class AddCity extends Component {
  constructor(props) {
    super(props);

    this.state = { city: "", inputError: "", successMessage: "" };
  }

  handleChange = e => {
    let city = e.target.value;
    this.setState({ city });
  };

  handleChangeEmail = e => {
    let email = e.target.value;
    this.setState({ email });
  };

  validate = () => {
    let inputError = "";

    if (!this.state.city) {
      inputError = "enter the city";
    }
    if (inputError) {
      this.setState({ inputError });
      return false;
    }
    return true;
  };

  handleSubmit = e => {
    e.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      const user = {
        city: this.state.city,
        email: this.state.email
      };
      this.setState(defaultSatte);
      this.setState({ successMessage: "success" });

      //Call post============
      axios
        .post(`/weather`, { user })
        .then(res => {
          const id = res.data._id;

          this.props.history.push(`/index/${id}`);
        })
        .catch(error => {
          // handle error
          console.log(error, { err: error });
        });
      //=============
    }
  };

  render() {
    return (
      <div>
        <h1>{this.props.allCitis}</h1>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col>
              {this.state.inputError ? (
                <Alert variant="danger">Please {this.state.inputError} </Alert>
              ) : null}

              {this.state.successMessage === "success" ? (
                <Alert variant="success">
                  You have successfully added {this.state.city}
                </Alert>
              ) : null}
              <Form.Group>
                <Form.Label>Your city</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={this.state.city}
                  onChange={this.handleChange}
                  placeholder="Enter city"
                />
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChangeEmail}
                  placeholder="Enter email"
                />

                <Button
                  variant="secondary"
                  type="submit"
                  onClick={this.handleSubmit}
                  history={this.props.history}
                >
                  Add city:
                </Button>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default AddCity;
