import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

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
                {showAddObjectForm ? <AddSecondHandGoods getSGInfoFromAPI={getSecondHandGoodsInfoFromAPI} setShowAddObjectForm={setShowAddObjectForm}/> : null}
                {showAddObjectForm ?
                    <Button onClick={() => setShowAddObjectForm(false)}>Hide Form</Button> :
                    <Button onClick={() => setShowAddObjectForm(true)}>Add new Object</Button>}
            </div>
            

            {secondHandGoods === null
                ? "loading..."
                :
                secondHandGoods.map((good, index) => {
                    return (
                        <Card key={index} style={{ width: '18rem' }}>
                        <img src={good.imageUrl} alt="object"/>
                       
                        <Card.Body>
                            <Card.Title>{good.name}</Card.Title>
                            <Card.Text>
                                {good.description}
                            </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>Price: {good.price}</ListGroup.Item>
                            <ListGroup.Item>Category: {good.category}</ListGroup.Item>
                        </ListGroup>   
                        <Link to={`/secondHandGoods/${good._id}`}>
                            <button>See Details</button>
                        </Link>
                   
                    </Card>)
                })
            }
        </div>
    )
}