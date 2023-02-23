import React, { useEffect, useState} from "react";
import {useParams, useHistory} from "react-router-dom";
import { readDeck, deleteCard } from "../utils/api";


function ViewDeck({handleDelete}) {
    const deckId = Number.parseInt(useParams().deckId);
    
    const [deck, setDeck] = useState();
    const [cards, setCards] = useState();

    const history = useHistory();

    useEffect(() => {
        async function retrieveDeck() {
            try {
                const deckData = await readDeck(deckId);
                setDeck(deckData);
                setCards(deckData.cards)
                console.log(deckId)
            } catch(error) {
                if (error.name === "AbortError") {
                    console.log("AbortError");
                } else {
                    throw error
                }
            }
        }
        retrieveDeck();
    }, [deckId]);

    

    const handleCardDelete = (id, arrayIndex) => {
        console.log(cards)
        if (window.confirm("Delete this deck?\n\nYou will not be able to recover it.")) {
            deleteCard(id);
            cards.splice(arrayIndex, 1);
            setCards((prev) => [...cards]);
            history.push("/");
        }
      };

    let cardList;
        if (cards) {
        cardList = cards.map((indivCard, index) => {
            const editClickHandler = (index) => {
                history.push(`/decks/${deckId}/cards/${indivCard.id}/edit`);
            }
            return(
            <table key={indivCard.id} style={{border:"solid", borderRadius:"3px", borderColor:"lightgray", margin:"10px", width:"100%"}}>
                <tbody>
                    <tr>
                        <td style={{width:"50%", heigth: "100%"}}>{indivCard.front}</td>
                        <td style={{width:"50%", heigth: "100%"}}>{indivCard.back}</td>
                    </tr>
                    <tr>
                        <td>
                            <button key={index} style={{margin: "10px", marginRight: "10px", borderRadius: "10px"}} onClick={() => editClickHandler(indivCard.id)}>Edit</button>
                            <button style={{borderRadius: "10px"}} onClick={() => handleCardDelete(indivCard.id, index)}>Trash</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    })
    } else {
        return "loading..."
    }     

    return (
        <>
        <ul className="breadcrumb">
            <li style={{paddingRight:"10px"}}><a href="/" >Home </a></li>
            <li>/</li>
            <li style={{paddingRight:"10px", paddingLeft:"10px"}}><a href="#">{deck.name}</a></li>
            
        </ul>
        <h4>{deck.name}</h4>
        <h6>{deck.description}</h6>
        <button style={{marginTop: "20px", marginRight: "10px", borderRadius: "10px"}} onClick={() => history.push(`/decks/${deck.id}/edit`)}>Edit</button>
        <button style={{marginRight: "10px", borderRadius: "10px"}} onClick={() => history.push(`/decks/${deck.id}/study`)}>Study</button>
        <button style={{marginRight: "10px", borderRadius: "10px"}} onClick={() => history.push(`/decks/${deck.id}/cards/new`)}>Add Cards</button>
        <button style={{marginRight: "10px", borderRadius: "10px"}} onClick={handleDelete}>Trash</button> 
        <p></p>
        <h2>Cards</h2>
        <div>{cardList}</div>
        </>
        
    )
}

export default ViewDeck;