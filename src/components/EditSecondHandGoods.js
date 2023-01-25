import axios from 'axios';
import { useState } from 'react';
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { useNavigate, useParams } from "react-router-dom";

export default function EditSecondHandGoods(props) {
    const { secondHandGoodId } = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState("");
    const [contact, setContact] = useState("");
    const [category, setCategory] = useState("");
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        const requestBody = { name, image, price, description, contact, category };

        axios
            .put(`${process.env.REACT_APP_API_URL}/api/secondHandGoods/${secondHandGoodId}`, requestBody)
            .then(() => {
                navigate(`/secondHandGoods`)
            });
    };


    return (
        <div>
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
                        name="image"
                        required={true}
                        value={image}
                        onChange={(event) => { setImage(event.target.value) }}
                        multiple
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
                <Button variant="primary" type="submit">Update</Button>
            </Form>
        </div>
    )
}