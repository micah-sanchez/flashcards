import React, {useState, useEffect } from "react";
import { listDecks } from "../utils/api";

function DeckList() {

    const [decks, setDecks] = useState([]);

    useEffect(() => {

        async function loadDecks() {

            try {
                const decksData = await listDecks();
                console.log(decks);
                setDecks(decksData);
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("AbortError");
                } else {
                    throw error;
                }
            } 
        }
        loadDecks();
    }, [])

    

    const deckComponents = decks.map((deck) => {
        return (
            <>
                <h1>{deck.name}</h1>
                <h4>{deck.description}</h4>
            </>
            
        )
    })

    return deckComponents
}

export default DeckList;