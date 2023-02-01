import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

export default function CommentInDiscovery(props){
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState("");
    const { user } = useContext(AuthContext)
    const [authorId,setAuthorId] = useState(user._id) 
    const [discoverySpecialId,setDiscoverySpecialId] = useState(user._id) 
    const navigate = useNavigate();   
    const { discoveryId } = useParams();
   
    //get prevComment and display them
    const getCommentArr = () => {
        const storedToken = localStorage.getItem('authToken');
        axios.get(`${process.env.REACT_APP_API_URL}/api/discoveries/${discoveryId}/comments`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(res => { 
                setComments(res.data)
            })
            .catch((error) => console.log("error in getting commentArr", error));
    }

    // eslint-disable-next-line
    useEffect(() => { getCommentArr() }, [discoveryId]);

    const createNewComment = (newComment) => {
        const storedToken = localStorage.getItem('authToken');
        axios
            .post(`${process.env.REACT_APP_API_URL}/api/discoveries/${discoveryId}/comments`, newComment, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((res) => {
                console.log("comment is created")
                getCommentArr();
            })
            .then(() => console.log('Updating...'))
            .catch((error) => console.log("error in creating comment", error));
    }
  
    const handleSubmit = (e) => {
        e.preventDefault();       
        const newComment = { 
            "content":content,
            "author":authorId,
            "discovery":discoverySpecialId
        };
        createNewComment(newComment);
        
        setContent("")
        navigate("/discoveries/${discoveryId}/comments")
    }
    

    return(
        <div className="m-5" >
            <div className="input-group ms-5 ps-5" style={{backgroundColor:'white',border:'1em solid',height:'80vh',width:'40vw',position:'absolute',top:'30'}}>
                
                {comments && comments.map((comment, index) => {
                    return (
                        <div key={index}>
                        <span className="input-group-text">{comment.author?.name}</span>
                        <p style={{ width: '30vw',height:'3em',padding:'1em',textAlign:'left' }}>{comment.content}</p>
                        </div>
                        )
                })}


            </div>

            <div>
                <form onSubmit={handleSubmit} className="input-group m-5 p-5" style={{width:'35vw'}}>
                    <input
                        className="input-group-text"
                        type="string"
                        name="author"
                        value={user.name}
                        onChange={(event) => { setAuthorId(event.target.value) }}
                        disabled
                    />
                    <input
                        className="input-group-text"
                        type="string"
                        name="author"
                        value={props.discovery_id}
                        onChange={(event) => { setDiscoverySpecialId(event.target.value) }}
                        hidden
                    />
                    <textarea
                        className="form-control"
                        aria-label="With textarea"
                        name="content"
                        value={content}
                        onChange={(event) => { setContent(event.target.value) }}
                    ></textarea>
                    <button type="submit">Comment</button>
                </form>
            </div>
        </div>
    )
}