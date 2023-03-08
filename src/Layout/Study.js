import React, { useState, useEffect } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import NavBar from "./NavBar";
import StudyCard from "./StudyCard";

function Study() {
    const { deckId } = useParams();
    const [cards, setCards] = useState([]);
    const [deckObj, setDeckObj] = useState({})
    const [cardShowing, setCardShowing] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const { name } = deckObj;
    const length = cards.length;


    const flipHandler = () => {
        setIsFlipped(!isFlipped)
    }
    const nextHandler = () => {
        return (cardShowing < cards.length - 1) ? setCardShowing(currentCard => currentCard + 1) :
            (window.confirm("Do you want to restart the deck?") ? setCardShowing(0) : "");
    }

    useEffect(() => {
        async function loadDeck() {
            const response = await readDeck(deckId)
            setCards([...response.cards])
            setDeckObj({ ...response })
        }
        loadDeck();
    }, [deckId])
    

    return (
        <>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb"><NavBar linksToRender={[{url: "/", name:"Home"}, {url: `/decks/${deckId}`, name:`${deckObj.name}`}, {url: "", name:"Study"}, ]}/></ol>
        </nav>
            {/* <NavLink to="/">Home</NavLink> / 
            <NavLink exact to={`/decks/${deckId}`}>/{name}</NavLink> / 
            <NavLink to="study" className={isActive =>
                (isActive ? " active-link" : "")
            }>/Study</NavLink> */}

            <h1>{name}</h1>

            {cards.length >= 3 ? (cards.map((card, index) => <StudyCard card={card}
                index={index} key={card.id}
                cardShowing={cardShowing} nextHandler={nextHandler}
                flipHandler={flipHandler} isFlipped={isFlipped}
                length={length} />))
                : (
                    <div>
                        <h3>Not enough cards.</h3>
                        <p>You need at least 3 cards to study. There are {cards.length} in this deck.</p>
                        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">Create Cards</Link>
                    </div>
                )}
        </>
    )
}

export default Study;