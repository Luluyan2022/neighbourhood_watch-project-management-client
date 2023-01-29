import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function SecondHandsGoodsDetails(props) {
    const navigate = useNavigate();    
      
    const { secondHandGoodId } = useParams();
      
    const deleteObject = () => {
        const storedToken = localStorage.getItem("authToken");
        axios
            .delete(`${process.env.REACT_APP_API_URL}/api/secondHandGoods/${secondHandGoodId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(() => {
                navigate("/secondHandGoods");
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <div id="secondHandGoodsDbutton">
                <Button onClick={deleteObject}>Delete Project</Button>
                <Link to="/secondHandGoods"><Button className="mx-3">Back</Button></Link>
            </div>
            <div>
               
                {props.object &&
                    <div className="ms-5" id="secondHandGoodsD">
                        <div className="card m-5 border-0" style={{ width: '38rem' }}>
                            <div className="card-body" id="sHcardBody">
                                <h1 className="card-title">{props.object.name}</h1>
                                <h3 className="card-subtitle my-4">Category: {props.object.category}</h3>
                                <h3 className="card-subtitle my-4">Price: {props.object.price}</h3>
                                <h5 className="card-text text-muted">{props.object.description}</h5>
                            </div>
                        </div>
                        <div>
                            {!props.object.imageUrl
                                ? <img id="discDetaiImage" style={{ width: '50vw' }} src="https://via.placeholder.com/1150" alt="no pictures here" />
                                : <img id="discDetaiImage" style={{ width: '50vw' }} src={props.object.imageUrl} alt="object" />
                            }
                        </div>
                    </div>
                }
            </div>

        </div>
                 
    )
}