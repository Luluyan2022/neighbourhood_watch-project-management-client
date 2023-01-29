
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


export default function DiscoveriesList(props) {
    // const [showAddDiscoveryForm, setShowAddDiscoveryForm] = useState(false);
   

    return (

        <div className='discoveries' style={{height:'92vh'}}>            
            <div className='pt-3 container'>
                <div className="row" style={{ width: '45vw' }}>
                    {props.discoveries === null
                        ? "loading..."
                        :
                        props.discoveries.map((discovery, index) => {
                            return (

                                <Card key={index} className="m-3 col border-0">
                                    <Link to={`/discoveries/${discovery._id}`}>
                                        <Card.Img variant="top" src={discovery.imageUrl} className="mt-2" style={{ height: '25vh' }}/>
                                    </Link>
                                    <Card.Body>
                                        <Card.Title className='text-start'>{discovery.title}</Card.Title>
                                        <Card.Text>
                                            {discovery.author}
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