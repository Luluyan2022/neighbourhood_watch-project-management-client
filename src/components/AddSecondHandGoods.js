import axios from 'axios';
import { useContext, useState } from 'react';
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { useNavigate } from "react-router-dom";
import service from '../api/service';
import { AuthContext } from '../context/auth.context';
export default function AddSecondHandGoods(props) {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setimageUrl] = useState("");
    const [price, setPrice] = useState("");
    const [contact, setContact] = useState("");
    const [category, setCategory] = useState("");

    const { user } = useContext(AuthContext);
    const [authorId, setAuthorId] = useState(user._id)

    const [isUploadingImage, setIsUploadingImage] = useState(false);

    const createNewSecondHandObj = (newSecondHandObj) => {
        console.log(newSecondHandObj);
        const storedToken = localStorage.getItem('authToken');
        axios
            .post(`${process.env.REACT_APP_API_URL}/api/secondHandGoods`, newSecondHandObj, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(() => {
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

        setIsUploadingImage(true);

        service
            .uploadImage(uploadData)
            .then(response => {
                setimageUrl(response.fileUrl);
            })
            .catch(err => console.log("Error while uploading the file: ", err))
            .finally(() => {
                setIsUploadingImage(false);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newSecondHandObj = {
            "name": name,
            "imageUrl": imageUrl,
            "price": price,
            "description": description,
            "contact": contact,
            "category": category,
            "author": authorId
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

    const divStyle = {
        width: '100vw',
        background: 'linear-gradient(to right, #6190e8, #a7bfe8)',
        minHeight: '92vh'
    }
    const divTwoStyle = {
        padding: '5em 7em 9em',
        position: 'absolute',
        left: '27%',
        backgroundColor: 'rgba(239, 245, 250, 0.7)',
        margin: '5em 3em',
        width: '45vw',
        height:'78vh'
    }

    return (
        <div style={divStyle}>
        <div className="m-5 pt-5" style={divTwoStyle}>
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

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
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

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
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

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
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

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput5" hidden>
                    <Form.Control
                        type="string"
                        name="author"
                        value={authorId}
                        onChange={(event) => { setAuthorId(event.target.value) }}
                    />
                </Form.Group>

                {isUploadingImage
                    ? <Button type="submit" disabled>Uploading...</Button>
                    : <Button
                        variant="primary"
                        type="submit">
                        Create
                    </Button>
                }
            </Form>
        </div>
        </div>
    )
}