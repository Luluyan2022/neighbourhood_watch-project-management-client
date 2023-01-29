import axios from "axios";
import EditSecondHandGoods from "../components/EditSecondHandGoods"
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import SecondHandGoodsDetailsPart from "../components/SecondHandGoodsDetailsPart";

export default function SecondHandsGoodsDetails() {
   
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
   
    

    return (      
            
        <div id="secondHand">
            {showUpdateObjectForm ?
                <Button onClick={() => setShowUpdateObjectForm(false)}>Back</Button> :
                <Button id="editButton" onClick={() => setShowUpdateObjectForm(true)}>Edit the Object</Button>}
            {showUpdateObjectForm ? <EditSecondHandGoods getObject={getObject} showUpdateObjectForm={showUpdateObjectForm} />
                : <SecondHandGoodsDetailsPart object={object} />}
        </div>               
    )
}