import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import DeckList from "../Decks/DeckList";
import NotFound from "./NotFound";

function Home() {
    
    return (
        <>
            <button>Create Deck</button>
            <Switch>
                <Route>
                    <DeckList exact path="/"/>
                </Route>
                <Route>
                    <NotFound />
                </Route>
            </Switch>

            
            
        </>
    )
}

export default Home;