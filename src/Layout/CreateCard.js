import React, { useEffect, useState } from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import NavBar from "./NavBar";
import CardForm from "./CardForm";
import { readCard, readDeck } from "../utils/api";

function CreateCard() {
    const { path } = useRouteMatch();
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
        // similar to deck form, create a loading variable and change it to false after weve fetched the data if were editing otherwise just set it to false
    }, [cardId, path])

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb"><NavBar linksToRender={path.includes("edit") ?
                    [{ url: "/", name: "Home" }, { url: `/decks/${deckId}`, name: `${name}` }, { url: `/decks/${deckId}/cards/${cardId}/edit`, name: "Edit Card" }]
                    : [{ url: "/", name: "Home" }, { url: `/decks/${deckId}`, name: `${name}` }, { url: `/decks/${deckId}/cards/edit`, name: "Add Card" }]
                } path={path} /></ol>
            </nav>

            <div>
                <h3>{`${name}`}</h3>
            </div>

            {!isLoading && <CardForm deckId={deckId} card={card} />}
        </>
    )
}

export default CreateCard;