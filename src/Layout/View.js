import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { deleteCard, readDeck } from "../utils/api";
import NavBar from "./NavBar";
import ViewCard from "./ViewCard";

function View() {
    const history = useHistory();
    const { deckId } = useParams();
    const [cards, setCards] = useState([]);
    const [deckObj, setDeckObj] = useState({})
    const { name, description } = deckObj;
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        async function loadDeck() {
            const response = await readDeck(deckId)
            setCards([...response.cards])
            setDeckObj({ ...response })
            setIsLoading(false);
        }
        loadDeck();
    }, [deckId])


    const cardDeleteHandler = async (cardId) => {
        await deleteCard(cardId);
        history.go(0)
    }

    if (isLoading) {
        return <h1>Loading . . .</h1>
    } else {
        return (
            <>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb"><NavBar linksToRender={[{ url: "/", name: "Home" }, { url: `/decks/${deckId}`, name: `${deckObj.name}` }]} /></ol>
                </nav>
                <div>
                    <h4>{name}</h4>
                    <p>{description}</p>
                    <div>
                        <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary" style={{ marginRight: "5px" }}>Edit</Link>
                        <Link to={`/decks/${deckId}/study`} className="btn btn-primary" style={{ marginRight: "5px" }}>Study</Link>
                        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">Create a Card</Link>
                    </div>
                </div>

                <h3>Cards</h3>

                {cards.length > 0 ? (
                    cards.map(card => (
                        <ViewCard card={card} deckId={deckId} cardDeleteHandler={cardDeleteHandler} key={card.id} />
                    ))
                ) : (
                    <>
                        <p>No Cards in this deck</p>
                        <p>Please add cards</p>
                    </>
                )}
            </>
        )
    }
}

export default View;