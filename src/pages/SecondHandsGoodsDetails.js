import axios from "axios";
import EditSecondHandGoods from "../components/EditSecondHandGoods"
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import SecondHandGoodsDetailsPart from "../components/SecondHandGoodsDetailsPart";
import backButton from "../images/left-arrow0.png"
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
                <button onClick={() => setShowUpdateObjectForm(false)} style={{position:'absolute', top:'8vh',left:'7vw', fontSize:'1.5em',textDecoration: 'none',color:"black", border:'0',background:'#c2e59c'}}>Back<img src={backButton} alt="back" style={{width:'2em'}}/></button> :
                <Button id="editButton" onClick={() => setShowUpdateObjectForm(true)}>Edit the Object</Button>}
            {showUpdateObjectForm ? <EditSecondHandGoods getObject={getObject} showUpdateObjectForm={showUpdateObjectForm} />
                : <SecondHandGoodsDetailsPart object={object} />}
        </div>               
    )
}