import React, { Component } from "react";
import "./Cards.css";
import axios from "axios";

const back_end_api = "/index";

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    axios
      .get(back_end_api)
      .then(res => {
        console.log(res.data);
        this.setState({ data: res.data });
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  }

  render() {
    return (
      <div className="card">
        {this.state.data.map((all, i) => (
          <ul key={i} className="card_ul">
            <li className="card_li">
              {all.temperature}, {all.description}, {all.city},
              <img className="iconLink" src={all.iconLink} alt="img" />,
              <img
                className="displayImages"
                src={all.displayImages}
                alt="img"
              />
            </li>
          </ul>
        ))}
      </div>
    );
  }
}

export default App;
