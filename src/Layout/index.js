import React, { useState, useEffect } from "react";
import { Link, Route, Switch, useHistory, useLocation } from "react-router-dom";
import { deleteDeck, listDecks } from "../utils/api/index"
import CreateCard from "./CreateCard";
import DeckList from "./DeckList";
import Header from "./Header";
import View from "./View";
import Study from "./Study";
import NotFound from "./NotFound";
import CreateDeck from "./CreateDeck";

function Layout() {
  const location = useLocation();
  const history = useHistory();
  const [deckList, setDeckList] = useState([]);

  useEffect(() => {
    async function loadDecks() {
      const response = await listDecks();
      setDeckList(response);
    }
    loadDecks();
  }, [location])

  const deleteHandler = async (deckId) => {
    await deleteDeck(deckId);
    history.go();
  }

  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <Link to="/decks/new" className="btn btn-primary" style={{ marginBottom: 7 + "px" }}>Create Deck</Link>
            <DeckList deckList={deckList} deleteHandler={deleteHandler} />
          </Route>

          <Route path={["/decks/new", "/decks/:deckId/edit"]}>
            <CreateDeck deckList={deckList} />
          </Route>

          <Route exact path={["/decks/:deckId/cards/:cardId/edit", "/decks/:deckId/cards/new"]}>
            <CreateCard />
          </Route>

          <Route exact path="/decks/:deckId/study">
            <Study />
          </Route>

          <Route exact path="/decks/:deckId">
            <View />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
