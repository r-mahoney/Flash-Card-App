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
    }, [cardId])

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb"><NavBar linksToRender={[{ url: "/", name: "Home" }, { url: `/decks/${deckId}`, name: `${name}`}, {url:`/decks/${deckId}/cards/${cardId}/edit`, name:"Add Card"}]} path={path}/></ol>
            </nav>

            <div>
                <h3>{`${name}`}</h3>
            </div>

            {!isLoading && <CardForm deckId={deckId} card={card} />}
        </>
    )
}

export default CreateCard;