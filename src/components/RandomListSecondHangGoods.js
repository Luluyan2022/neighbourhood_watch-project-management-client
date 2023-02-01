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
        const storedToken = localStorage.getItem("authToken");
        axios.get(`${process.env.REACT_APP_API_URL}/api/secondHandGoods/random`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((res) => setsecondHandGoods(res.data))
            .catch((error) => console.log(error));
    }
    useEffect(() => { getRandomList(); }, []);

    const cardStyle = {
        width: '25rem'
    }
    const cardImgStyle = {
        height: '15rem'
    }
    const divStyle = { 
        width: '90vw',
        position:'absolute',
        left:'7em' 
    }
    const textStyle = {
        overflow: 'hidden',
        textOverflow: 'ellipsis',    
        whiteSpace: 'nowrap'
       }
    
    return (
        <div className='mt-5 container'>
            <div className="row" style={divStyle}>
                {
                    secondHandGoods.map((good, index) => {
                        return (
                            <Card
                                key={index}
                                className="m-3 col-12 col-sm-3"
                                style={cardStyle}>
                                <Card.Img
                                    variant="top"
                                    src={good.imageUrl}
                                    style={cardImgStyle}
                                    className="mt-2" />

                                <Card.Body>
                                    <Card.Title>{good.name}</Card.Title>
                                    <Card.Text style={textStyle}>
                                        {good.description}
                                    </Card.Text>
                                </Card.Body>

                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item>
                                        Price: {good.price}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Category: {good.category}
                                    </ListGroup.Item>
                                </ListGroup>

                                <Card.Body>
                                    {showedStatus
                                        && <Card.Title>
                                            Contact: {good.contact}
                                        </Card.Title>}
                                    {showedStatus
                                        ? <Button onClick={() => setShowedStatus(false)}>
                                            Back
                                        </Button>
                                        : <Button onClick={() => setShowedStatus(true)}>
                                            See More
                                        </Button>}
                                </Card.Body>

                            </Card>)
                    })
                }

                <Link to="/secondHandGoods">
                    More
                </Link>

            </div>
        </div>

    )
}