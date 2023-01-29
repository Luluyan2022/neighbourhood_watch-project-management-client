import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import SecondHandGoodsListsPart from "../components/SecondHandGoodsListsPart";
import AddSecondHandGoods from "../components/AddSecondHandGoods";

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
    useEffect(() =>getSecondHandGoodsInfoFromAPI,[]); 

    

    return (
        <div>
            <div>
                {showAddObjectForm ? <AddSecondHandGoods getSGInfoFromAPI={getSecondHandGoodsInfoFromAPI} setShowAddObjectForm={setShowAddObjectForm}/> 
                 : <SecondHandGoodsListsPart secondHandGoods={secondHandGoods}/>}
                {showAddObjectForm ?
                    <Button onClick={() => setShowAddObjectForm(false)}>Back</Button> :
                    <Button onClick={() => setShowAddObjectForm(true)}>Add new Object</Button>}
            </div>           

            
        </div>
    )
}