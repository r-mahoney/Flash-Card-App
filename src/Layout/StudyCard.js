import React, { useState } from "react";

function StudyCard({ card, index, cardShowing, nextHandler, flipHandler, isFlipped, length }) {

    return (
        (cardShowing === index) && <div className="card" key={card.id} style={{ margin: "5px 0" }}>
            <h4 style={{margin:"0 10px", padding:"20px 20px 0 20px"}}>Card {index + 1} of {length}</h4>
            <div className="card-body" style={{ display: "flex" }}>
                {!isFlipped && <div className="left-side" style={{ flex: "1", margin: "0 10px" }}>
                    {card.front}
                </div>}
                {isFlipped && <div className="right-side" style={{ display: "flex", flexDirection: "column", flex: "1" }}>
                    {card.back}
                </div>}
                <button onClick={flipHandler} className="btn btn-secondary" style={{ marginRight: "5px" }}>Flip</button>
                {isFlipped && <button className="btn btn-primary" onClick={() => { nextHandler(); flipHandler() }}>Next</button>}
            </div>
        </div>
    )
}

export default StudyCard;