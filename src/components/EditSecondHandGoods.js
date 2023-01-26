import axios from 'axios';
import { useEffect, useState } from 'react';

import { useNavigate, useParams } from "react-router-dom";
import service from '../api/service';

export default function EditSecondHandGoods() {
    const { secondHandGoodId } = useParams();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [price, setPrice] = useState("");
    const [contact, setContact] = useState("");
    const [category, setCategory] = useState("");

    const navigate = useNavigate();

    //get the original data
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/secondHandGoods/${secondHandGoodId}`)
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
    }, [{secondHandGoodId}])

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
        const requestBody = { name, price, description, contact, category, imageUrl };
        
        axios
            .put(`${process.env.REACT_APP_API_URL}/api/secondHandGoods/edit/${secondHandGoodId}`, requestBody)
            .then(() => {
                console.log("updated")
                navigate(`/secondHandGoods`)
            });
    };
    

    return (
        <div>
            <form onSubmit={handleSubmit}>

               
                    <label>Name</label>
                    <input
                        type="string"                       
                        name="name"
                        value={name}
                        onChange={(event) => { setName(event.target.value) }}
                    />
              

              
                    <label>Description</label>
                    <textarea
                        rows={4}
                        name="description"                       
                        value={description}
                        onChange={(event) => { setDescription(event.target.value) }}
                    />
              
               
                    <label>Pictures</label>
                    <input type="file"                       
                        name="imageUrl"
                        onChange={(e) => handleFileUpload(e)}
                    />
                   
               
                    <label>Price</label>
                    <input
                        type="number"                        
                        name="price"                        
                        value={price}
                        onChange={(event) => { setPrice(event.target.value) }}
                    />
               
               
                    <select aria-label="Default select example"                       
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
                    </select>
              
               
                    <label>Contact</label>
                    <input
                        type="string"                       
                        name="contact"                        
                        value={contact}
                        onChange={(event) => { setContact(event.target.value) }}
                    />
              
                <button type="submit">Update</button>
            </form>
        </div>
    )
}