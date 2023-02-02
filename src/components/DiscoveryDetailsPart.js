import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import heartIcon from "../images/heart.png"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";

const imgStyle = {
    height: '65vh',
    float: 'right',
    margin: '5em 5em',
    width: '50vw'
}
const divStyle = {
    position: 'relative',
    width: '35vw',
    display: 'flex',
    flexDirection: 'column',
    margin: '3em 2em 3em 5em',
    padding: '5em 2em'
}
const textBoxStyle = {
    fontSize: '1.3rem',
    textAlign: 'justify',
    overflow: 'hidden',
    textJustify: 'inter-word' 
}
const pStyle = {     
    paddingLeft: '2rem',
    height: '26rem',
    overflowY: 'scroll' 
}
const formStyle = {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    top: '0vh',
    left: '27vw'
}
const buttonImgStyle = {
    width: '2em'
}

export default function DiscoveryDetailsPart(props) {
    const navigate = useNavigate();
    const [likerArr, setLikerArr] = useState([]);
    const { discoveryId } = useParams();
    const { user } = useContext(AuthContext)

    //get prevCounterArr and display the number of likers 
    const getLikerArr = () => {
        const storedToken = localStorage.getItem('authToken');
        axios.get(`${process.env.REACT_APP_API_URL}/api/discoveries/${discoveryId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(res => {
                const prevLikerArr = res.data.likerArr;
                setLikerArr(prevLikerArr)
            })
            .catch((error) => console.log("error in getting likerArr", error));
    }
    // eslint-disable-next-line
    useEffect(() => { getLikerArr() }, [discoveryId])

    // user click the like button
    const increaseCounter = (e) => {
        e.preventDefault()
        if (likerArr.includes(user.name) === false) {

            let newLikeArr = [...likerArr, user.name]
            const requestBody = { likerArr: newLikeArr };
            
            const storedToken = localStorage.getItem('authToken');
            axios
                .put(`${process.env.REACT_APP_API_URL}/api/discoveries/edit/${discoveryId}`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
                .then((res) => {
                    setLikerArr(res.data.likerArr)

                })
                .catch((error) => console.log("error in increasing likerNumber", error));

        } else {

            let newLikeArr = likerArr.filter((liker) => {
                return liker !== user.name
            })
            
            const requestBody = { likerArr: newLikeArr };

            const storedToken = localStorage.getItem('authToken');
            axios
                .put(`${process.env.REACT_APP_API_URL}/api/discoveries/edit/${discoveryId}`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
                .then((res) => {
                    setLikerArr(res.data.likerArr)

                })
                .catch((error) => console.log("error in increasing likerNumber", error));
        }
    }

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
                            ? <img
                                style={imgStyle}
                                src="https://via.placeholder.com/1150"
                                alt="no pictures here" />
                            : <img
                                style={imgStyle}
                                src={props.discovery.imageUrl}
                                alt="object" />
                        }

                        <div style={divStyle}>

                            <div>
                                <h1 className="m-3 mb-5">{props.discovery.title}</h1>
                                <h5 className="m-3 mb-5">{props.discovery.author.name}</h5>
                            </div>

                            <div style={textBoxStyle}>
                                <p className="remove-scrollbar" style={pStyle}>{props.discovery.description}</p>
                            </div>

                            <form style={formStyle}>

                                <button
                                    className="border-0 me-3"
                                    onClick={increaseCounter} >
                                    <img
                                        src={heartIcon}
                                        alt="like"
                                        style={buttonImgStyle}
                                        className="m-3 mb-3" />
                                </button>

                                <h2 className="mt-2">
                                    {likerArr.length !== 0 && likerArr?.length}
                                </h2>

                            </form>

                        </div>
                    </div>
                }
            </div>

            {props.discovery?.author.name === user.name
                ? <div className="my-2">
                    <Button
                        onClick={deleteDiscovery}
                        className="px-5" >
                        Delete
                    </Button>
                </div>
                : null
            }

        </div>
    )
}