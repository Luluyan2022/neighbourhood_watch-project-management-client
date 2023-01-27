import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import AddDiscovery from '../components/AddDiscovery';

export default function DiscoveriesListPage() {
    const [showAddDiscoveryForm, setShowAddDiscoveryForm] = useState(false);
    const [discoveries, setDiscoveries] = useState([]);
    
    const getDiscoveriesFromAPI = () => {
        const storedToken = localStorage.getItem("authToken");
        axios.get(`${process.env.REACT_APP_API_URL}/api/discoveries`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(res => setDiscoveries(res.data))
            .catch((e) => {
                console.log("error in getting the discoveries from API", e)
            })
    }
    useEffect(() => getDiscoveriesFromAPI, []);

    return (

        <div>
            <div>
                {showAddDiscoveryForm ? <AddDiscovery getDiscoveriesFromAPI={getDiscoveriesFromAPI} setShowAddDiscoveryForm={setShowAddDiscoveryForm} /> : null}
                {showAddDiscoveryForm ?
                    <Button onClick={() => setShowAddDiscoveryForm(false)}>Hide Form</Button> :
                    <Button onClick={() => setShowAddDiscoveryForm(true)}>Add new Discovery</Button>}
            </div>

            {discoveries === null
                ? "loading..."
                :
                discoveries.map((discovery, index) => {
                    return (

                        <Card key={index} style={{ width: '18rem' }}>
                            <Link to={`/discoveries/${discovery._id}`}>
                                <Card.Img variant="top" src={discovery.imageUrl} />
                            </Link>
                            <Card.Body>
                                <Card.Title>{discovery.title}</Card.Title>
                                <Card.Text>
                                    discovery.author
                                </Card.Text>
                            </Card.Body>
                        </Card>)
                })
            }

        </div>
    )
}