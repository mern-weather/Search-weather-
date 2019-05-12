import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactMapboxGl, {
  Popup,
  ZoomControl,
  ScaleControl
} from "react-mapbox-gl";
import { Link } from "react-router-dom";
import Spinner from "../spinner/Spinner";

import { Button, Row, Card, Container, Col } from "react-bootstrap";
import Moment from "react-moment";
import { connect } from "react-redux";
import { fetchPosts } from "../../actions/postAction";
import "./NewCard.css";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZW9hbiIsImEiOiJjanRpdXc3anQydGZuNDRsNjRva2ppc2xoIn0.2CqiJUJUSTh4RCNd66vV0A"
});

class App extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    const mapStyle = `mapbox://styles/mapbox/streets-v9`;
    const styleCont = {
      height: "100vh",
      width: "100vh",
      margin: "0",
      padding: "0",
      borderRadius: "20px"
    };
    const { data } = this.props;

    console.log(data);
    if (!data || data === null) {
      return <Spinner />;
    } else {
      return (
        <Container className="d-flex flex-column">
          <Map
            className="map_cont"
            style={mapStyle}
            containerStyle={styleCont}
            center={data.coordinates}
            zoom={[1]}
            attributionContro={true}
            dragRotate={true}
          >
            <ZoomControl />
            <ScaleControl measurement="mi" />
            {data.map(items => (
              <Popup
                coordinates={items.coordinates}
                offset={{
                  "bottom-left": [12, -38],
                  bottom: [0, -38],
                  "bottom-right": [-12, -38]
                }}
              >
                <p>
                  <em>{items.city}</em>{" "}
                </p>
              </Popup>
            ))}
          </Map>
          <Row className="justify-content-md-center">
            {data.map((all, i) => (
              <Col xs={6} md={4} key={i}>
                <Card style={{ width: "18rem" }}>
                  {!all.errorImage ? (
                    <Card.Img variant="top" src={all.displayImages} alt="img" />
                  ) : (
                    <Card.Img variant="top" src={all.errorImage} alt="img" />
                  )}

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
