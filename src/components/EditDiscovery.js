import axios from 'axios';
import { useEffect, useState } from 'react';
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


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                    type="string"
                    name="title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value) }
                /> <br />
                <label>Description</label>
                <textarea
                    rows={4}
                    name="description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value) }
                /> <br />
                <label>Pictures</label>
                <input type="file"
                    name="imageUrl"
                    onChange={(e) => handleFileUpload(e)}
                /> <br />
                <button type="submit">Update</button>
            </form>
        </div>
    )
}