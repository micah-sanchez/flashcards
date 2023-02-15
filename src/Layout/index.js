import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import DeckList from "../Decks/DeckList";

// Router
  //Switch  
    //Route
    
      // Home = /
      	
      //Create Deck = /decks/new
      //Deck = /deckes/:deckId

        //Study = /decks/:deckId/study
        //Edit Deck = /decks/:deckId/edit	

        //Add Card = /decks/:deckId/cards/new	
        //Edit Card = /decks/:deckId/cards/:cardId/edit	

//Components to create
  //Home
  //Create Deck (form with Name and Description fields, Cancel and Submit buttons)
  //Cards List (shows all the cards in the deck), includes front and back, edit and delete
  //Deck Screen show exisiting deck description, render Cards Lists, displays Edit, Study, Add Cards, Delete Buttons
  //Delete Card
  //Add Card (form with Front and Back Fields, Done and Save buttons)

      
function Layout() {

  return (
    <>
      <Header />
      <div className="container">
        <Home />
      </div>
    </>
  );
}

export default Layout;
