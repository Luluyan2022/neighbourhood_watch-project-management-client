import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
export default function SecondHandsGoodsDetails(props) {
    const navigate = useNavigate();

    const { secondHandGoodId } = useParams();
    const { user } = useContext(AuthContext)
    const deleteObject = () => {
        const storedToken = localStorage.getItem("authToken");
        axios
            .delete(`${process.env.REACT_APP_API_URL}/api/secondHandGoods/${secondHandGoodId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(() => {
                navigate("/secondHandGoods");
            })
            .catch((err) => console.log(err));
    };

    const divStyle = {
        position: 'absolute',
        left: '10vw',
        bottom: '9em'
    }
    const divInDetailsPart = {
        display: 'flex',
        flexDirection: 'row'
    }
    const divNextStyle = {
        width: '45rem',
        minHeight: '65vh',
        background: 'linear-gradient(to right,#64b3f4, #c2e59c )',
        paddingTop: '3em'
    }
    const imgStyle = {
        height: '65vh',
        float: 'right',
        margin: '3em 5em',
        width: '50vw'
    }
    const backButtonStyle = {
        position: 'absolute',
        left:'70vw',
        bottom:'0vh'
    }
    const deleteButtonStyle = {
        position:'absolute',
        left:'54vw',
        bottom:'0vh',
        width:'8em'
    }

    return (
        <div>
            <div style={divStyle}>
                {props.object?.author.name === user.name 
                   && <Button onClick={deleteObject} style={deleteButtonStyle}>
                          Delete Project
                    </Button>}
                <Link to="/secondHandGoods">
                    <Button className="mx-3" style={backButtonStyle}>Back</Button>
                </Link>
            </div>

            <div>
                {props.object &&
                    <div
                        className="ms-5 row justify-content-between"
                        style={divInDetailsPart}
                    >
                        <div
                            className="card m-5 border-0"
                            style={divNextStyle}
                        >
                            <div className="card-body text-start p-3 ms-4 mb-5">
                                <h3 className="card-title">
                                    {props.object.name}
                                </h3>
                                <h4 className="card-subtitle my-4">
                                    CATEGORY: {props.object.category}
                                </h4>
                                <h4 className="card-subtitle my-4">
                                    PRICE: {props.object.price} €
                                </h4>
                                <h5 className="card-text text-muted">
                                    DESCRIPTION:{props.object.description}
                                </h5>
                                <h5 className="card-subtitle my-4">
                                    CONTACT:{props.object.contact}
                                </h5>
                                <h5 className="card-subtitle my-4">
                                    PUBLISHED BY {props.object.author?.name}
                                </h5>
                            </div>
                        </div>
                        <div className="col-6 ">
                            {!props.object.imageUrl
                                ? <img
                                    style={imgStyle}
                                    src="https://via.placeholder.com/1150"
                                    alt="no pictures here" />
                                : <img
                                    style={imgStyle}
                                    src={props.object.imageUrl}
                                    alt="object" />
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}