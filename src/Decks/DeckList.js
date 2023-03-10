import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api";

function DeckList({ decks, setDecks }) {
  const history = useHistory();

  useEffect(() => {
    async function loadDecks() {
      try {
        const decksData = await listDecks();
        setDecks(decksData);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("AbortError");
        } else {
          throw error;
        }
      }
    }
    loadDecks();
  }, []);

  const deckComponents = decks.map((deck, index) => {
    const cardLength = deck.cards.length;
    return (
      <div key={deck.id} style={{ paddingTop: "20px" }}>
        <div style={{ border: "solid", borderRadius: "10px", padding: "10px" }}>
          <table>
            <thead>
              <tr style={{ width: "100%" }}>
                <td>
                  <h1>{deck.name}</h1>
                </td>
                <td>{cardLength} cards</td>
              </tr>
              <tr>
                <td>
                  <h4>{deck.description}</h4>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <button
                    style={{ marginRight: "10px", borderRadius: "10px" }}
                    onClick={(event) => {
                      history.push(`/decks/${deck.id}`);
                    }}
                  >
                    View
                  </button>
                  <button
                    style={{ marginRight: "10px", borderRadius: "10px" }}
                    onClick={(event) => history.push(`/decks/${deck.id}/study`)}
                  >
                    Study
                  </button>
                  <button
                    style={{ borderRadius: "10px" }}
                    onClick={() => {
                      handleDelete(deck.id, index);
                    }}
                  >
                    Trash
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  });

  const handleDelete = (id, arrayIndex) => {
    if (window.confirm("Delete this deck?")) {
      deleteDeck(id);
      decks.splice(arrayIndex, 1);
      setDecks((prev) => [...decks]);
      history.push("/");
    }
  };

  return deckComponents;
}

export default DeckList;
