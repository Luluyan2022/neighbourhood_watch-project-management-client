
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const divStyle = {
    height: '92vh',
    background: 'linear-gradient(to right, #6190e8, #a7bfe8)'
}
const cardStyle = {
    width: '20vw'
}
const imgStyle = {
    height: '25vh'
}

export default function DiscoveriesList(props) {


    return (

        <div style={divStyle}>

            <div className='pt-3 container-fluid'>
                <div className="row m-5 ps-5">
                    {props.discoveries === null
                        ? "loading..."
                        :
                        props.discoveries.map((discovery, index) => {
                            return (

                                <Card
                                    key={index}
                                    className="m-4 col-12 col-sm-3 border-0 "
                                    style={cardStyle}>
                                    <Link to={`/discoveries/${discovery._id}`}>
                                        <Card.Img
                                            variant="top"
                                            src={discovery.imageUrl}
                                            className="mt-2"
                                            style={imgStyle} />
                                    </Link>

                                    <Card.Body>
                                        <Card.Title className='text-start'>
                                            {discovery.title}
                                        </Card.Title>
                                        <Card.Text>
                                            {discovery.author?.name}
                                        </Card.Text>
                                    </Card.Body>

                                </Card>)
                        })
                    }
                </div>
            </div>
        </div>
    )
}