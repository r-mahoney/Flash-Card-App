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
    // provide a isLoading state to be able to wait for the deckObj to be set before loading the form

    useEffect(() => {
        path.includes("edit") ? readDeck(deckId).then(data => setDeckObj(data)).then(() => setIsLoading(false)) : setIsLoading(false)
        // if youre editing, fetch data then change isLoading state so the form will be able to display editable strings
        // if not editing, just set state to ffalse so you dont get stuck on a loading screen waiting for data that will never come
    }, [deckId, path])




    return (
        <>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb"><NavBar linksToRender={path.includes("edit") ?
                    [{ url: "/", name: "Home" }, { url: `/decks/${deckId}`, name: `${deckObj.name}` }, { url: `/decks/${deckId}/edit`, name: "Edit Deck" }]
                    :[{ url: "/", name: "Home" }, { url: `/decks/edit`, name: "Add Deck" }]
                    // add some logic to chane the props passed based on editing or creating
            } path={path} /></ol>
            </nav>
            <h1>{path.includes("edit") ? "Edit Deck" : "Create Deck"}</h1>
            {!isLoading && <Form path={path} deckId={deckId} deck={deckObj} deckList={deckList} />}
            {/* wait til youre done loading then load the form with the correct data */}
        </>
    )
}

export default CreateDeck;