import { Route, Switch } from "react-router-dom";
import Home from "../src/core/Home";
import Menu from "../src/core/Menu";
import SignUp from "../src/users/SignUp";
import SignIn from "../src/users/SignIn";
import Profile from "../src/users/Profile";

const MainRouter = () => (
  <div>
    <Menu />
    <Switch>
      <Route exact path="/signup" component={SignUp}></Route>
      <Route exact path="/signin" component={SignIn}></Route>
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/user/:userId" component={Profile}></Route>
    </Switch>
  </div>
);

export default MainRouter;
