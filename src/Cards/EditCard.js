import React, { useState, useEffect} from "react";
import { readDeck, updateCard, readCard } from "../utils/api";
import { useParams, useHistory } from "react-router-dom";
import CardComponent from "./CardComponent";

function EditCard() {
    const history = useHistory();
  
    const { deckId, cardId } = useParams()

    const intialCardState = {
        front: "",
        back: "",
        deckId: "",
        id: ""
    }
  
    const [card, setCard]= useState(intialCardState);
    const [cardFront, setCardFront] = useState("");
    const [cardBack, setCardBack] = useState("");
    const [deck, setDeck] = useState("");
    
      useEffect(() => {
        const abortController = new AbortController();

        async function getDeck() {
            try {
                const response = await readDeck(deckId, abortController.signal)
                const deck = response
                    setDeck(deck);
            } catch(error) {
                throw error
            }
            return () => {
                abortController.abort();
            }
        }
        getDeck();
    }, [deckId]);
  
    useEffect(() => {
        const abortController = new AbortController();

        async function getCard() {
            try {
              const cardResponse = await readCard(cardId, abortController.signal)
              console.log(cardId)
              setCard(cardResponse)
              setCardFront(cardResponse.front);
              setCardBack(cardResponse.back);
            } catch(error) {
                throw error
            }
            return () => {
                abortController.abort();
            }
        }
        getCard();
    }, [cardId]);

    const editCardChangeHandler = (event) => {
        if (event.target.name === "front") {
            setCardFront(event.target.value)
        } else {
            setCardBack(event.target.value)
        }
        
    }

    const editCardSubmitHandler = (event) => {
        event.preventDefault();
        console.log(cardFront, cardBack)
        updateCard({ 
            ...card,
                front: cardFront,
                back: cardBack,
            })
        history.push(`/decks/${deckId}`)
        
    }
    
    return (

        <>
          <ul className="breadcrumb">
                <li style={{paddingRight:"10px"}}><a href="/" >Home </a></li>
                <li>/</li>
                <li style={{paddingRight:"10px", paddingLeft:"10px"}}><a href="/decks/:deckId">Deck {deck.name} </a></li>
                <li>/</li>
                <li style={{paddingRight:"10px", paddingLeft:"10px"}}>Edit Card {cardId}</li>
            </ul>
          <h1>Edit Card</h1>

            <CardComponent
                front={cardFront} 
                back={cardBack} 
                deck={deck}
                setFront={setCardFront} 
                setBack={setCardBack} 
                handleSubmit={editCardSubmitHandler}
                handleChange = {editCardChangeHandler}
                />
        </>
    )
}

export default EditCard;