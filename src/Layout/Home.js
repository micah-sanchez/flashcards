import React, { useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import DeckList from "../Decks/DeckList";
import NotFound from "./NotFound";
import CreateDeck from "../Decks/CreateDeck";
import Study from "../Decks/Study";
import ViewDeck from "../Decks/ViewDeck"
import AddCards from "../Cards/AddCards";
import { deleteDeck } from "../utils/api";
import EditDeck from "../Decks/EditDeck";

function Home() {

    const history = useHistory();
    const [decks, setDecks] = useState([]);

    const handleDelete = (id, arrayIndex) => {
        if (window.confirm("Delete this deck?")) {
            deleteDeck(id)
            decks.splice(arrayIndex, 1);
            setDecks(prev => [...decks])
            window.open("/")
        }
    }
    
    return (
        <>
            <Switch>
                <Route exact path="/">
                    <button style={{borderRadius:"10px"}}onClick={() => history.push("/decks/new")}>Create Deck</button>
                    <DeckList decks={decks} setDecks={setDecks} handleDelete={handleDelete}/>
                </Route>
                <Route exact path="/decks/new">
                    <CreateDeck />
                </Route>
                <Route exact path="/decks/:deckId">
                    <ViewDeck decks={decks} handleDelete={handleDelete} />
                </Route>
                <Route exact path="/decks/:deckId/study">
                    <Study decks={decks}/>
                </Route>
                <Route exact path="/decks/:deckId/cards/new">
                    <AddCards />
                </Route>
                <Route exact path="/decks/:deckId/edit">
                    <EditDeck />
                </Route>
                <Route>
                    <NotFound />
                </Route>
            </Switch>

            
            
        </>
    )
}

export default Home;