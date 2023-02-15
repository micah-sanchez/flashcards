import React, {useState} from "react";
import { createDeck } from "../utils/api";
import {useHistory} from "react-router-dom";


function CreateDeck() {
    const history = useHistory();

    const initialFormData = {
        name: "",
        description: ""
    } 
    const [formData, setFormData] = useState({})

    const handleChange = ({target}) => {
        setFormData({
            ...formData,
            [target.name]: target.value
        });
        console.log(formData)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("submitted!");
        createDeck(formData);
        setFormData(initialFormData);

    }

    return (
        <>
            <h1>Create Deck</h1>
            <form onSubmit={handleSubmit}>
                <label style={{width:'100%'}}>Name</label>
                <input style={{width:'100%'}}
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Deck Name"
                    onChange={handleChange}
                    value={formData.name}
                />
                <p></p>
                <label style={{width:'100%'}}>Description</label>
                <textarea style={{width:'100%'}}
                    type="text"
                    rows="4"
                    id="description"
                    name="description"
                    placeholder="Brief description of the deck"
                    onChange={handleChange}
                    value={formData.description}
                />
                 <button onClick={() => history.push("/")}>Cancel</button>
                 <button type="submit" onClick={() => history.push("/decks")}>Submit</button>
            </form>
           
        </>
    )
}

export default CreateDeck;