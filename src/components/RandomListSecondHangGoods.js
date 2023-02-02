import axios from 'axios';
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
    const buttonStyle = {
        border:'none',
        backgroundColor:'#f0f5fb'
    }
    const linkStyle = {
        fontSize:'1.5em',
        position:'absolute',
        left:'30em',
        bottom:'5em'

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



                                    {showedStatus
                                        && <ListGroup.Item>
                                            Contact: {good.contact}
                                        </ListGroup.Item>}
                                    {showedStatus
                                        ? <button onClick={() => setShowedStatus(false)} style={buttonStyle}>
                                            Back
                                        </button>
                                        : <button onClick={() => setShowedStatus(true)} style={buttonStyle}>
                                            Contact
                                        </button>}
                                </ListGroup>

                            </Card>)
                    })
                }

                <Link to="/secondHandGoods" style={linkStyle}>
                    More
                </Link>

            </div>
        </div>

    )
}