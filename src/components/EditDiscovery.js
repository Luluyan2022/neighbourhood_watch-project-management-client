import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import service from '../api/service';

export default function EditDiscovery(props) {
    const { discoveryId } = useParams();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const navigate = useNavigate();

    //get the original data
    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        axios.get(`${process.env.REACT_APP_API_URL}/api/discoveries/${discoveryId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(res => {
                const oneDiscovery = res.data;
                setTitle(oneDiscovery.title);
                setDescription(oneDiscovery.description);
            })
            .catch((error) => console.log(error));
        // eslint-disable-next-line
    }, [discoveryId])

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


    //UPDATE the data
    const handleSubmit = (e) => {
        e.preventDefault();
        const requestBody = { title, description, imageUrl };
        const storedToken = localStorage.getItem('authToken');
        axios
            .put(`${process.env.REACT_APP_API_URL}/api/discoveries/edit/${discoveryId}`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(() => {
                console.log("updated")
                props.getDiscovery();
                navigate(`/discoveries/${discoveryId}`)
                props.setShowUpdateDiscoveryForm(false)
            });
    };

    const divStyle = {
        width: '45vw',
        padding: '5em 7em 9em',
        position: 'absolute',
        left: '27%',
        backgroundColor: 'rgba(239, 245, 250, 0.7)',
        margin: '5em 3em'
    }
    const updateButton = {
        marginTop: '1em'
    }
    return (
        <div style={divStyle}>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>TITLE</Form.Label>
                    <Form.Control
                        type="string"
                        name="title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>DESCRIPTION</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={4}
                        name="description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formFileMultiple" className="mb-3">
                    <Form.Label>PICTURE</Form.Label>
                    <Form.Control type="file"
                        name="imageUrl"
                        onChange={(e) => handleFileUpload(e)}
                    />
                </Form.Group>
                <Button type="submit" style={updateButton}>Update</Button>
            </Form>
        </div>
    )
}