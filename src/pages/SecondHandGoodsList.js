import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import SecondHandGoodsListsPart from "../components/SecondHandGoodsListsPart";
import AddSecondHandGoods from "../components/AddSecondHandGoods";
import backButton from "../images/left-arrow0.png"
export default function SecondHandGoodsLists() {
    const [secondHandGoods, setSecondHandGoods] = useState([]);
    const [showAddObjectForm, setShowAddObjectForm] = useState(false);
    
    const getSecondHandGoodsInfoFromAPI = () => {
        const storedToken = localStorage.getItem("authToken");

        axios.get(`${process.env.REACT_APP_API_URL}/api/secondHandGoods`, { headers: { Authorization: `Bearer ${storedToken}` }})
             .then(res => setSecondHandGoods(res.data))
             .catch((e) => {
                console.log("error in getting the secondHandGoodsInfo from API", e)
            })
    }  
    useEffect(() =>getSecondHandGoodsInfoFromAPI(),[]); 

    

    return (
        <div>
            <div>
                {showAddObjectForm 
                  ? <AddSecondHandGoods getSGInfoFromAPI={getSecondHandGoodsInfoFromAPI} setShowAddObjectForm={setShowAddObjectForm}/> 
                  : <SecondHandGoodsListsPart secondHandGoods={secondHandGoods}/>}
                {showAddObjectForm 
                  ? <button onClick={() => setShowAddObjectForm(false)} style={{position:'absolute', top:'8vh',left:'7vw', fontSize:'1.5em',textDecoration: 'none',color:"black", border:'0'}}>Back<img src={backButton} alt="back" style={{width:'2em'}}/></button> 
                  : <Button onClick={() => setShowAddObjectForm(true)}>Add new Object</Button>}
            </div>           

            
        </div>
    )
}