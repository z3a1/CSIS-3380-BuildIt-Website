import { IoThumbsUpOutline, IoThumbsUpSharp, IoThumbsDownOutline, IoThumbsDownSharp } from "react-icons/io5";
import { useState } from "react";
import "../css components/buttonrow.css"

const ButtonRow = ({isFAQ,testFunc=f=>f,votes,upVoteComment=f=>f,downVoteComment=f=>f}) => {
    let[currentVotes,setVotes] = useState(votes);
    let[isUpvoted,setUpvoted] = useState(false);
    let[isDownvoted,setDownVoted] = useState(false);

    function upVote()
    {
        if(typeof isFAQ === "boolean")
        {
            console.log("Yes")
            if(!isUpvoted)
            {
                setVotes(currentVotes + 1)
                setUpvoted(true)
                setDownVoted(false)
                upVoteComment(currentVotes + 1,undefined)
            }
            else
            {
                setVotes(currentVotes - 1)
                setUpvoted(false)
                upVoteComment(currentVotes - 1,undefined)
            }
        }
        else
        {
            console.log("No")
            if(!isUpvoted)
            {
                setVotes(currentVotes + 1)
                setUpvoted(true)
                setDownVoted(false)
            }
            else
            {
                setVotes(currentVotes - 1)
                setUpvoted(false)
            }
        }
    }

    function downVote()
    {
        if(typeof isFAQ === "boolean")
        {
            if(!isDownvoted)
            {
                setVotes(currentVotes - 1)
                setDownVoted(true)
                setUpvoted(false)
                downVoteComment(currentVotes - 1,undefined)
            }
            else
            {
                setVotes(currentVotes + 1)
                setDownVoted(false)
                downVoteComment(currentVotes + 1,undefined)
            }
        }
        else
        {
            if(!isDownvoted)
            {
                setVotes(currentVotes - 1)
                setDownVoted(true)
                setUpvoted(false)
            }
            else
            {
                setVotes(currentVotes + 1)
                setDownVoted(false)
            }
        }
    }

    return ( 
        <div className = "Button-Container">
            <button className = "Button" onClick={upVote}>{isUpvoted ? <IoThumbsUpSharp/> : <IoThumbsUpOutline/>} <span>Like {currentVotes}</span></button>
            <button className = "Button" onClick={downVote}>{isDownvoted ? <IoThumbsDownSharp/> : <IoThumbsDownOutline/>} Dislike</button>
            <button className = "Button" onClick = {testFunc}>Report ⚠️</button>
        </div>
     );
}
 
export default ButtonRow;