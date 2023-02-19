import React, { useState, useEffect} from "react";
import { readDeck, updateCard, readCard } from "../utils/api";
import { useParams, useHistory } from "react-router-dom";

function EditCard() {
    const history = useHistory();
  
    const { deckId, cardId } = useParams()

//     const deckIdentifier = Number.parseInt(useParams().deckId);
//     const cardIdentifier = Number.parseInt(useParams().cardId);
  
    const [cardCard, setCard]= useState({})
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
              setCardFront(cardResponse.front);
              console.log(cardFront)
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
        if (event.target.name === "card-front") {
            setCardFront(event.target.value)
        } else {
            setCardBack(event.target.value)
        }
    }

    const editCardSubmitHandler = (event) => {
        event.preventDefault();
        updateCard({
            ...card,
                front: 
          Front,
                back: cardBack,
            })
        history.push(`/decks/${deckId}`)
        
    }

    return (
        <>
          <ul className="breadcrumb">
                <li style={{paddingRight:"10px"}}><a href="/" >Home </a></li>
                <li>/</li>
                <li style={{paddingRight:"10px", paddingLeft:"10px"}}><a href="#">Deck {deck.name} </a></li>
                <li>/</li>
                <li style={{paddingRight:"10px", paddingLeft:"10px"}}>Edit Card {cardId}</li>
            </ul>
          <h1>Edit Card</h1>
            <form onSubmit={editCardSubmitHandler}>
              <label style={{paddingTop: "20px"}}>Front</label>
              <textarea style={{width:"100%"}}
                name="card-front"
                id="card-front"
                value={cardFront}
                type="text"
                rows="3"
                onChange={editCardChangeHandler}
              />
              <label style={{paddingTop: "20px"}}>Back</label>
              <textarea style={{width:"100%"}}
                name="card-back"
                id="card-back"
                value={cardBack}
                type="text"
                rows="3"
                onChange={editCardChangeHandler}
              />
              <button style={{marginTop: "20px", marginRight: "10px", borderRadius: "10px"}} onClick={() => history.push(`/decks/${deckIdentifier}`)}>Cancel</button>
              <button style={{borderRadius: "10px"}} type="submit" >Submit</button>
            </form>
        </>
    )
}

export default EditCard;