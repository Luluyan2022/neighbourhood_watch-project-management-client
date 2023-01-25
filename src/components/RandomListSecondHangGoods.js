import axios from 'axios';
import { Button } from "react-bootstrap";
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
export default function RandomListSecondHangGoods() {
    const [secondHandGoods, setsecondHandGoods] = useState([]);
    const [showedStatus, setShowedStatus] = useState(false);
    const getRandomList = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/secondHandGoods/random`)
            .then((res) => setsecondHandGoods(res.data))
            .catch((error) => console.log(error));
    }
    useEffect(() => { getRandomList(); }, []);


    return (
        <div>
            {
                secondHandGoods.map((good, index) => {
                    return (<Card key={index} style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={good.image} />
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
                        <Card.Body>
                            {showedStatus && <Card.Title>Contact: {good.contact}</Card.Title>}
                            {showedStatus
                                ? <Button onClick={() => setShowedStatus(false)}>Back</Button>
                                : <Button onClick={() => setShowedStatus(true)}>See More</Button>}

                        </Card.Body>
                    </Card>)
                })
            }
            <Link to="/secondHandGoods">More</Link>
        </div>

    )
}