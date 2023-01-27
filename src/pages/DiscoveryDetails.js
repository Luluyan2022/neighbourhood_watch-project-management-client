import axios from "axios";
import EditDiscovery from "../components/EditDiscovery"
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
export default function DiscoveryDetails() {
    const navigate = useNavigate();
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

    const deleteDiscovery = () => {
        const storedToken = localStorage.getItem("authToken");
        axios
            .delete(`${process.env.REACT_APP_API_URL}/api/discoveries/${discoveryId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(() => {
                navigate("/discoveries");
            })
            .catch((err) => console.log(err));
    };
    return (
        <div>
            <div>
                {discovery &&
                    <div>
                        {!discovery.imageUrl
                            ? <img src="https://via.placeholder.com/1150" alt="no pictures here" />
                            : <img src={discovery.imageUrl} alt="object" />
                        }<br/>
                        {discovery.title}<br/>

                        Description:{discovery.description}
                    </div>
                }
            </div>


            <div>
                {showUpdateDiscoveryForm ? <EditDiscovery getDiscovery={getDiscovery} setShowUpdateDiscoveryForm={setShowUpdateDiscoveryForm}/> : null}
                {showUpdateDiscoveryForm ?
                    <Button onClick={() => setShowUpdateDiscoveryForm(false)}>Hide Form</Button> :
                    <Button onClick={() => setShowUpdateDiscoveryForm(true)}>Edit the Object</Button>}
            </div>


            <Button onClick={deleteDiscovery}>Delete</Button>
            <Link to="/discoveries">Back</Link>
        </div>
    )
}