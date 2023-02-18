import React, { useState, useEffect} from "react";
import { readDeck, updateCard } from "../utils/api";
import { useParams, useHistory } from "react-router-dom";

function EditCard() {
    const history = useHistory();

    const deckIdentifier = Number.parseInt(useParams().deckId);
    const cardIdentifier = Number.parseInt(useParams().cardId);
    
    const [readCard, setReadCard]= useState()
    const [cardFront, setCardFront] = useState("");
    const [cardBack, setCardBack] = useState("");
    const [deck, setDeck] = useState("");

    useEffect(() => {
        async function getDeck() {
            try {
                const response = await readDeck(deckIdentifier)
                const card = response.cards[cardIdentifier];
                setReadCard(card);
                setCardFront(card.front);
                setCardBack(card.back);
            } catch(error) {
                throw error
            }
        }
        getDeck();
    }, [deckIdentifier]);

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
            ...readCard,
                front: cardFront,
                back: cardBack,
            })
        history.push(`/decks/${deckIdentifier}`)
        
    }

    return (
        <>
          <ul className="breadcrumb">
                <li style={{paddingRight:"10px"}}><a href="/" >Home </a></li>
                <li>/</li>
                <li style={{paddingRight:"10px", paddingLeft:"10px"}}><a href="#">Deck {deck.name} </a></li>
                <li>/</li>
                <li style={{paddingRight:"10px", paddingLeft:"10px"}}>Edit Card {cardIdentifier+1}</li>
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
              <button style={{borderRadius: "10px"}} type="submit">Submit</button>
            </form>
        </>
    )
}

export default EditCard;