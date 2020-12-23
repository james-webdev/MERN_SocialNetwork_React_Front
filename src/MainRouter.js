import { Route, Switch } from "react-router-dom";
import Home from "../src/core/Home";
import Menu from "../src/core/Menu";
import SignUp from "../src/users/SignUp";
import SignIn from "../src/users/SignIn";
import Profile from "../src/users/Profile";
import Users from "../src/users/Users";
import PostCreateForm from "../src/posts/PostCreateForm";
import SinglePost from "../src/posts/SinglePost";
import UserUpdateForm from "../src/users/UserUpdateForm";
import PrivateRoute from "../src/users/PrivateRoute";

const MainRouter = () => (
  <div>
    <Menu />
    <Switch>
      <Route exact path="/users" component={Users}></Route>
      <Route exact path="/userupdateform" component={UserUpdateForm}></Route>
      <PrivateRoute
        exact
        path="/post/:postId"
        component={SinglePost}
      ></PrivateRoute>
      <Route
        exact
        path="/postcreate/:userId"
        component={PostCreateForm}
      ></Route>
      <Route exact path="/signup" component={SignUp}></Route>
      <Route exact path="/signin" component={SignIn}></Route>
      <Route exact path="/" component={Home}></Route>
      <PrivateRoute
        exact
        path="/user/:userId"
        component={Profile}
      ></PrivateRoute>
    </Switch>
  </div>
);

export default MainRouter;
