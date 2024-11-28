import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import Home from "./Home";
import Docs from "./Docs";
import About from "./About";
import Contact from "./Contact";
import Pricing from "./Prices";
import ApplicationSelector from "./ApplicationSelector";

function App() {
  return (
    <Router>
        <Switch>
        <Route path="/services">
            <ApplicationSelector />
          </Route>
          <Route path="/docs">
            <Docs />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/pricing">
            <Pricing />
          </Route>
          <Route path="/">
            <Home />
          </Route>

x
        </Switch>
      {/* </AuthProvider> */}
    </Router>
  );
}

export default App
