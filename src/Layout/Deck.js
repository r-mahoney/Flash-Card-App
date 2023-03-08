import React from "react";
import { Link } from "react-router-dom";

function Deck({ deck, deleteHandler }) {
    const { cards } = deck;
    return (
        <>
            <div className="card" style={{ marginBottom: 5 + "px" }}>
                <div className="card-body">
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <h5>{deck.name}</h5>
                        <p style={{ margin: "0 0 8px", fontSize: "12px" }}>{cards.length} cards</p>
                    </div>
                    <p>{deck.description}</p>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div>
                            <Link to={`/decks/${deck.id}`} className="btn btn-secondary" style={{ marginRight: "5px" }}>View</Link>
                            <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">Study</Link>
                        </div>
                        <div>
                            <button className="btn btn-danger" onClick={() => 
                                window.confirm("Are you sure you want to delete?") ? deleteHandler(deck.id)
                            : ""}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Deck;