import React, { useEffect, useState } from "react";
import { NavLink, useHistory, useParams, useRouteMatch } from "react-router-dom";
import { readDeck } from "../utils/api";
import Form from "./Form";
import "./CreateDeck.css"

function CreateDeck({ deckList }) {
    const { path } = useRouteMatch();
    const { deckId } = useParams();
    const [deckObj, setDeckObj] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        path.includes("edit") ? readDeck(deckId).then(data => setDeckObj(data)).then(()=> setIsLoading(false)) : setIsLoading(false)
    }, [deckId])




    return (
        <>
            <NavLink to="/">Home</NavLink> / 
            <NavLink exact to={`/decks/${deckId}`} isActive={() => [`/decks/${deckId}`, '/decks/new'].includes(path)} className={isActive =>
                (isActive ? " active-link" : "")}>{path.includes("edit") ? `/${deckObj.name}` : "/Create Deck"}</NavLink> / 
            {path.includes("edit") && <NavLink to="edit" className={isActive =>
                (isActive ? " active-link" : "")
            }>/Edit Deck</NavLink>}
            <h1>{path.includes("edit") ? "Edit Deck" : "Create Deck"}</h1>
            {!isLoading && <Form path={path} deckId={deckId} deck={deckObj} deckList={deckList} />}
            
        </>
    )
}

export default CreateDeck;