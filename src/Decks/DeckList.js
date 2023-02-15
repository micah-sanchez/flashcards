import React, {useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { listDecks } from "../utils/api";

function DeckList() {

    const history = useHistory();
    const [decks, setDecks] = useState([]);

    useEffect(() => {

        async function loadDecks() {

            try {
                const decksData = await listDecks();
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
            <fieldset>
                <h1>{deck.name}</h1>
                <h4>{deck.description}</h4>
                <table>
                    <tbody>
                        <tr>
                            <button onClick={(event) => {
                        history.push(`/decks/${deck.id}`)}}>View</button>
                            <button onClick={(event) => history.push(`/decks/${deck.id}/study`)}>Study</button>
                            <button>Trash</button>
                        </tr>
                    </tbody>
                </table>
            </fieldset>
            
        )
    })

    return deckComponents
}

export default DeckList;