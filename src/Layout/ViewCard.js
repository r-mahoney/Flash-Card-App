import React from "react";
import { Link, useParams } from "react-router-dom";

function ViewCard({ card, deckId, cardDeleteHandler }) {
    return (
        <div className="card" key={card.id} style={{ margin: "5px 0" }}>
            <div className="card-body" style={{ display: "flex" }}>
                <div className="left-side" style={{ flex: "1", margin: "0 10px" }}>
                    {card.front}
                </div>
                <div className="right-side" style={{ display: "flex", flexDirection: "column", flex: "1" }}>
                    {card.back}
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Link to={`/decks/${deckId}/cards/${card.id}/edit`} className="btn btn-secondary" style={{ margin: "0 5px" }}>Edit</Link>
                        <button className="btn btn-danger" style={{ margin: "0 5px" }} onClick={() => {
                            return window.confirm("Do you want to delete this card?") ? (cardDeleteHandler(card.id)) : ""
                        }}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewCard;