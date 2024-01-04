import { useEffect, useState  } from "react";
import { useLocation, useParams } from "react-router-dom";
import NavBar from "../JSX Components/navbar";
import { Container, Content } from "rsuite";
import "../css components/faqpostpage.css"
import ButtonRow from "../JSX Components/buttonrow";
import Popup from "reactjs-popup";
import TextareaAutosize from 'react-textarea-autosize';

const FaqPost = () => {
    let postContent = useLocation().state
    const[reportPopUp,setReportPopUp] = useState(false);
    const[addCommentMsg,setCommentMsg] = useState('')
    const[addCommentFlag,setCommentFlag] = useState(false)
    const[ReportedUser,SetReportedUser] = useState('');
    const[ReportReason,SetReportReason] = useState('');
    const[isReportSent,setReportSent] = useState(false);
    const[ErrorMessage,setErrorMessage] = useState('')
    let[commentArray,setCommentArray] = useState([])
    let[newComment,setnewComment] = useState('')
    let {Username} = useParams()
    useEffect(() => {
        setCommentArray(postContent.content.Comments)
    },[])

    const sendReport = async (event) => {
        event.preventDefault()
        await fetch("http://localhost:5000/api/sendReport", {
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

    //TODO Update the actual votes in the DB

    const closePopup = (event) => {
        setReportPopUp(false)
    }

    const addComment = async () => {
        let newCommentBody = {
            User: Username,
            Body : newComment,
            Votes : 1,
            replies : []
        }
        let updateComments = [...commentArray];
        updateComments.push(newCommentBody)
        await fetch("http://localhost:5000/api/UpdateComment", {
            method : 'POST',
            body : JSON.stringify({
                Tag : postContent.content.Tag,
                Comments : updateComments
            }),
            mode : 'cors',
            headers : {'Content-Type' : 'application/json'}
        }).then(res => res.json())
        .then(data => {
            if(data.status !== 200)
            {
                setCommentMsg(data.message)
                setCommentFlag(true)
            }
            else
            {
                setCommentMsg(data.message)
                setCommentArray(updateComments)
                setCommentFlag(true)
            }
        })
    }

    const closeReportPopUp = () => {
        setReportSent(false)
        setReportPopUp(false)
    }

    const upVote = async(Votes,Username) => 
    {
        console.log(Username)
        let commentIndex = commentArray.find(comment => comment.User === Username)
        console.log(commentIndex)
        commentIndex.Votes = Votes
        console.log(commentArray)
        await fetch("http://localhost:5000/api/UpVote", {
            method : 'POST',
            body : JSON.stringify({Username : postContent.content.User , Comments : commentArray}),
            mode : "cors",
            headers : {'Content-Type' : 'application/json'}
        })
    }

    return ( 
        <>
            <NavBar/>
            <Container className = "Post-Wrapper">
                <Content className = "Post-Content">
                    <h4 className = "Post-Title">{postContent.content.Title}</h4>
                    <Content className = "Post-Description">
                        <h5>By: {postContent.content.User}</h5>
                        <p>{postContent.content.Description}</p>
                    </Content>
                </Content>
            </Container>
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
            <Content className = "Create-Comment-Section">
                <h4 className = "Comment-Label">Enter a comment!</h4>
                <TextareaAutosize className = "Comment-Box" maxRows={5} placeholder ="Comment something!" onBlur={e => setnewComment(e.target.value)}/>
                <button className = "Submit-Comment" onClick={addComment}>Comment!</button>
            </Content>
            <Popup open = {addCommentFlag} close = {() => setCommentFlag(false)}>
                <h4>{addCommentMsg}</h4>
            </Popup>
            <Container className="Post-Comment">
                <Content className = "Comment-Section">
                        <h4 className = "Comment-Title">
                            <p className="Comment-Label">Comments:</p>
                        </h4>
                        <Container>
                        {commentArray.map((comment,index) => {
                            return(
                                <Content className = "Comment">
                                    <h5>{comment.User}</h5>
                                    <p>{comment.Body}</p>   
                                    <ButtonRow isFAQ = {true} votes = {comment.Votes} key = {index + Math.random()} 
                                    testFunc = {() => {
                                        if(comment.User !== "[deleted]")
                                        {
                                            SetReportedUser(comment.User)
                                            setReportPopUp(true)
                                        }
                                    }}
                                    upVoteComment = {(votes) => upVote(votes,comment.User)}
                                    downVoteComment = {(votes) => upVote(votes,comment.User)}
                                    />
                                </Content>
                            )
                        })}
                        </Container>
                </Content>
            </Container>
        </>
     );
}
 
export default FaqPost;