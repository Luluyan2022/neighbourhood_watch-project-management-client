import { Button, Card, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const divStyle = {
    width:'95vw', 
    paddingTop:'0.8em'
  }
  const imgStyle = {
    maxHeight:'25vh',
    minHeight:'20vh'
  }
  const textStyle = {
    height: '5rem',
    overflow: 'scroll',
    textAlign: 'justify',
    textJustify: 'inter-word'
  }
  const seeDetButton = {
   padding:'0.3em 1em',
   backgroundColor:'#f0f5fb',
   border:'none',
   color:'#828484'   
  }

export default function SecondHandGoodsListsPart(props) {  

    return (
        <div>
            <div className='ms-5 container'>
                <div className="row ms-1 mt-5 ps-5" style={divStyle}>
                    {props.secondHandGoods === null
                        ? "loading..."
                        :
                        props.secondHandGoods.map((good, index) => {
                            return (
                                <Card key={index} className="m-1 ms-4 col-12 col-sm-2 border-0">
                                    <Card.Img
                                        variant="top"
                                        src={good.imageUrl}
                                        alt="object"
                                        className="mt-2"
                                        style={imgStyle}
                                    />

                                    <Card.Body>
                                        <Card.Title>{good.name}</Card.Title>
                                        <Card.Text className="remove-scrollbar" style={textStyle}>
                                            {good.description}
                                        </Card.Text>
                                    </Card.Body>

                                    <ListGroup className="list-group-flush">
                                        <ListGroup.Item>Price: {good.price} €</ListGroup.Item>
                                        <ListGroup.Item>Category: {good.category}</ListGroup.Item>
                                        <ListGroup.Item>Author: {good.author?.name}</ListGroup.Item>
                                    </ListGroup>

                                    <Link to={`/secondHandGoods/${good._id}`}>
                                        <Button style={seeDetButton}>See Details</Button>
                                    </Link>

                                </Card>)
                        })
                    }
                </div>
            </div>
        </div>
    )
}