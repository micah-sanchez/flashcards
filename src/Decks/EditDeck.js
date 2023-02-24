import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";

function EditDeck({deck, setDeck}) {

    const history = useHistory();

    const deckIdentifier = Number.parseInt(useParams().deckId);
    const [deckName, setDeckName] = useState("");
    const [deckDesc, setDeckDesc] = useState("");

    useEffect(() => {
        async function getDeck() {
            try {
                const response = await readDeck(deckIdentifier);
                setDeck(response);
                setDeckName(response.name);
                setDeckDesc(response.description)
            } catch(error) {
                throw error
            }
        }
        getDeck();
    }, [deckIdentifier]); // //deck.id

    const editChangeHandler = (event) => {
        if (event.target.name === "name") {
            setDeckName(event.target.value)
        } else {
            setDeckDesc(event.target.value)
        }
        console.log(deckName, deckDesc)
    }

    const editSubmitHandler = (event) => {
        event.preventDefault();
        updateDeck({
            ...deck,
            name: deckName,
            description: deckDesc,
        });
        history.push(`/decks/${deckIdentifier}`)
    }

    return (
        <>
        <ul className="breadcrumb">
                <li style={{paddingRight:"10px"}}><a href="/" >Home </a></li>
                <li>/</li>
                <li style={{paddingRight:"10px", paddingLeft:"10px"}}><a href="/decks/:deckId">{deckName}</a></li>
                <li>/</li>
                <li style={{paddingRight:"10px", paddingLeft:"10px"}}>Study</li>
            </ul>
        <h1>Edit Deck</h1>
        <form style={{padding:"10px"}} onSubmit={editSubmitHandler}>
            <label>Name</label>
            <input style={{width:"100%"}}
                name="name"
                id="name"
                type="text"
                value={deckName}
                onChange={editChangeHandler}
            />
            <label style={{paddingTop:"20px"}}>Description</label>
            <textarea style={{width:"100%"}}
                name="description"
                id="description"
                type="text"
                value={deckDesc}
                onChange={editChangeHandler}
                rows="3"
            />
            <button style={{marginTop: "20px", marginRight: "10px", borderRadius: "10px"}} onClick={() => history.push(`/decks/${deckIdentifier}`)}>Cancel</button>
            <button style={{borderRadius: "10px"}}type="submit">Submit</button>
        </form>
        </>
    )
}

export default EditDeck;