import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../NavBar";
import CardForm from "./CardForm";
import { readDeck } from "../../utils/api";
import NotFound from "../NotFound";

export default function AddCard() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [error, setError] = useState([]);

  useEffect(() => {
    const abort = new AbortController();
    async function getDeck() {
      try {
        if (deckId) {
          const gotDeck = await readDeck(deckId, abort.signal);
          setDeck({ ...gotDeck });
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError((currErr) => [...currErr, err]);
        }
      }
    }
    getDeck();
    return () => abort.abort();
  }, [deckId]);

  if (error[0]) return <NotFound />;

  return (
    <>
      <div className="d-flex">
        <NavBar
          linkName={deck.name}
          link={`decks/${deck.id}`}
          pageName={"Add Card"}
        />
      </div>
      <div className="d-flex flex-column">
        <h2>{deck.name}: Add Card</h2>
        <CardForm />
      </div>
    </>
  );
}
