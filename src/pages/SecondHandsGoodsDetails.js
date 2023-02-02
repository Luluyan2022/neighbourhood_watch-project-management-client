import axios from "axios";
import EditSecondHandGoods from "../components/EditSecondHandGoods"
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import SecondHandGoodsDetailsPart from "../components/SecondHandGoodsDetailsPart";
import backButton from "../images/left-arrow0.png";
import { AuthContext } from "../context/auth.context";
import messageImg from "../images/envelope.png"
import MessageToAuthor from "../components/MessageToAuthor"

const divStyle = {
    marginTop:' 0',
    background: 'linear-gradient(to right, #c2e59c, #64b3f4)', 
    width: '100vw',
    minHeight:'92vh',
    position:'relative'
  }
const buttonStyle = {
    position: 'absolute',
    top: '8vh', 
    left: '7vw',
    fontSize: '1.5em',
    textDecoration: 'none',
    color: "black",
    border: '0',
    background: '#c2e59c'
}
const imgStyle = {
    width: '2em'
}
const editButtonStyle = {
    position: 'absolute',
    right: 530,
    bottom: 123,
    marginLeft: '0.4em'
}
const buttonThreeStyle = {
    position: 'absolute',
    right: 68,
    top: 90,
    margin: '1em'
}
const messageImgStyle = {        
    width: '2vw'
}
const messageButtonDiv = {
    position: 'absolute',
    bottom: 100,
    right: 170
}
export default function SecondHandsGoodsDetails() {

    const [showUpdateObjectForm, setShowUpdateObjectForm] = useState(false);
    const [showMessageForm, setShowMessageForm] = useState(false);
    const [object, setObject] = useState(null);
    const { secondHandGoodId } = useParams();
    const { user } = useContext(AuthContext)
    const getObject = () => {
        const storedToken = localStorage.getItem("authToken");
        axios.get(`${process.env.REACT_APP_API_URL}/api/secondHandGoods/${secondHandGoodId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((response) => {
                const oneObject = response.data;
                setObject(oneObject);
            })
            .catch((error) => console.log("error getting one object from API", error));
    };
    // eslint-disable-next-line
    useEffect(() => { getObject() }, []);
    
    return (
<div>
        <div style={divStyle}>
            
            {showUpdateObjectForm
                ? <button
                    onClick={() => setShowUpdateObjectForm(false)}
                    style={buttonStyle}>
                    Back
                    <img
                        src={backButton}
                        alt="back"
                        style={imgStyle}
                    />
                </button>
                : object?.author.name === user.name
                    && <Button
                    style={editButtonStyle}
                    onClick={() => setShowUpdateObjectForm(true)}>
                    Edit the Object
                </Button>}

            {showUpdateObjectForm
                ? <EditSecondHandGoods
                    getObject={getObject}
                    setShowUpdateObjectForm={setShowUpdateObjectForm}
                />
                : <SecondHandGoodsDetailsPart
                    object={object}
                />}
        </div>
       
        <div>
                {showMessageForm
                    ? <MessageToAuthor
                        user={user}
                        object={object} />
                    : null
                }
                {showMessageForm
                    ? <Button
                        onClick={() => setShowMessageForm(false)}
                        style={buttonThreeStyle}>
                        Back to Object
                    </Button>
                    : showUpdateObjectForm
                        ? null
                        : <div style={messageButtonDiv}>
                            <img
                                className="px-1"
                                onClick={() => setShowMessageForm(true)}
                                style={messageImgStyle}
                                src={messageImg}
                                alt="message" />
                            {object?.author.name === user.name
                                ? <p>See messages</p>
                                : <p>Contact Author</p>}
                    </div>
                }
            </div>
        </div>
    )
}