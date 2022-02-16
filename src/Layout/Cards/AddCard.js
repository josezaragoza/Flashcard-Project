import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../NavBar";
import CardForm from "./CardForm";
import { readDeck } from "../../utils/api";

export default function AddCard() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});

  useEffect(() => {
    const abortCon = new AbortController();
    async function getDeck() {
      try {
        if (deckId) {
          const gotDeck = await readDeck(deckId, abortCon.signal);
          setDeck({ ...gotDeck });
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          throw error;
        }
      }
    }
    getDeck();
    return () => abortCon.abort;
  }, [deckId]);

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
