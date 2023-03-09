import React, { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { createCard, updateCard } from "../utils/api";

function CardForm({ deckId, card }) {
    const history = useHistory();
    const { path } = useRouteMatch();

    const initialFormState = (path.includes("edit") ? {
        front: card.front,
        back: card.back,
    } : {
        front: "",
        back: "",
    });

    const [formData, setFormData] = useState({ ...initialFormState })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (path.includes("edit")) {
            card.front = formData.front;
            card.back = formData.back;
            updateCard(card)
            // again, similar to create deck, set card data to fom data and then update card if editing
            history.push(`/decks/${deckId}`)
        } else {
            await createCard(deckId, formData);
            // create card in specific deck with the current form data
            setFormData({ ...initialFormState })
            history.push(`/decks/${deckId}`);
        }

    }

    return (
        <form onSubmit={submitHandler}>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <label>
                    Front
                    <textarea name="front" type="text" placeholder="Front side of card" value={formData.front} onChange={handleChange}></textarea>
                </label>
                <label>
                    Back
                    <textarea name="back" placeholder="Back side of card" value={formData.back} onChange={handleChange}></textarea>
                </label>
            </div>
            <div>
                <button className="btn btn-secondary" style={{ marginRight: "7px" }} onClick={() => history.push(`/decks/${deckId}`)}>{path.includes("edit") ? "Cancel" : "Done"}</button>
                <button type="submit" className="btn btn-primary">{path.includes("edit") ? "Submit" : "Save"}</button>
            </div>
        </form>
    )
}

export default CardForm;