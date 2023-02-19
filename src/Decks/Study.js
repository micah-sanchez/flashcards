import React, { useState, useEffect } from "react";
import { Route, useParams, useHistory } from "react-router-dom";
import NotFound from "../Layout/NotFound";
import { readDeck } from "../utils/api";
import AddCards from "../Cards/AddCards";

function Study({decks}) {

    const history = useHistory();

    // const [frontSide, setFrontSide] = useState(true);
    // const [index, setIndex] = useState(0);
    // const [deck, setDeck] = useState({});
    // const [cards, setCards] = useState([]);

    // const params = useParams();
    // const deckIdNumber = params.deckId;
    
    // useEffect(() => {
    //     async function getDeck() {
    //         try {
    //             const response = await readDeck(deckIdNumber);
    //             setDeck(response);
    //             setCards(response.cards)
    //         } catch(error) {
    //             throw error
    //         }
    //     }
    //     getDeck();
    // }, []);
  
    //const found = decks.find((deck) => deck.id === param);
    // const deckName = deck.name;
    // const foundLength = cards.length;
    // const front = cards[index].front;
    // const back = cards[index].back;

    const [foundDeck, setFoundDeck] = useState();
    const [frontSide, setFrontSide] = useState(true);
    const [index, setIndex] = useState(0);
    const [cards, setCards] = useState([]);


    const param = Number.parseInt(useParams().deckId)
    const deckIdNumber = Number.parseInt(param)
    
    useEffect(() => {
        async function getDeck() {
            try {
                const response = await readDeck(deckIdNumber);
                setFoundDeck(response)
                setCards(response.cards)
                //console.log("found", foundDeck)
            } catch(error) {
                throw error
            }
        }
        getDeck();
    }, [deckIdNumber]);
    
    const found = decks.find((deck) => deck.id === param);
    const deckName = found.name;
    const foundLength = found.cards.length;
    const front = found.cards[index].front;
    const back = found.cards[index].back

    const flipHandler = (event) => {
        if (frontSide) {
            setFrontSide(!frontSide);
        } else {
            setFrontSide(!frontSide);
        }
    }

    const nextHandler = (event) => {
        if (index + 1 !== foundLength) {
          console.log("index", index)
          setFrontSide(!frontSide)
          setIndex(index + 1)
        } else {
            if (window.confirm("Restart cards?\n\nClick 'Cancel' to return to the home page.")) {
                setFrontSide(!frontSide)
                setIndex(0)
            } else {
                window.open("/")
            }
        }
    }

    if (foundLength < 3) {
        return (
        <>
            <ul className="breadcrumb">
                <li style={{paddingRight:"10px"}}><a href="/" >Home </a></li>
                <li>/</li>
                <li style={{paddingRight:"10px", paddingLeft:"10px"}}><a href="#">{deckName}</a></li>
                <li>/</li>
                <li style={{paddingRight:"10px", paddingLeft:"10px"}}>Study</li>
            </ul>
            <h1>Study: {deckName}</h1>
            <h2>Not enough cards.</h2>
            <p>You need at least 3 cards to study. There are {foundLength} cards in this deck.</p>
            <button style={{borderRadius: "10px"}} onClick={()=>{history.push(`/decks/${deckIdNumber}/cards/new`)}}>Add Cards</button>
        </>
        )
    }

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
                <ul className="breadcrumb">
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
                    <button style={{marginLeft:"10px", borderRadius: "10px"}} onClick={nextHandler}>Next</button>
                </div>
                
                </>
        )
    } 
}

export default Study;