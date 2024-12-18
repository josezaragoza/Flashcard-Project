import React from "react";
import NavBar from "../NavBar";
import DeckForm from "./DeckForm";

export default function CreateDeck() {
  return (
    <>
      <div className="d-flex">
        <NavBar pageName={"Create Deck"} />
      </div>
      <div className="d-flex flex-column">
        <h2>Create A Deck</h2>
        <DeckForm mode="create" />
      </div>
    </>
  );
}
