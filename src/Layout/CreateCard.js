import React, { useEffect, useState } from "react";
import { NavLink, useHistory, useParams, useRouteMatch } from "react-router-dom";
import CardForm from "./CardForm";
import { readCard, readDeck } from "../utils/api";

function CreateCard() {
    const {path} = useRouteMatch();
    const { deckId, cardId } = useParams();
    const [{ name }, setDeckObj] = useState({})
    const [card, setCard] = useState({})
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        async function loadDeck() {
            const response = await readDeck(deckId);
            setDeckObj(response)
        }
        loadDeck();
    }, [deckId]);

    useEffect(() => {
        path.includes("edit") ? readCard(cardId).then(data => setCard(data)).then(() => setIsLoading(false)) : setIsLoading(false)
    }, [cardId])

    return (
        <>
            <NavLink to="/">Home</NavLink> / 
            <NavLink exact to={`/decks/${deckId}`}>{name}</NavLink> / 
            <NavLink exact to={`/decks/${deckId}/cards/${cardId}/edit`}>Add Card</NavLink>
            <div>
                <h3>{`${name}`}</h3>
            </div>

            {!isLoading && <CardForm deckId={deckId} card={card}/>}
        </>
    )
}

export default CreateCard;