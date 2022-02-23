import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import NotFound from "../NotFound";
import { createDeck, readDeck, updateDeck } from "../../utils/api";

export default function DeckForm({ mode }) {
  const history = useHistory();
  const { deckId } = useParams();

  const initialFormData = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState({ ...initialFormData });
  const [error, setError] = useState([]);

  const handleChange = ({ target }) =>
    setFormData({ ...formData, [target.name]: target.value });

  useEffect(() => {
    const abort = new AbortController();

    async function getEditDeck() {
      try {
        const deckToEdit = await readDeck(deckId, abort.signal);
        setFormData({ ...deckToEdit });
      } catch (err) {
        if (err.name !== "AbortError") {
          setError((currErr) => [...currErr, err]);
        }
      }
    }
    if (mode === "edit") {
      getEditDeck();
    }
    return () => abort.abort();
  }, [deckId, mode]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const abort = new AbortController();
    async function createNewDeck() {
      try {
        const createdDeck = await createDeck(formData, abort.signal);
        setFormData({ ...initialFormData });
        history.push(`/decks/${createdDeck.id}`);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError((currErr) => [...currErr, err]);
        }
      }
    }
    async function editDeck() {
      try {
        await updateDeck(formData, abort.signal);
        history.push(`/decks/${deckId}`);
      } catch (err) {
        setError((currErr) => [...currErr, err]);
      }
    }
    mode === "create" ? createNewDeck() : editDeck();
    return () => abort.abort();
  };

  if (error[0]) return <NotFound />;

  return (
    <div className="d-flex flex-column">
      <form className="col-12" onSubmit={handleSubmit}>
        <div className="row form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control form-control-lg"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Deck Name"
          />
        </div>
        <div className="row form-group">
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            className="form-control form-control-lg"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Brief description of the deck"
          />
        </div>
        <div className="row">
          <Link
            to={mode === "create" ? "/" : `/decks/${deckId}`}
            className="btn btn-secondary mr-2"
          >
            Cancel
          </Link>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
