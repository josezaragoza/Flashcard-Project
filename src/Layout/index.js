import React, { Fragment, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import CreateDeck from "./Deck/CreateDeck";
import Home from "./Home";
import Study from "./Deck/Study";
import ViewDeck from "./Deck/ViewDeck";
import EditDeck from "./Deck/EditDeck";
import { listDecks } from "../utils/api";
import EditCard from "./Cards/EditCard";
import AddCard from "./Cards/AddCard";

function Layout() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    setDecks([]);

    const abortCon = new AbortController();

    async function prepDecks() {
      try {
        const preppedDecks = await listDecks();
        setDecks(preppedDecks);
      } catch (error) {
        if (error.name !== "AbortError") {
          throw error;
        }
      }
    }

    prepDecks();

    return abortCon.abort();
  }, []);

  return (
    <Fragment>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path={"/"}>
            <Home decks={decks} />
          </Route>
          <Route exact path={"/decks/new"}>
            <CreateDeck />
          </Route>
          <Route exact path={"/decks/:deckId"}>
            <ViewDeck />
          </Route>
          <Route exact path={"/decks/:deckId/edit"}>
            <EditDeck />
          </Route>
          <Route exact path={"/decks/:deckId/study"}>
            <Study />
          </Route>
          <Route exact path={"/decks/:deckId/cards/new"}>
            <AddCard />
          </Route>
          <Route exact path={"/decks/:deckId/cards/:cardId/edit"}>
            <EditCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Fragment>
  );
}

export default Layout;
