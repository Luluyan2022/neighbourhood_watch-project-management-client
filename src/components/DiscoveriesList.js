
import Card from 'react-bootstrap/Card';
import { Link, useSearchParams } from 'react-router-dom';


export default function DiscoveriesList(props) {
    
    // const [searchParams, setSearchParams] = useSearchParams();   
    // const searchTerm = searchParams.get('q');
    // const findDiscoveriesToDisplay = props.discoveries.filter(discovery => {
    //             return discovery.title?.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    //          })
      

    return (

        <div className='discoveries ' style={{ height: '92vh' }}>
            {/* <form>
                <label> Search </label>
                    <input
                        type="text"
                        name="searchTerm"
                        placeholder="search..."
                        value={searchTerm}
                        onChange={e => setSearchParams(e.target.value)}
                    />               
            </form> */}

            <div className='pt-3 container-fluid'>
                <div className="row m-5 ps-5">
                    {props.discoveries === null
                        ? "loading..."
                        :
                        props.discoveries.map((discovery, index) => {
                            return (

                                <Card key={index} className="m-4 col-12 col-sm-3 border-0 " style={{ width: '20vw' }}>
                                    <Link to={`/discoveries/${discovery._id}`}>
                                        <Card.Img variant="top" src={discovery.imageUrl} className="mt-2" style={{ height: '25vh' }} />
                                    </Link>
                                    <Card.Body>
                                        <Card.Title className='text-start'>{discovery.title}</Card.Title>
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