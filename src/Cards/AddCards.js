import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";


function AddCards({decks}) {
    const deckId = Number.parseInt(useParams().deckId);
    const [deck, setDeck] = useState({});

    const history = useHistory();

    const initialCardData = {
        front: "",
        back: "",
        id: "",
        deckId: deckId,
    }

    const [cardData, setCardData] = useState({initialCardData});

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
        setCardData({
            ...cardData,
            [target.name]: target.value
        })
        console.log(cardData)
    }
    
    console.log(deckId)
    const addCardSubmitHandler = (event) => {
        event.preventDefault();
        console.log("clicked")
        createCard(deckId);
        setCardData(initialCardData);
    }

    return (
        <>
        <ul class="breadcrumb">
            <li style={{paddingRight:"10px"}}><a href="/" >Home </a></li>
            <li>/</li>
            <li style={{paddingRight:"10px", paddingLeft:"10px"}}><a href="#">{deck.name}</a></li>
            <li>/</li>
            <li style={{paddingRight:"10px", paddingLeft:"10px"}}>Add Card</li>
        </ul>
        <h2>{deck.name}: Add Card</h2>
        
        <form onSubmit={addCardSubmitHandler}>
            <label><h5>Front</h5></label>
            <textarea style={{width:'100%'}}
                    type="text"
                    id="front"
                    name="front"
                    placeholder="Front Side of Card"
                    rows="3"
                    onChange={cardChangeHandler}
                    value={cardData.front}
                />
            <label style={{paddingTop: "20px"}}><h5>Back</h5></label>
            <textarea style={{width:'100%'}}
                    type="text"
                    id="back"
                    name="back"
                    placeholder="Back Side of Card"
                    rows="3"
                    onChange={cardChangeHandler}
                    value={cardData.back}
                />
                  <button style={{marginTop: "20px", marginRight: "10px", borderRadius: "10px"}} onClick={() => history.push(`/decks/${deckId}`)}>Done</button>
                  <button style={{borderRadius: "10px"}}type="submit">Submit</button>
        </form>  
        </>
    )
}

export default AddCards;