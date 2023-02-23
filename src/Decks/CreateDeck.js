import React, {useState} from "react";
import { createDeck } from "../utils/api";
import {useHistory} from "react-router-dom";


function CreateDeck() {
    const history = useHistory();

    const initialFormData = {
        name: "",
        description: ""
    } 
    const [formData, setFormData] = useState(initialFormData);

    const handleChange = ({target}) => {
        setFormData({
            ...formData,
            [target.name]: target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        createDeck(formData);
        setFormData(initialFormData);
    }

    return (
        <>

        <ul className="breadcrumb">
            <li style={{paddingRight:"10px"}}><a href="/" >Home </a></li>
            <li>/</li>
            <li style={{paddingRight:"10px", paddingLeft:"10px"}}>Create Deck</li>
        </ul>
            
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
                 <button type="submit" >Submit</button>
            </form>
           
        </>
    )
}

export default CreateDeck;