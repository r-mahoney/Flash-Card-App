import React, { useEffect, useState } from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import { readDeck } from "../utils/api";
import Form from "./Form";
import NavBar from "./NavBar";
import "./CreateDeck.css"

function CreateDeck({ deckList }) {
    const { path } = useRouteMatch();
    const { deckId } = useParams();
    const [deckObj, setDeckObj] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        path.includes("edit") ? readDeck(deckId).then(data => setDeckObj(data)).then(() => setIsLoading(false)) : setIsLoading(false)
    }, [deckId])




    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb"><NavBar linksToRender={path.includes("edit") ?
                    [{ url: "/", name: "Home" }, { url: `/decks/${deckId}`, name: `${deckObj.name}` }, { url: `/decks/${deckId}/edit`, name: "Edit Deck" }]
                    :[{ url: "/", name: "Home" }, { url: `/decks/edit`, name: "Add Deck" }]
            } path={path} /></ol>
            </nav>
            <h1>{path.includes("edit") ? "Edit Deck" : "Create Deck"}</h1>
            {!isLoading && <Form path={path} deckId={deckId} deck={deckObj} deckList={deckList} />}

        </>
    )
}

export default CreateDeck;