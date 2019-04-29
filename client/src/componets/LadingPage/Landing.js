import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
import "./Landing.css";

class LandingPage extends Component {
  render() {
    return (
      <div className="background_container">
        <header className="main-header">
          <Link to="/" className="brand-logo">
            <img src={logo} alt="logo" />
          </Link>

          <nav className="main_nav">
            <ul className="list">
              <Link to="/">Home</Link>
              <Link to="/form">Add Post</Link>
            </ul>
          </nav>
        </header>
        <div className="section-h">
          <h1 className="title">Today's weather</h1>
          <span className="subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt.
          </span>
        </div>
      </div>
    );
  }
}

export default LandingPage;
