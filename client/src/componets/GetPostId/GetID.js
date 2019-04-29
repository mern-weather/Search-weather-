import React, { Component } from "react";
import { Row, Container, Col, Button } from "react-bootstrap";
import ReactMapboxGl, {
  Popup,
  ZoomControl,
  ScaleControl,
  Marker
} from "react-mapbox-gl";
import Spinner from "../spinner/Spinner";
import axios from "axios";
import markerUrl from "../../img/7fae17959c.png";
import "./imgSlide.css";

// {this.renderImages(displayImages ? displayImages : [])}
const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZW9hbiIsImEiOiJjanRpdXc3anQydGZuNDRsNjRva2ppc2xoIn0.2CqiJUJUSTh4RCNd66vV0A"
});

class AppID extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      data: [],
      i: 0
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;

    axios
      .get(`/index/${id}`)
      .then(res => {
        const { data } = res;
        const id = res.data._id;

        this.setState({ data });
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  }

  renderImages = displayImages =>
    displayImages.map(i => <img src={i} alt="" />);

  // renderdesription = desription => desription.map(i => <h3>{i}</h3>);
  // <p>{this.renderdesription(desription ? desription : [])}</p>

  render() {
    // const { id } = this.props.match.params;
    const mapStyle = `mapbox://styles/mapbox/streets-v9`;
    const styleCont = {
      height: "100vh",
      width: "100vh",
      margin: "0",
      padding: "0",
      borderRadius: "20px"
    };

    const {
      info,
      displayImages,
      city,
      temperature,
      iconLink,
      coordinates
    } = this.state.data;

    this.handelNextImg = () => {
      const lastIndex = displayImages.length - 1;
      const { i } = this.state;
      const shouldResetIndex = i === 0;
      const index = shouldResetIndex ? lastIndex : i - 1;
      this.setState({
        i: index
      });
    };

    this.handelPrevImg = () => {
      const lastIndex = displayImages.length - 1;
      const { i } = this.state;
      const shouldResetIndex = i === lastIndex;
      const index = shouldResetIndex ? 0 : i + 1;
      this.setState({
        i: index
      });
    };

    if (!displayImages || displayImages === null) {
      return <Spinner />;
    } else {
      return (
        <Container key={this.props.id} className=" flex-column">
          <div className="classMap">
            <Map
              style={mapStyle}
              containerStyle={styleCont}
              center={coordinates}
              zoom={[5]}
              attributionContro={true}
              dragRotate={true}
            >
              <ZoomControl />
              <ScaleControl measurement="mi" />
              <Marker coordinates={coordinates} anchor="bottom" />
              <Popup
                coordinates={coordinates}
                offset={{
                  "bottom-left": [12, -38],
                  bottom: [0, -38],
                  "bottom-right": [-12, -38]
                }}
              >
                <h1>{city}</h1>
              </Popup>
            </Map>
          </div>

          <h1>{city}</h1>
          <h1>{temperature}</h1>
          <h1>
            <img src={iconLink} alt="" />
          </h1>
          <Row className="imgSlideShow">
            <Col xs={8} md={6}>
              <Button
                onClick={() => this.handelNextImg()}
                variant="outline-secondary"
              >
                Next
              </Button>
              <img
                style={{
                  width: "300px",
                  height: "600px"
                }}
                src={displayImages[this.state.i]}
                alt=""
              />
              <Button
                onClick={() => this.handelPrevImg()}
                variant="outline-secondary"
              >
                Prev
              </Button>
            </Col>
            <Col className="container_info" md={4}>
              <h5 className="info">{info}</h5>
            </Col>
          </Row>
        </Container>
      );
    }
  }
}

export default AppID;
