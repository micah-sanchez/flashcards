import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../utils/api";

function Study({decks}, {flipButton}) {

    const [frontSide, setFrontSide] = useState(true);

    const param = Number.parseInt(useParams().deckId)
    const deckIdNumber = Number.parseInt(param)

    const found = decks.find((deck) => deck.id === param);
    const deckName = found.name;
    const deckId = found.id;
    const cards = found.cards;
    const foundLength = found.cards.length;
    let index = 0;
    const front = found.cards[index].front;
    const back = found.cards[index].back
    
    useEffect(() => {
        async function getDeck() {
            try {
                const response = await readDeck(deckIdNumber);
                //setStudyDeck(response)
            } catch(error) {
                throw error
            }
        }
        getDeck();
    }, []);

    const flipHandler = (event) => {
        if (frontSide) {
            setFrontSide(!frontSide);
        } else {
            setFrontSide(!frontSide);
            index += 1;
        }
        console.log("flipped 2.0!", index,)
    }
    console.log(frontSide, index)

    if (frontSide) {
        return (
            <>
            <ul class="breadcrumb">
                <li style={{paddingRight:"10px"}}><a href="/" >Home </a></li>
                <li>/</li>
                <li style={{paddingRight:"10px", paddingLeft:"10px"}}><a href="#">{deckName}</a></li>
                <li>/</li>
                <li style={{paddingRight:"10px", paddingLeft:"10px"}}>Study</li>
            </ul>
            <h1>Study: {deckName}</h1>
            <div style={{padding:"10px", border:"solid", borderColor:"lightgray", borderRadius:"10px"}}>
            <h4>Card {index+1} of {foundLength}</h4>
                <p>{front}</p>
                <button style={{borderRadius: "10px"}} onClick={flipHandler}>Flip</button>
            </div>
            
            </>
        )
    } else {
        return (
            <>
                <ul class="breadcrumb">
                    <li style={{paddingRight:"10px"}}><a href="/" >Home </a></li>
                    <li>/</li>
                    <li style={{paddingRight:"10px", paddingLeft:"10px"}}><a href="#">{deckName}</a></li>
                    <li>/</li>
                    <li style={{paddingRight:"10px", paddingLeft:"10px"}}>Study</li>
                </ul>
                <h1>Study: {deckName}</h1>
                <div style={{padding:"10px", border:"solid", borderColor:"lightgray", borderRadius:"10px"}}>
                <h4>Card {index+1} of {foundLength}</h4>
                    <p>{back}</p>
                    <button style={{borderRadius: "10px"}} onClick={flipHandler}>Flip</button>
                    <button style={{marginLeft:"10px", borderRadius: "10px"}} onClick={flipHandler}>Next</button>
                </div>
                
                </>
        )
    } 
}

export default Study;