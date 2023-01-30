import axios from "axios";
import EditDiscovery from "../components/EditDiscovery"
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import DiscoveryDetailsPart from "../components/DiscoveryDetailsPart";
import backButton from "../images/left-arrow0.png"
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
                    <Button onClick={() => setShowUpdateDiscoveryForm(false)} style={{position:'absolute', right:'43vw',margin:'1em'}}>Back to Discovery</Button> :
                    <Button className="px-1" onClick={() => setShowUpdateDiscoveryForm(true)} style={{width:'7.5vw'}}>Edit the Object</Button>}
            </div>           
            <div>
                <Link to="/discoveries" 
                     style={{position:'absolute', top:'11vh',left:'7.5vw', fontSize:'1.5em',textDecoration: 'none',color:"black"}}
                     >Back<img src={backButton} alt="back" style={{width:'2em'}}/>
                </Link>
            </div>
        </div>
    )
}