import axios from 'axios';
import { useContext, useState } from 'react';
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { useNavigate } from "react-router-dom";
import service from '../api/service';
import { AuthContext } from '../context/auth.context';
export default function AddDiscovery(props) {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState(""); 
    const {user} = useContext(AuthContext);    
    const [authorId,setAuthorId] = useState(user._id)  
    //to solve create failed:when create sth, the user does not wait the image completly uploaded already click creat 
    const [isUploadingImage, setIsUploadingImage] = useState(false);

    const createNewThing = (newThing) => {
        const storedToken = localStorage.getItem('authToken');
        console.log(newThing) 
        axios
            .post(`${process.env.REACT_APP_API_URL}/api/discoveries`, newThing, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(() => {               
                props.getDiscoveriesFromAPI()
            })
            .then(() => console.log('Updating...'))
            .catch((e) => {
                console.log("error in creating new discovery from API", e)
            })
    }
    
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
            .finally(() => {
                setIsUploadingImage(false);
            });
      };
     
      
      const handleSubmit = (e) => {
        e.preventDefault();       
        const newThing = {
            "title": title,
            "imageUrl": imageUrl,            
            "description": description,
            "author":authorId                  
        }
       
        createNewThing(newThing);

        setDescription("")
        setTitle("")
        setImageUrl("")
        
        navigate("/discoveries")
        props.setShowAddDiscoveryForm(false)
    }

    return (
        <div id="addDiscBg">
        <div className='m-5' id="addDisc" style={{width:'45vw'}}>
            <h3 className='mb-5 pb-5'>YOU CAN HERE TELL US WHAT YOU WANNA SHARE</h3>
            <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>TITLE</Form.Label>
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
                    <Form.Label>DESCRIPTION</Form.Label>
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
                    <Form.Label>PICTURE</Form.Label>
                    <Form.Control type="file"
                        placeholder="please upload pictures"                       
                        onChange={(e) => handleFileUpload(e)}                        
                    />
                </Form.Group> 
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2" hidden>                    
                    <Form.Control
                        type="string"                       
                        name="author"                        
                        value={authorId} 
                        onChange={(event) => {setAuthorId(event.target.value)}}                                         
                    />
                </Form.Group>
                
                    {isUploadingImage
                        ? <Button type="submit" disabled>Uploading...</Button>
                        : <Button className='mt-3' style={{ position: 'absolute', top: '38em', left: '18vw', width: '5em' }} variant="primary" type="submit">Create</Button>
                    }
            </Form>
        </div>
        </div>
    )
}