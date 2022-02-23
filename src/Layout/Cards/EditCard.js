import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../NavBar";
import NotFound from "../NotFound";
import { readDeck } from "../../utils/api";
import CardForm from "./CardForm";

export default function EditCard() {
  const { deckId, cardId } = useParams();
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
          linkName={`Deck ${deck.name}`}
          link={`/decks/${deck.id}`}
          pageName={`Edit Card ${cardId}`}
        />
      </div>
      <div className="d-flex flex-column">
        <h2>Edit Card</h2>
        <CardForm mode="edit" />
      </div>
    </>
  );
}
