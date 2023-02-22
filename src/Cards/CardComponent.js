import React from "react";
import {useHistory} from "react-router-dom";

function CardComponent({front, back, deck, handleSubmit, handleChange}) {
    const history = useHistory();

    return (
        <>
        <form onSubmit={handleSubmit}>
            <label><h5>Front</h5></label>
            <textarea style={{width:'100%'}}
                    type="text"
                    id="card-front"
                    name="card-front"
                    placeholder="Front Side of Card"
                    rows="3"
                    onChange={handleChange}
                    value={front}
                />
            <label style={{paddingTop: "20px"}}><h5>Back</h5></label>
            <textarea style={{width:'100%'}}
                    type="text"
                    id="back"
                    name="back"
                    placeholder="Back Side of Card"
                    rows="3"
                    onChange={handleChange}
                    value={back}
                />
                  <button style={{marginTop: "20px", marginRight: "10px", borderRadius: "10px"}} onClick={() => history.push(`/decks/${deck.id}`)}>Done</button>
                  <button style={{borderRadius: "10px"}}type="submit">Submit</button>
        </form>  
        </>
    )
}

export default CardComponent;