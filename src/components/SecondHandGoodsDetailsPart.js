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
                    <div className="ms-5 row justify-content-between" id="secondHandGoodsD">
                        <div className="card m-5 border-0" id="sHcardBody" style={{ width: '38rem', height: '65vh' }}>
                            <div className="card-body text-start p-5">
                                <h1 className="card-title">{props.object.name}</h1>
                                <h3 className="card-subtitle my-4">CATEGORY: {props.object.category}</h3>
                                <h3 className="card-subtitle my-4">PRICE: {props.object.price}</h3>
                                <h5 className="card-text text-muted">DESCRIPTION:{props.object.description}</h5>
                                <h5 className="card-text text-muted">PUBLISHED BY {props.object.author?.name}</h5>
                            </div>
                        </div>
                        <div className="col-5 ">
                            {!props.object.imageUrl
                                ? <img id="discDetaiImage" style={{ width: 'auto', height: '65vh' }} src="https://via.placeholder.com/1150" alt="no pictures here" />
                                : <img id="discDetaiImage" style={{ width: 'auto', height: '65vh' }} src={props.object.imageUrl} alt="object" />
                            }
                        </div>
                    </div>
                }
            </div>

        </div>
                 
    )
}