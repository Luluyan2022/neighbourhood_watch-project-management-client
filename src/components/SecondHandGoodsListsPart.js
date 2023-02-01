import { Button, Card, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function SecondHandGoodsListsPart(props) {
    
   const divStyle = {
     width:'90vw',     
     marginLeft:'5em',
     paddingLeft:'5em'
   }
   const imgStyle = {
     maxHeight:'25vh',
     minHeight:'20vh'
   }
   const textStyle = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',    
    whiteSpace: 'nowrap'
   }
  
    return (
        <div>
            <div className='m-3 ms-5 ps-5 container'>
                <div className="row" style={divStyle}>
                    {props.secondHandGoods === null
                        ? "loading..."
                        :
                        props.secondHandGoods.map((good, index) => {
                            return (
                                <Card key={index} className="m-2 col-12 col-sm-3 border-0">
                                    <Card.Img
                                        variant="top"
                                        src={good.imageUrl}
                                        alt="object"
                                        className="mt-2"
                                        style={imgStyle}
                                    />

                                    <Card.Body>
                                        <Card.Title>{good.name}</Card.Title>
                                        <Card.Text style={textStyle}>
                                            {good.description}
                                        </Card.Text>
                                    </Card.Body>

                                    <ListGroup className="list-group-flush">
                                        <ListGroup.Item>Price: {good.price} €</ListGroup.Item>
                                        <ListGroup.Item>Category: {good.category}</ListGroup.Item>
                                        <ListGroup.Item>Author: {good.author?.name}</ListGroup.Item>
                                    </ListGroup>

                                    <Link to={`/secondHandGoods/${good._id}`}>
                                        <Button>See Details</Button>
                                    </Link>

                                </Card>)
                        })
                    }
                </div>
            </div>
        </div>
    )
}