import React, { useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import DeckList from "../Decks/DeckList";
import NotFound from "./NotFound";
import CreateDeck from "../Decks/CreateDeck";
import Study from "../Decks/Study";
import ViewDeck from "../Decks/ViewDeck"
import AddCards from "../Cards/AddCards";

function Home() {

    const history = useHistory();
    const [decks, setDecks] = useState([]);
    
    return (
        <>
            <Switch>
                <Route exact path="/">
                    <button style={{borderRadius:"10px"}}onClick={() => history.push("/decks/new")}>Create Deck</button>
                    <DeckList decks={decks} setDecks={setDecks}/>
                </Route>
                <Route exact path="/decks/new">
                    <CreateDeck />
                </Route>
                <Route exact path="/decks/:deckId">
                    <ViewDeck decks={decks}/>
                </Route>
                <Route exact path="/decks/:deckId/study">
                    <Study decks={decks}/>
                </Route>
                <Route exact path="/decks/:deckId/cards/new">
                    <AddCards decks={decks}/>
                </Route>
                <Route>
                    <NotFound />
                </Route>
            </Switch>

            
            
        </>
    )
}

export default Home;