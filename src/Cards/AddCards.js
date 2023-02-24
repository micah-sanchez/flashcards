import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";
import CardComponent from "./CardComponent";


function AddCards({decks}) {
    const deckId = Number.parseInt(useParams().deckId);
    const [deck, setDeck] = useState({});
    const placeholderFront = "Front Side of Card";
    const placeholderBack = "Back Side of Card";


    const history = useHistory();

    const initialCardData = {
        front: "",
        back: "",
        id: "",
        deckId: deckId,
    }

    const [cardData, setCardData] = useState(initialCardData);

    useEffect(() => {
        async function getDeck() {
            try {
                const deck = await readDeck(deckId);
                setDeck(deck);
            } catch(error) {
                throw error
            }
        }
        getDeck();
    }, []);

    const cardChangeHandler = ({target}) => {
        console.log(target.name, target.value)
        setCardData({
            ...cardData,
            [target.name]: target.value
        })
    }
    
    const addCardSubmitHandler = (event) => {
        event.preventDefault();
        createCard(deckId, cardData);
        setCardData(initialCardData);
        //history.push(`/decks/${deck.id}`);
    }

    return (
        <>
        <ul className="breadcrumb">
            <li style={{paddingRight:"10px"}}><a href="/" >Home </a></li>
            <li>/</li>
            <li style={{paddingRight:"10px", paddingLeft:"10px"}}><a href="/decks/:deckId">{deck.name}</a></li>
            <li>/</li>
            <li style={{paddingRight:"10px", paddingLeft:"10px"}}>Add Card</li>
        </ul>
        <h2>{deck.name}: Add Card</h2>

        <CardComponent  
            back={cardData.back}
            front={cardData.front}
            deck={deck} 
            handleSubmit={addCardSubmitHandler}
            handleChange = {cardChangeHandler}
            placeholderFront={placeholderFront}
            placeholderBack={placeholderBack}/>
        

        </>
    )
}

export default AddCards;