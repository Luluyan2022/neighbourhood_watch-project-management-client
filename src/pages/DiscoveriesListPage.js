import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import AddDiscovery from '../components/AddDiscovery';
import DiscoveriesList from '../components/DiscoveriesList';

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
    useEffect(() => {
        console.log('this useEffect is running fine')
        getDiscoveriesFromAPI()
    }, []);

    return (

        <div>
            <div>
                {showAddDiscoveryForm 
                    ? <AddDiscovery getDiscoveriesFromAPI={getDiscoveriesFromAPI} setShowAddDiscoveryForm={setShowAddDiscoveryForm} /> 
                    : <DiscoveriesList discoveries={discoveries} setDiscoveries={setDiscoveries}/>
                }

                {showAddDiscoveryForm 
                    ? <Button style={{position:'absolute',bottom:'19%',left:'53vw',width:'5em' }} onClick={() =>{setShowAddDiscoveryForm(false)}}>Back</Button>
                    : <Button id="addDiscButton" onClick={() => {setShowAddDiscoveryForm(true)}}>Add new Discovery</Button>
                }
            </div>
           
        </div>
    )
}