import React from "react";
import Deck from "./Deck";

function DeckList({ deckList, deleteHandler }) {
    return (
        deckList.map((deck) => (
            <Deck deck={deck} key={deck.id} deleteHandler={deleteHandler}/>
        ))
    )
}

export default DeckList;