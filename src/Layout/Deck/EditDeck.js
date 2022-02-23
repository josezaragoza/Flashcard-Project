import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../NavBar";
import NotFound from "../NotFound";
import { readDeck } from "../../utils/api";
import DeckForm from "./DeckForm";

export default function EditDeck() {
  const [deck, setDeck] = useState({});
  const [error, setError] = useState([]);

  const { deckId } = useParams();

  useEffect(() => {
    const abort = new AbortController();
    async function getCurrentDeck() {
      try {
        const currentDeck = await readDeck(deckId, abort.signal);
        setDeck({ ...currentDeck });
      } catch (err) {
        if (err.name !== "AbortError") {
          setError((currErr) => [...currErr, err]);
        }
      }
    }
    getCurrentDeck();
    return abort.abort();
  }, [deckId]);

  if (error[0]) return <NotFound />;

  return (
    <>
      <div className="d-flex">
        <NavBar
          linkName={deck.name}
          link={`/decks/${deck.id}`}
          pageName={"Edit Deck"}
        />
      </div>
      <div className="d-flex flex-column">
        <h2>Edit Deck</h2>
        <DeckForm mode="edit" />
      </div>
    </>
  );
}
