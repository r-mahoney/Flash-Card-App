import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import NavBar from "./NavBar";
import StudyCard from "./StudyCard";

function Study() {
    const history= useHistory();
    const { deckId } = useParams();
    const [cards, setCards] = useState([]);
    const [deckObj, setDeckObj] = useState({})
    const [cardShowing, setCardShowing] = useState(0);
    // initialize a state counter to keep track of which card is showing
    const [isFlipped, setIsFlipped] = useState(false);
    // initilize flip state to toggle front and back of card
    const length = cards.length;


    const flipHandler = () => {
        setIsFlipped(!isFlipped)
    }
    const nextHandler = () => {
        return (cardShowing < cards.length - 1) ? setCardShowing(currentCard => currentCard + 1) :
            (window.confirm("Do you want to restart the deck? \n  \n Click 'cancel' to return to the home page.") ? setCardShowing(0) : history.push("/"));
            // I initialized cardShowing at 0 to match the index of the card so if card showing is less than length -1 to math index of final card
            // if youre not at the final index, add 1 to the cardShowing counter, if you are at the end, promp to restart the deck or return hume
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

            <h1>{deckObj.name} : Study</h1>

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