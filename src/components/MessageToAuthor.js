import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

export default function MessageToAuthor(props) {
    const [messagesArr, setMessagesArr] = useState([]);
    const [message, setMessage] = useState("");
    const { user } = useContext(AuthContext)
    const [authorId, setAuthorId] = useState(user._id)
    const { secondHandGoodId } = useParams();
   console.log(props)

    //get prevComment and display them
    const getMessagesArr = () => {
        const storedToken = localStorage.getItem('authToken');
        axios.get(`${process.env.REACT_APP_API_URL}/api/secondHandGoods/${secondHandGoodId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(res => {
                console.log(res.data.messages)
                setMessagesArr(res.data.messages)
            })
            .catch((error) => console.log("error in getting messagesArr", error));
    }

    // eslint-disable-next-line
    useEffect(() => { getMessagesArr() }, [secondHandGoodId]);

    const createNewMessage = (newMessage) => {
        console.log(messagesArr)
        let newMessagesArr = [...messagesArr, newMessage]
        const requestBody = { messages: newMessagesArr };
        const storedToken = localStorage.getItem('authToken');
        axios
            .put(`${process.env.REACT_APP_API_URL}/api/secondHandGoods/edit/${secondHandGoodId}`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((res) => {
                console.log("message is created")
                getMessagesArr();
            })
            .then(() => console.log('Updating...'))
            .catch((error) => console.log("error in creating message", error));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newMessage = {
            "message": message,
            "author": authorId,
        };
        createNewMessage(newMessage);

        setMessage("")

    }

    const divStyle = {
        background: ' rgba(239, 245, 250, 0.9)',
        minHeight: '80vh',
        width: '54vw',
        position: 'absolute',
        top: '2vh',
        right: '0vw'
    }
    const divInLoopStyle = {
        width: '46vw',
        height: '2em',
        padding: '1.5em 1em 1em',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'row',
        marginTop:'1em',
        position:'relative'
        
    }
    const formStyle = {
        width: '50vw',
        position: 'absolute',
        bottom: '10vh'
    }
    const pInLoopStyle ={
        fontSize:'1.2em',
        width:'40vw',
        position:'absolute',
        left:'5em'
    }
    return (
        <div className="m-5" style={divStyle}>
            <div className="input-group ms-5 ps-5" >
           
                {messagesArr && messagesArr.map((message, index) => {
                    return (
                        props.object.author._id === user._id || message.author._id === user._id
                            ? <div key={index} style={divInLoopStyle}>
                                <h5 className="me-5">
                                    {message.author.name}
                                </h5>
                                <p style={pInLoopStyle}>{message.message}</p>
                            </div>
                            : null  
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
                        name="message"
                        value={message}
                        onChange={(event) => { setMessage(event.target.value) }}
                    ></textarea>
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    )
}