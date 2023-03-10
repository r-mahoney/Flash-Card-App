import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { updateDeck, createDeck } from '../utils/api';

function Form({ path, deck, deckId, deckList}) {
    const history = useHistory();

    const initialFormState = (path.includes("edit") ? {
        name: deck.name,
        description: deck.description
    } : {name: "", description: ""})

    const [formData, setFormData] = useState({ ...initialFormState })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (path.includes("edit")) {
            deck.name = formData.name;
            deck.description = formData.description;
            updateDeck(deck);
            // if youre editing a deck, set the deck info to be the fform info and then update the deck with the new info
            history.push(`/decks/${deckId}`)
        } else {
            await createDeck(formData);
            //if youre creating, just create a new deck with the form info
            setFormData({ ...initialFormState });
            history.push(`/decks/${deckList.length + 1}`)
            // using decklist.length + 1 to get to the newly created deck page
            // this is typically /decks/${deckId} but in  theory we dont know the ID of teh newly created deck, but we do know its appended to the end off the array
        }
    }
    
    return (
        <form onSubmit={handleSubmit}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label>
                        Name
                        <input name="name" type="text" placeholder="Deck Name" value={formData.name} onChange={handleChange}></input>
                    </label>
                    <label>
                        Description
                        <textarea name="description" placeholder="Brief description of the deck" rows={4} value={formData.description} onChange={handleChange}></textarea>
                    </label>
                </div>
                <div>
                    <button className="btn btn-secondary" style={{ marginRight: "7px" }} onClick={() => { path.includes("edit") ? history.push(`/decks/${deckId}`) : history.push("/") }}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
    )
}

export default Form;