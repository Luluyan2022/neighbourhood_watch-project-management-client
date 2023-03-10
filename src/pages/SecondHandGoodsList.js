import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import SecondHandGoodsListsPart from "../components/SecondHandGoodsListsPart";
import AddSecondHandGoods from "../components/AddSecondHandGoods";
import backButton from "../images/left-arrow0.png"

const buttonStyle = {
    position: 'absolute',
    top: '10vh',
    left: '7vw',
    fontSize: '1.5em',
    textDecoration: 'none',
    color: "black",
    border: 'none',
    background: 'linear-gradient(to right, #6190e8, #a7bfe8)'
}
const imgStyle = {
    width: '1em'
}
const addNewObjectButtonStyle = {
    position: 'absolute',
    top: '4em',
    left: '47%'        
}

export default function SecondHandGoodsLists() {
    const [secondHandGoods, setSecondHandGoods] = useState([]);
    const [showAddObjectForm, setShowAddObjectForm] = useState(false);

    const getSecondHandGoodsInfoFromAPI = () => {
        const storedToken = localStorage.getItem("authToken");

        axios.get(`${process.env.REACT_APP_API_URL}/api/secondHandGoods`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(res => setSecondHandGoods(res.data))
            .catch((e) => {
                console.log("error in getting the secondHandGoodsInfo from API", e)
            })
    }
    useEffect(() => getSecondHandGoodsInfoFromAPI(), []);

    return (
        <div>
            <div>
                {showAddObjectForm
                    ? <AddSecondHandGoods
                        getSGInfoFromAPI={getSecondHandGoodsInfoFromAPI}
                        setShowAddObjectForm={setShowAddObjectForm}
                    />
                    : <SecondHandGoodsListsPart
                        secondHandGoods={secondHandGoods}
                    />}
                {showAddObjectForm
                    ? <button
                        onClick={() => setShowAddObjectForm(false)}
                        style={buttonStyle}>
                        Back
                        <img
                            src={backButton}
                            alt="back"
                            style={imgStyle}
                        />
                    </button>
                    : <Button
                        style={addNewObjectButtonStyle}
                        onClick={() => setShowAddObjectForm(true)}>
                        Add new Object
                    </Button>}
            </div>
        </div>
    )
}