import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";

import "./App.css";
import Landing from "./componets/LadingPage/Landing";
import AddCity from "./componets/Form/forms";
import NewCard from "./componets/newCard/NewCard";
import AppID from "./componets/GetPostId/GetID";

import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Landing />
            <Switch
              atEnter={{ opacity: 0 }}
              atLeave={{ opacity: 0 }}
              atActive={{ opacity: 1 }}
            >
              <Route exact path="/form" component={AddCity} />
              <Route exact path="/" component={NewCard} />
              <Route path="/index/:id" component={AppID} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
