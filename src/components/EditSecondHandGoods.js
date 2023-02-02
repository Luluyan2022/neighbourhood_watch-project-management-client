import axios from 'axios';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

import { useNavigate, useParams } from "react-router-dom";
import service from '../api/service';

const divStyle = {
    width: '45vw',
    padding: '5em 7em 9em',
    position: 'absolute',
    left: '27%',
    backgroundColor: 'rgba(239, 245, 250, 0.7)',
    margin: '1em 3em '
}
const buttonStyle = {
    border: "none",
    background: 'linear-gradient(to left,#64b3f4, #c2e59c )',
    padding: '0.5em 1em'
}

export default function EditSecondHandGoods(props) {
    const { secondHandGoodId } = useParams();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [price, setPrice] = useState("");
    const [contact, setContact] = useState("");
    const [category, setCategory] = useState("");
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const navigate = useNavigate();

    //get the original data
    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        axios.get(`${process.env.REACT_APP_API_URL}/api/secondHandGoods/${secondHandGoodId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(res => {
                const oneObject = res.data;
                setName(oneObject.name);
                setDescription(oneObject.description);

                setPrice(oneObject.price);
                setContact(oneObject.contact);
                setCategory(oneObject.category);

            })
            .catch((error) => console.log(error));
        // eslint-disable-next-line
    }, [secondHandGoodId])

    const handleFileUpload = (e) => {

        const uploadData = new FormData();

        uploadData.append("imageUrl", e.target.files[0]);

        setIsUploadingImage(true);

        service
            .uploadImage(uploadData)
            .then(response => {
                setImageUrl(response.fileUrl);
            })
            .catch(err => console.log("Error while uploading the file: ", err))
            .finally ( () => {
                setIsUploadingImage(false); 
              });
    };


    //UPDATE the data
    const handleSubmit = (e) => {
        e.preventDefault();
        const requestBody = { name, price, description, contact, category, imageUrl };
        const storedToken = localStorage.getItem("authToken");
        axios
            .put(`${process.env.REACT_APP_API_URL}/api/secondHandGoods/edit/${secondHandGoodId}`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(() => {
                console.log("updated")
                props.getObject();
                navigate(`/secondHandGoods/${secondHandGoodId}`)
                props.setShowUpdateObjectForm(false)
            });
    };    

    return (
        <div style={divStyle}>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">

                    <Form.Label>NAME</Form.Label>
                    <Form.Control
                        type="string"
                        name="name"
                        value={name}
                        onChange={(event) => { setName(event.target.value) }}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>DESCRIPTION</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        name="description"
                        value={description}
                        onChange={(event) => { setDescription(event.target.value) }}
                    />
                </Form.Group>

                <Form.Group controlId="formFileMultiple" className="mb-3">
                    <Form.Label>PICTURE</Form.Label>
                    <Form.Control type="file"
                        name="imageUrl"
                        onChange={(e) => handleFileUpload(e)}
                    />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">

                    <Form.Label>PRICE</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        value={price}
                        onChange={(event) => { setPrice(event.target.value) }}
                    />
                </Form.Group>

                <Form.Select aria-label="Default select example"
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

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                    <Form.Label>CONTACT</Form.Label>
                    <Form.Control
                        type="string"
                        name="contact"
                        value={contact}
                        onChange={(event) => { setContact(event.target.value) }}
                    />
                </Form.Group>
                {isUploadingImage
                    ? <button type="submit" disabled>Uploading...</button>
                    : <button type="submit" style={buttonStyle}>Update</button>
                }                
            </Form>
        </div>
    )
}