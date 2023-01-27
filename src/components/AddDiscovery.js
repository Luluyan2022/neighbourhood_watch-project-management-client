import axios from 'axios';
import { useState } from 'react';
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { useNavigate } from "react-router-dom";
import service from '../api/service';
export default function AddDiscovery(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const navigate = useNavigate();
    
      const createNewThing = (newThing) => {
        const storedToken = localStorage.getItem('authToken');
        axios
            .post(`${process.env.REACT_APP_API_URL}/api/discoveries`, newThing, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(() => {               
                props.getDiscoveriesFromAPI()
            })
            .then(() => console.log('Updating...'))
            .catch((e) => {
                console.log("error in creating the secondHandGood from API", e)
            })
    }

    const handleFileUpload = (e) => {        
     
        const uploadData = new FormData();    
       
        uploadData.append("imageUrl", e.target.files[0]);
     
        service
          .uploadImage(uploadData)
          .then(response => {            
            setImageUrl(response.fileUrl);
          })
          .catch(err => console.log("Error while uploading the file: ", err));
      };
     

      const handleSubmit = (e) => {
        e.preventDefault();
        const newThing = {
            "title": title,
            "imageUrl": imageUrl,            
            "description": description            
        }

        createNewThing(newThing);

        setDescription("")
        setTitle("")
        setImageUrl("")
        navigate("/discoveries")
        props.setShowAddObjectForm(false)
    }

    return (
        <div>
            <h3>You can here tell us what you wanna share</h3>
            <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="string"
                        placeholder="what new things you wanna tell us"
                        name="title"
                        required={true}
                        value={title}
                        onChange={(event) => { setTitle(event.target.value) }}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        name="description"
                        required={true}
                        value={description}
                        onChange={(event) => { setDescription(event.target.value) }}
                    />
                </Form.Group>
                <Form.Group controlId="formFileMultiple" className="mb-3">
                    <Form.Label>Pictures</Form.Label>
                    <Form.Control type="file"
                        placeholder="please upload pictures"                       
                        onChange={(e) => handleFileUpload(e)}                        
                    />
                </Form.Group>               
                <Button variant="primary" type="submit">Create</Button>
            </Form>
        </div>
    )
}