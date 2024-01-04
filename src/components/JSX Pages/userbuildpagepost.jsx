import NavBar from "../JSX Components/navbar";
import Comment from "../JSX Components/comment";
import { useLocation } from "react-router-dom";
import "../css components/userbuildpagepost.css"
import { useEffect,useState } from "react";
import Popup from "reactjs-popup";
import { FallingLines } from "react-loader-spinner";

const BuildPost = () => {

    let User = useLocation().state.content;
    const[currentComments, setComments] = useState([]);
    const[loading,isLoading] = useState(true);
    const[reportPopUp,setReportPopUp] = useState(false);
    const[ReportedUser,SetReportedUser] = useState('');
    const[ReportReason,SetReportReason] = useState('');
    const[isReportSent,setReportSent] = useState(false);
    const[ErrorMessage,setErrorMessage] = useState('')

    useEffect(()=> {
        const FetchComments = async () => {
            await fetch("http://localhost:5000/api/redditFeed/getComments", {
                method: 'POST',
                body: JSON.stringify({id : User.id}),
                headers: {'Content-Type' : 'application/json'},
            })
            .then(res => res.json())
            .then(data => setComments(data.comments))
            isLoading(false)
        }
        FetchComments()
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

    const closePopup = (event) => {
        setReportPopUp(false)
    }

    const closeReportPopUp = () => {
        setReportSent(false)
        setReportPopUp(false)
    }

    return ( 
        <>
            <NavBar/>
                <h1 className = "Component-Label">{User.author}'s Setup</h1>
                <div className = "User-Description">
                    <h3>Description: </h3>
                    <p>{User.title}</p>
                </div>
                <div className="Build-Image-Wrapper">
                    {loading && <FallingLines
                    color="#2195B9"
                    width="500"
                    visible={true}
                    ariaLabel='falling-lines-loading'
                    />}
                    {!loading && <img src = {User.url} className = "User-Build-Image"/>}
                </div>
                <h3 style = {{color: "white", textAlign: "center"}}>Comments</h3>
                <hr style = {{border: "5px white solid", marginLeft: "auto", marginRight: "auto", width: "80%"}}/>
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
                    {loading && <FallingLines
                    color="#2195B9"
                    width="500"
                    visible={true}
                    ariaLabel='falling-lines-loading'
                    />}
                    {!loading && currentComments.map((e,index) => {
                        return(
                            <Comment username = {e.author} comment = {e.body} key = {index + Math.random()} 
                            childIndex = {index} replies = {e.replies} votes = {e.ups}
                            testFunc = {(e) => {
                                if(e !== "[deleted]")
                                {
                                    SetReportedUser(e)
                                    setReportPopUp(true)
                                }
                            }}
                            />
                        )
                    })}
                </div>
        </>
     );
}
 
export default BuildPost;