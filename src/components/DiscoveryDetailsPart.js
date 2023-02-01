import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import heartIcon from "../images/heart.png"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import messageImage from "../images/envelope.png"
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
            return likerArr
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
                            ? <img id="discDetaiImage" src="https://via.placeholder.com/1150" alt="no pictures here" />
                            : <img id="discDetaiImage" src={props.discovery.imageUrl} alt="object" />
                        }
                        <div id="discDetaiTxt" style={{position:'relative'}}>
                            <div>
                                <h1 className="m-3 mb-5">{props.discovery.title}</h1>
                                <h5 className="m-3 mb-5">{props.discovery.author.name}</h5>                                
                            </div>
                            <div>
                                <p>{props.discovery.description}</p>
                            </div>
                            <form style={{ display: 'flex', flexDirection: 'row', position: 'absolute', top: '0vh', left: '27vw' }}>
                                <button className="border-0 me-3" onClick={increaseCounter} ><img src={heartIcon} alt="like" style={{ width: '2em' }} className="m-3 mb-3" /></button>
                                <h2 className="mt-2">{likerArr.length !== 0 && likerArr?.length}</h2>
                            </form>
                            {/* <div style={{ position: 'absolute', top: '1.5vh', left: '23vw' }}>
                                <img src={messageImage} alt="message" style={{ width: '2.5em' }} />
                            </div>    */}
                        </div>
                    </div>
                }
            </div>
            {props.discovery?.author.name === user.name
                ? <div className="my-2">
                    <Button onClick={deleteDiscovery} className="px-5" >Delete</Button>
                 </div>
                : null
            }
            
        </div>
    )
}