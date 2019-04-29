import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Spinner from "../spinner/Spinner";

import { Button, Row, Card, Container, Col, Jumbotron } from "react-bootstrap";
import Moment from "react-moment";
import { connect } from "react-redux";
import { fetchPosts } from "../../actions/postAction";
import "./NewCard.css";

class App extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    const { data } = this.props;
    if (!data || data === null) {
      return <Spinner />;
    } else {
      return (
        <Jumbotron>
          <Container className="d-flex flex-column">
            <Row className="justify-content-md-center">
              {data.map((all, i) => (
                <Col xs={6} md={4} key={i}>
                  <Card style={{ width: "18rem" }}>
                    <Card.Img variant="top" src={all.displayImages} alt="img" />
                    <Card.Body>
                      <Card.Title>{all.city}</Card.Title>
                      <Card.Text>
                        <i className="far fa-eye" />
                        {all.views}
                      </Card.Text>
                      <Card.Text>
                        <img src={all.iconLink} alt="" />
                        {all.desription}
                        <Moment fromNow ago>
                          {all.date}
                        </Moment>
                      </Card.Text>
                      <Link to={`/index/${all._id}`}>
                        <Button variant="primary">Primary</Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </Jumbotron>
      );
    }
  }
}

App.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
  data: state.data.items
});

export default connect(
  mapStateToProps,
  { fetchPosts }
)(App);
