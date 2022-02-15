import { Link } from "react-router-dom";
import DeckList from "./Decks/DeckList";

export default function Home({decks}) {
    return (
        <div className='d-flex flex-column'>
            <div className="mb-2 ">
                <Link to="/decks/new" className="btn btn-secondary">Create Deck</Link>
            </div>
            <div>
                <DeckList decks={decks}/>
            </div>
        </div>
    )
}