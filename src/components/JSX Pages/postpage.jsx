import { useParams,useLocation } from "react-router-dom";
import NavBar from "../JSX Components/navbar";
import "../css components/postpage.css"
import Comment from "../JSX Components/comment";
import { useEffect,useState } from "react";
import Popup from "reactjs-popup";

const PostPage = () => {

    const {Username} = useParams();
    const[currentComments, setComments] = useState([]);
    const[loading,isLoading] = useState(true);
    const[reportPopUp,setReportPopUp] = useState(false);
    const[ReportedUser,SetReportedUser] = useState('');
    const[ReportReason,SetReportReason] = useState('');
    const[isReportSent,setReportSent] = useState(false);
    const[ErrorMessage,setErrorMessage] = useState('')
    const[newComment, setnewComment] = useState('')
    let testValue = useLocation().state;
    let content = testValue.TestContent

    useEffect(() => {
        const getComments = async () => {
            await fetch("http://localhost:5000/api/redditFeed/getComments", {
                method: 'POST',
                body: JSON.stringify({
                    id : content.id
                }),
                headers: {'Content-Type' : 'application/json'},
            })
            .then(res => res.json())
            .then(data => setComments(data.comments))
            isLoading(false)
        }
        getComments()
    },[])

    const closePopup = (event) => {
        setReportPopUp(false)
    }

    const closeReportPopUp = () => {
        setReportSent(false)
        setReportPopUp(false)
    }

    const addComment = (e) => {
        console.log(newComment)
        let newCommentBody = {
            author: Username,
            body : newComment,
            ups : 1,
            replies : []
        }
        let updateComments = [...currentComments];
        updateComments.push(newCommentBody)
        console.log(updateComments)
        setComments(updateComments)
    }

    const sendReport = async (event) => {
        event.preventDefault()
        await fetch("/api/sendReport", {
            method: 'POST',
            body: JSON.stringify({
                User : ReportedUser,
                Reason : ReportReason
            }),
            mode : "cors",
            headers : {'Content-Type' : 'application/json'}
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.status !== 200)
            {
                setReportSent(true)
                setErrorMessage("Error! Could not send the message")
            }
            else
            {
                setReportSent(true)
                setErrorMessage("Report sent sucesfully")
            }
        })
    }

    return ( 
        <div>
            <NavBar/>
            <div className = "Content-Wrapper">
                <div className = "Post-Content-Wrapper">
                    <h1 className = "Post-Title">{content.title}</h1>
                    {content.HasImage ?  <> </> : <img src = {content.img} width = {400} height = {400} alt = " " className = "Img-Post"/>}
                    <p className = "Post-Content"></p>
                </div>
                <div className = "Create-Comment-Section">
                    <p className = "Prompt-Label">Type your Comments Below</p>
                    <textarea className = "Comment-Entry-Box" placeholder="Start Typing..." onBlur={(e) => setnewComment(e.target.value)}/>
                    <button className = "Submit-Comment" onClick={addComment}>Comment</button>
                </div>
                <Popup open = {reportPopUp}position = "center center" onClose={e => closePopup(e)}>
                    <form className = "Report-Form">
                        <h4>Report: {ReportedUser}</h4>
                        <label className = "Reason-Label">Reason?</label>
                        <textarea className = "Reason-Input" type = "text" onBlur={e => SetReportReason(e.target.value)}/>
                        <button className = "Report-Button" onClick={sendReport}>Report User</button>
                        <button type = "button" onClick = {e => closePopup(e)} className = "Cancel-Button">Cancel Report</button>
                    </form>
                    <Popup open = {isReportSent} onClose = {closeReportPopUp}position = "center center">
                        <h4>{ErrorMessage}</h4>
                        <button className = "Cancel-Button" onClick = {closeReportPopUp}>Close</button>
                    </Popup>
                </Popup>
                <div className = "Comment-Section">
                    <p className = "Comment-Label">Comments</p>
                    <hr style = {{border: "5px solid #FFFFFF", width: "1439px", marginLeft: "0px", borderRadius: "5px"}}></hr>
                    <div className = "Comment-List">
                        {loading && <h1 style = {{color: "white"}}>Loading...</h1>}
                        {currentComments.map((e,index) => {
                            return(<Comment username = {e.author} comment = {e.body} key = {index + Math.random()} childIndex = {index} replies = {e.replies} votes = {e.ups} 
                            testFunc = {(e) => {
                                if(e !== "[deleted]")
                                {
                                    SetReportedUser(e)
                                    setReportPopUp(true)
                                }
                            }}
                            />)
                        })}
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default PostPage;