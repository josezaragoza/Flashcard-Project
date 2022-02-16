import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteDeck, listDecks } from "../../utils/api";

export default function DeckList() {
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

  async function handleDelete({ target }) {
    const value = target.value;
    const result = window.confirm(
      `Delete deck ID ${value}? You will not be able to recover it.`
    );
    if (result) {
      const ac = new AbortController();
      async function deleteData() {
        try {
          await deleteDeck(value);
          const output = await listDecks(ac.signal);
          setDecks(output);
        } catch (error) {
          throw error;
        }
      }
      deleteData();
      return ac.abort();
    }
  }

  if (decks.length > 0) {
    return (
      <div>
        {decks.map((deck) => (
          <div className="card">
            <div className="container">
              <div className="row card-header">
                <div className="col-10">
                  <h4>{deck.name}</h4>
                </div>
                <div className="col-2">
                  <p> {deck.cards.length} cards</p>
                </div>
              </div>
            </div>

            <div className="card-body">
              <p className="card-text">{deck.description}</p>
              <div className="container">
                <div className="row justify-content-between">
                  <div className="col-4">
                    <Link to={`decks/${deck.id}`} className="btn btn-secondary">
                      View
                    </Link>{" "}
                    &nbsp;
                    <Link
                      to={`decks/${deck.id}/study`}
                      className="btn btn-primary"
                    >
                      Study
                    </Link>
                  </div>
                  <div className="col-1">
                    <button
                      className="btn btn-danger"
                      value={deck.id}
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return "Please add a deck.";
}
