import React, { useEffect, useState } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { listDecks } from "../utils/api";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";

function Layout() {
  const [decks, setDecks] = useState([]);
  useEffect(() => {
    const ac = new AbortController();
    async function getDecks() {
      try {
        const receivedDecks = await listDecks(ac.signal);
        setDecks(receivedDecks);
      } catch (error) {
        throw error;
      }
    }
    getDecks();
    return ac.abort();
  }, []);
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <Home decks={decks} />
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
