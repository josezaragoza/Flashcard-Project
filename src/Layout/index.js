import Header from "./Header";
import NotFound from "./NotFound";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";

function Layout() {

  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route>
        <NotFound />            
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
