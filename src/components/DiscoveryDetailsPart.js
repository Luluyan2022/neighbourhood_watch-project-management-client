import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
export default function DiscoveryDetailsPart(props) {
    const navigate = useNavigate(); 
    
    const { discoveryId } = useParams();  
    

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
                {props.discovery &&
                    <div>                        
                        {!props.discovery.imageUrl
                            ? <img id="discDetaiImage" src="https://via.placeholder.com/1150" alt="no pictures here" />
                            : <img id="discDetaiImage" src={props.discovery.imageUrl} alt="object" />
                        }
                        <div id="discDetaiTxt">
                            <div>
                                <h1 className="m-3 mb-5">{props.discovery.title}</h1>
                            </div>
                            <div>
                                <p>{props.discovery.description}</p>
                            </div>
                        </div>
                    </div>
                }
            </div>          

            <div className="my-2">
                <Button onClick={deleteDiscovery} className="px-5" >Delete</Button>
            </div>           
        </div>
    )
}