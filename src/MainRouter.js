import react from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../src/core/Home";
import SignUp from "../src/users/SignUp";
import SignIn from "../src/users/SignIn";


const MainRouter = () => (
  <div>
    <Switch>
      <Route path="/signup" component={SignUp}></Route>
      <Route path="/signin" component={SignIn}></Route>
      <Route path="/" component={Home}></Route>
    </Switch>
  </div>
);

export default MainRouter;
