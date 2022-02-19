import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createCard, readCard, updateCard } from "../../utils/api";

export default function CardForm({ mode = "create" }) {
  const history = useHistory();
  const { deckId, cardId } = useParams();
  const initialFormData = {
    front: "",
    back: "",
  };
  const [formData, setFormData] = useState({ ...initialFormData });

  const handleChange = ({ target }) =>
    setFormData({ ...formData, [target.name]: target.value });

  useEffect(() => {
    const abort = new AbortController();
    async function getEditCard() {
      try {
        const cardToEdit = await readCard(cardId, abort.signal);
        setFormData({ ...cardToEdit });
      } catch (error) {
        if (error.name !== "AbortError") {
          throw error;
        }
      }
    }
    if (mode === "edit") {
      getEditCard();
    }
  }, [cardId, mode]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const abort = new AbortController();
    async function addCard() {
      try {
        await createCard(deckId, formData, abort.signal);
        setFormData({ ...initialFormData });
      } catch (error) {
        throw error;
      }
    }
    async function editCard() {
      try {
        await updateCard(formData, abort.signal);
        history.push(`/decks/${deckId}`);
      } catch (error) {
        throw error;
      }
    }
    mode === "edit" ? editCard() : addCard();
  };

  return (
    <div className="d-flex flex-column">
      <form className="col-12" onSubmit={handleSubmit}>
        <div className="row form-group">
          <label htmlFor="front">Front</label>
          <textarea
            type="text"
            className="form-control form-control-lg"
            id="front"
            name="front"
            value={formData.front}
            onChange={handleChange}
            placeholder="Front side of card"
          />
        </div>
        <div className="row form-group">
          <label htmlFor="back">Back</label>
          <textarea
            type="text"
            className="form-control form-control-lg"
            id="back"
            name="back"
            value={formData.back}
            onChange={handleChange}
            placeholder="Back side of card"
          />
        </div>
        <div className="row">
          <Link to={`/decks/${deckId}`} className="btn btn-secondary mr-2">
            {mode === "edit" ? "Cancel" : "Done"}
          </Link>
          <button type="submit" className="btn btn-primary">
            {mode === "edit" ? "Submit" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
