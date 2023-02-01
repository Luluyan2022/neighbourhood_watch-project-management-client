import axios from "axios";
import EditSecondHandGoods from "../components/EditSecondHandGoods"
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import SecondHandGoodsDetailsPart from "../components/SecondHandGoodsDetailsPart";
import backButton from "../images/left-arrow0.png"
export default function SecondHandsGoodsDetails() {

    const [showUpdateObjectForm, setShowUpdateObjectForm] = useState(false);
    const [object, setObject] = useState(null);
    const { secondHandGoodId } = useParams();
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
    
    const divStyle = {
        marginTop:' 0',
        background: 'linear-gradient(to right, #c2e59c, #64b3f4)', 
        width: '100vw',
        minHeight:'92vh'
      }
    const buttonStyle = {
        position: 'absolute',
        top: '8vh', left: '7vw',
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
        left: '21vw',
        bottom: '9em',
        marginLeft: '0.4em'
    }


    return (

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
                : <Button
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
    )
}