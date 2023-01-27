import axios from 'axios';
import { useState } from 'react';
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { useNavigate } from "react-router-dom";
import service from '../api/service';
export default function AddSecondHandGoods(props) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setimageUrl] = useState("");
    const [price, setPrice] = useState("");
    const [contact, setContact] = useState("");
    const [category, setCategory] = useState("");
    const navigate = useNavigate();

    const createNewSecondHandObj = (newSecondHandObj) => {
        const storedToken = localStorage.getItem('authToken');
        axios
            .post(`${process.env.REACT_APP_API_URL}/api/secondHandGoods`, newSecondHandObj, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(() => {
                console.log(newSecondHandObj);
                props.getSGInfoFromAPI()
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
            setimageUrl(response.fileUrl);
          })
          .catch(err => console.log("Error while uploading the file: ", err));
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newSecondHandObj = {
            "name": name,
            "imageUrl": imageUrl,
            "price": price,
            "description": description,
            "contact": contact,
            "category": category
        }

        createNewSecondHandObj(newSecondHandObj);
        setName("")
        setDescription("")
        setimageUrl("")
        setPrice("")
        setContact("")
        setCategory("")
        navigate("/secondHandGoods")
        props.setShowAddObjectForm(false)
    }


    return (
        <div>
            <h3>You can here tell us what you wanna sell</h3>
            <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="string"
                        placeholder="The name of the object"
                        name="name"
                        required={true}
                        value={name}
                        onChange={(event) => { setName(event.target.value) }}
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
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="The price of the object"
                        name="price"
                        required={true}
                        value={price}
                        onChange={(event) => { setPrice(event.target.value) }}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Select aria-label="Default select example"
                        required={true}
                        value={category}
                        onChange={(event) => { setCategory(event.target.value) }}>
                        <option>Category:</option>
                        <option value="Autos">Autos</option>
                        <option value="Bicycles">Bicycles</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Pets">Pets</option>
                        <option value="Fashion & Beauty">Fashion & Beauty</option>
                        <option value="Family, Child & Baby">Family, Child & Baby</option>
                        <option value="Others">Others</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Contact</Form.Label>
                    <Form.Control
                        type="string"
                        placeholder="Who you can contact with"
                        name="contact"
                        required={true}
                        value={contact}
                        onChange={(event) => { setContact(event.target.value) }}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Create</Button>
            </Form>
        </div>
    )
}