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
        const cardLength = deck.cards.length;
        return (
            <>

            <fieldset style={{border:"solid"}}>
                <table>
                    <thead>
                        <tr>
                            <td><h1>{deck.name}</h1></td>
                            <td>{cardLength} cards</td>  
                        </tr>
                        <tr>
                            <h4>{deck.description}</h4>
                        </tr>
                        
                    </thead>
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
            </>
            
            
        )
    })

    return deckComponents
}

export default DeckList;