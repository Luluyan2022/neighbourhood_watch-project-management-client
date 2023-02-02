import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import AddDiscovery from '../components/AddDiscovery';
import DiscoveriesList from '../components/DiscoveriesList';
import backButton from "../images/left-arrow0.png"

const backButtonStyle = {
    position: 'absolute',
    top: '10vh',
    left: '7vw',
    fontSize: '1.5em',
    textDecoration: 'none',
    color: "black",
    border: 'none',
    background: 'linear-gradient(to right, #6190e8, #a7bfe8)'
}
const addDiscButtonStyle = {
    position: 'absolute',
    top: '4em',
    left: '47%'
}
const imgStyle = {
    width: '1em'
}

export default function DiscoveriesListPage() {

    const [showAddDiscoveryForm, setShowAddDiscoveryForm] = useState(false);
    const [discoveries, setDiscoveries] = useState(null);

    const getDiscoveriesFromAPI = () => {
        const storedToken = localStorage.getItem("authToken");
        axios.get(`${process.env.REACT_APP_API_URL}/api/discoveries`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(res => setDiscoveries(res.data))
            .catch((e) => {
                console.log("error in getting the discoveries from API", e)
            })
    }

    useEffect(() => { getDiscoveriesFromAPI() }, []);    

    return (

        <div>
            <div>
                {showAddDiscoveryForm
                    ? <AddDiscovery
                        getDiscoveriesFromAPI={getDiscoveriesFromAPI}
                        setShowAddDiscoveryForm={setShowAddDiscoveryForm} />
                    : <DiscoveriesList
                        discoveries={discoveries}
                        setDiscoveries={setDiscoveries} />
                }

                {showAddDiscoveryForm
                    ? <button
                        style={backButtonStyle}
                        onClick={() => { setShowAddDiscoveryForm(false) }}>
                        Back
                        <img
                            src={backButton}
                            alt="back"
                            style={imgStyle}
                        />
                    </button>
                    : <Button
                        style={addDiscButtonStyle}
                        onClick={() => { setShowAddDiscoveryForm(true) }}>
                        Add new Discovery
                    </Button>
                }
            </div>

        </div>
    )
}