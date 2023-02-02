import axios from "axios";
import EditDiscovery from "../components/EditDiscovery"
import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import DiscoveryDetailsPart from "../components/DiscoveryDetailsPart";
import backButton from "../images/left-arrow0.png"
import { AuthContext } from "../context/auth.context";
import commentImage from "../images/conversation.png";
import CommentInDiscovery from "../components/CommentInDiscovery"

const divStyle = {
    position: 'relative'
}
const buttonStyle = {
    position: 'absolute',
    right: '43vw',
    margin: '1em'
}
const buttonTwoStyle = {
    width: '7.5vw'
}
const linkStyle = {
    position: 'absolute',
    top: '1vh',
    left: '7.5vw',
    fontSize: '1.5em',
    textDecoration: 'none',
    color: "black"
}
const imgStyle = {
    width: '2em'
}
const buttonThreeStyle = {
    position: 'absolute',
    right: 64,
    top: -45,
    margin: '1em'
}
const commentImgStyle = {
    position: 'absolute',
    top: '1vh',
    left: '26vw',
    width: '3vw'
}

export default function DiscoveryDetails() {

    const [showUpdateDiscoveryForm, setShowUpdateDiscoveryForm] = useState(false);
    const [showCommentForm, setShowCommentForm] = useState(false);

    const [discovery, setDiscovery] = useState(null);
    const { user } = useContext(AuthContext)
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
        <div style={divStyle}>
            <div>

                {showUpdateDiscoveryForm
                    ? <EditDiscovery
                        getDiscovery={getDiscovery}
                        setShowUpdateDiscoveryForm={setShowUpdateDiscoveryForm}
                    />
                    : <DiscoveryDetailsPart
                        discovery={discovery}
                    />
                }

                {showUpdateDiscoveryForm
                    ? <Button
                        onClick={() => setShowUpdateDiscoveryForm(false)}
                        style={buttonStyle}>
                        Back to Discovery
                    </Button>
                    : discovery?.author.name === user.name
                    && <Button
                        className="px-1"
                        onClick={() => setShowUpdateDiscoveryForm(true)}
                        style={buttonTwoStyle}>
                        Edit the Object
                    </Button>
                }

            </div>

            <div>
                <Link to="/discoveries" style={linkStyle}>
                    Back
                    <img src={backButton} alt="back" style={imgStyle} />
                </Link>
            </div>

            <div>
                {showCommentForm
                    ? <CommentInDiscovery
                        user={user}
                        discovery={discovery} />
                    : null
                }
                {showCommentForm
                    ? <Button
                        onClick={() => setShowCommentForm(false)}
                        style={buttonThreeStyle}>
                        Back to Discovery
                    </Button>
                    : <img
                        className="px-1"
                        onClick={() => setShowCommentForm(true)}
                        style={commentImgStyle}
                        src={commentImage}
                        alt="comment" />
                }
            </div>
        </div>
    )
}