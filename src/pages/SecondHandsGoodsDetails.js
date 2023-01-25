import axios from "axios";
import EditSecondHandGoods from "../components/EditSecondHandGoods"
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";

export default function SecondHandsGoodsDetails() {
    const navigate = useNavigate();
    const { secondHandGoodId } = useParams();
    const [showUpdateObjectForm, setShowUpdateObjectForm] = useState(false);
    const [object, setObject] = useState(null);

    const getObject = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/secondHandGoods/${secondHandGoodId}`)
        .then((response) => {
          const oneObject = response.data;         
          setObject(oneObject);
        })
        .catch((error) => console.log(error));
    };
    // eslint-disable-next-line
    useEffect(() => { getObject() }, []);
    const deleteObject = () => {
        axios
            .delete(`${process.env.REACT_APP_API_URL}/api/secondHandGoods/${secondHandGoodId}`)
            .then(() => {
                navigate("/secondHandGoods");
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
           <div>
                <Card style={{ width: '18rem' }}>
                    {!object.image.length === 0 
                    ? object.image.map((imageE, index) => {
                        return <Card.Img variant="top" key={index} src={imageE} />
                    })
                    : <Card.Img variant="top" src="https://via.placeholder.com/150" alt="no images here" />
                    }                    

                    <Card.Body>
                        <Card.Title>{object.name}</Card.Title>
                        <Card.Text>{object.description}</Card.Text>
                    </Card.Body>

                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>Price: {object.price}</ListGroup.Item>
                        <ListGroup.Item>Category: {object.category}</ListGroup.Item>
                    </ListGroup>
                        
                </Card>
                           
                <div>
                     {showUpdateObjectForm ? <EditSecondHandGoods /> : null}
                     {showUpdateObjectForm ?
                        <Button onClick={() => setShowUpdateObjectForm(false)}>Hide Form</Button> :
                        <Button onClick={() => setShowUpdateObjectForm(true)}>Edit the Object</Button>}
                </div >
            </div >   
            
            <Button onClick={deleteObject}>Delete Project</Button>
        </div >
                 
    )
}