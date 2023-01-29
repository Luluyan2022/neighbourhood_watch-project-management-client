import axios from "axios";
import EditDiscovery from "../components/EditDiscovery"
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import DiscoveryDetailsPart from "../components/DiscoveryDetailsPart";

export default function DiscoveryDetails() {   
    const [showUpdateDiscoveryForm, setShowUpdateDiscoveryForm] = useState(false);
    const [discovery, setDiscovery] = useState(null);
    const { discoveryId } = useParams();
    const getDiscovery = () => {
        const storedToken = localStorage.getItem("authToken");
        axios.get(`${process.env.REACT_APP_API_URL}/api/discoveries/${discoveryId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((response) => {
                const oneDiscovery = response.data;
                setDiscovery(oneDiscovery);
            })
            .catch((error) => console.log("error getting one discovery from API", error));
    };
    // eslint-disable-next-line
    useEffect(() => { getDiscovery() }, []);
    
    return (
        <div>        


            <div>
                {showUpdateDiscoveryForm ? <EditDiscovery getDiscovery={getDiscovery} setShowUpdateDiscoveryForm={setShowUpdateDiscoveryForm}/> 
                 : <DiscoveryDetailsPart discovery={discovery}/>}
                {showUpdateDiscoveryForm ?
                    <Button onClick={() => setShowUpdateDiscoveryForm(false)}>Hide Form</Button> :
                    <Button className="px-1" onClick={() => setShowUpdateDiscoveryForm(true)} style={{width:'7.5vw'}}>Edit the Object</Button>}
            </div>           
            <div>
                <Link to="/discoveries">Back</Link>
            </div>
        </div>
    )
}