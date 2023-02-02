import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const divStyle = {
    backgroundColor: 'rgba(239, 245, 250, 0.9)',
    minHeight: '75vh',
    width: '55vw',
    position: 'absolute',
    top: -15,
    right: -13
}
const divInLoopStyle = {
    width: '30vw',
    height: '3rem',
    padding: '1rem',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'row',
    margin:'0rem 1rem'
}
const formStyle = {
    width: '50vw',
    position: 'absolute',
    bottom: '3vh'
}
const pInLoopStyle = {
    fontSize:'1.2em'
}
const commentBox = {
    height: '30rem',
    overflow: 'scroll'
}

const scrollDown = {
    color: 'rgba(134, 133, 133, 0.74)'   
}

export default function CommentInDiscovery(props) {
    const [commentsArr, setCommentsArr] = useState([]);
    const [content, setContent] = useState("");
    const { user } = useContext(AuthContext)
    const [authorId, setAuthorId] = useState(user._id)

    const { discoveryId } = useParams();

    //get prevComment and display them
    const getCommentArr = () => {
        const storedToken = localStorage.getItem('authToken');
        axios.get(`${process.env.REACT_APP_API_URL}/api/discoveries/${discoveryId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(res => {               
                setCommentsArr(res.data.comments)
            })
            .catch((error) => console.log("error in getting commentArr", error));
    }

    // eslint-disable-next-line
    useEffect(() => { getCommentArr() }, [discoveryId]);

    const createNewComment = (newComment) => {       
        let newCommentsArr = [...commentsArr, newComment]
        const requestBody = { comments: newCommentsArr };
        const storedToken = localStorage.getItem('authToken');
        axios
            .put(`${process.env.REACT_APP_API_URL}/api/discoveries/edit/${discoveryId}`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((res) => {                
                getCommentArr();
            })
            .then(() => console.log('Updating...'))
            .catch((error) => console.log("error in creating comment", error));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newComment = {
            "content": content,
            "author": authorId,
        };
        createNewComment(newComment);

        setContent("")

    }
 
    return (
        <div className="m-5" style={divStyle}>
            <div className="input-group ms-5 ps-5 mt-5 pt-3 remove-scrollbar" style={commentBox} >

                {commentsArr && commentsArr.map((comment, index) => {
                    return (
                        <div key={index} style={divInLoopStyle}>
                            <h4 className="me-3">
                                {comment.author?.name}:
                            </h4>
                            <p style={pInLoopStyle}>{comment.content}</p>
                        </div>
                    )
                })}
            </div>
            {commentsArr.length > 10 && <p style={scrollDown}> scroll down for more comments </p>}

            <div className="ms-2">
                <form
                    onSubmit={handleSubmit}
                    className="input-group mx-5 my-2 p-5"
                    style={formStyle}>
                    
                    <label>
                        <h4 className="m-3">{user.name}</h4>
                    </label>
                    <input
                        className="input-group-text"
                        type="string"
                        name="author"
                        value={authorId}
                        onChange={(event) => { setAuthorId(event.target.value) }}
                        hidden
                    />

                    <textarea
                        className="form-control"
                        aria-label="With textarea"
                        name="content"
                        value={content}
                        required
                        onChange={(event) => { setContent(event.target.value) }}
                    ></textarea>
                    <button type="submit">Comment</button>
                </form>
            </div>
        </div>
    )
}