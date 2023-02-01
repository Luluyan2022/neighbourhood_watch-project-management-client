import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

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
                console.log(res.data.comments)
                setCommentsArr(res.data.comments)
            })
            .catch((error) => console.log("error in getting commentArr", error));
    }

    // eslint-disable-next-line
    useEffect(() => { getCommentArr() }, [discoveryId]);

    const createNewComment = (newComment) => {
        //console.log(commentsArr)
        let newCommentsArr = [...commentsArr, newComment]
        const requestBody = { comments: newCommentsArr };
        const storedToken = localStorage.getItem('authToken');
        axios
            .put(`${process.env.REACT_APP_API_URL}/api/discoveries/edit/${discoveryId}`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((res) => {
                //console.log("comment is created")
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

    const divStyle = {
        background: ' rgba(239, 245, 250, 0.9)',
        minHeight: '90vh',
        width: '55vw',
        position: 'absolute',
        top: '-5vh',
        right: '0vw'
    }
    const divInLoopStyle = {
        width: '30vw',
        height: '3em',
        padding: '1em',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'row'
    }
    const formStyle = {
        width: '50vw',
        position: 'absolute',
        bottom: '10vh'
    }
    return (
        <div className="m-5" style={divStyle}>
            <div className="input-group ms-5 ps-5" >

                {commentsArr && commentsArr.map((comment, index) => {
                    return (
                        <div key={index} style={divInLoopStyle}>
                            <h5 className="me-5">
                                {comment.author?.name}
                            </h5>
                            <p>{comment.content}</p>
                        </div>
                    )
                })}

            </div>

            <div>
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
                        onChange={(event) => { setContent(event.target.value) }}
                    ></textarea>
                    <button type="submit">Comment</button>
                </form>
            </div>
        </div>
    )
}