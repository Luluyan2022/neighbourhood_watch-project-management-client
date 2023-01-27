import axios from "axios";
import EditSecondHandGoods from "../components/EditSecondHandGoods"
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";


export default function SecondHandsGoodsDetails() {
    const navigate = useNavigate();    
    const [showUpdateObjectForm, setShowUpdateObjectForm] = useState(false);
    const [object, setObject] = useState(null);
    const { secondHandGoodId } = useParams();
    const getObject = () => {
        const storedToken = localStorage.getItem("authToken");
        axios.get(`${process.env.REACT_APP_API_URL}/api/secondHandGoods/${secondHandGoodId}`, { headers: { Authorization: `Bearer ${storedToken}` }})
        .then((response) => {
          const oneObject = response.data;            
          setObject(oneObject);            
        })
        .catch((error) => console.log("error getting one object from API",error));
    };
    // eslint-disable-next-line
    useEffect(() => { getObject() }, []);
   
    const deleteObject = () => {
        const storedToken = localStorage.getItem("authToken");
        axios
            .delete(`${process.env.REACT_APP_API_URL}/api/secondHandGoods/${secondHandGoodId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(() => {
                navigate("/secondHandGoods");
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <div>
                {object &&
                    <div>
                        Name:{object.name}
                        Price: {object.price}
                        Category: {object.category}
                        Description:{object.description}
                        {!object.imageUrl
                            ? <img src="https://via.placeholder.com/1150" alt="no pictures here" />
                            : <img src={object.imageUrl} alt="object"/>
                           }
                    </div>
            
            }
            </div>


            <div>
                {showUpdateObjectForm ? <EditSecondHandGoods getObject={getObject} showUpdateObjectForm={showUpdateObjectForm}/> : null}
                {showUpdateObjectForm ?
                    <Button onClick={() => setShowUpdateObjectForm(false)}>Hide Form</Button> :
                    <Button onClick={() => setShowUpdateObjectForm(true)}>Edit the Object</Button>}
            </div>


            <Button onClick={deleteObject}>Delete Project</Button>
            <Link to="/secondHandGoods">Back</Link>
        </div>
                 
    )
}