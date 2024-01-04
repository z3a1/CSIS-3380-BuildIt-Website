import { IoThumbsUpOutline, IoThumbsUpSharp, IoThumbsDownOutline, IoThumbsDownSharp } from "react-icons/io5";
import {SiGooglechat} from "react-icons/si";
import { useState } from "react";
import "../css components/votesection.css"

const VotePost = (content) => {
    let[currentVotes,setVotes] = useState(content.ups);
    let[isUpvoted,setUpvoted] = useState(false);
    let[isDownvoted,setDownVoted] = useState(false);
    function upVote()
    {
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

    function downVote()
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

    return ( 
        <table>
            <tbody className = "Post-Info-Table">
                    <tr>
                        <td>
                            <span className = "UpVote"
                            onClick = {upVote}>
                                {isUpvoted ? <IoThumbsUpSharp size = {20}/> : <IoThumbsUpOutline size = {20}/>}
                            </span>
                        </td>
                        <td>
                            <span className = "DownVote"
                            onClick = {downVote}>
                                {isDownvoted ? <IoThumbsDownSharp size = {20}/> : <IoThumbsDownOutline size = {20}/>} 
                            </span>
                        </td>
                        <td>
                            <span className = "Comments">
                                <SiGooglechat/>
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td><p className="UpVote-Counter">{currentVotes}</p></td>
                    </tr>
            </tbody>
        </table>
     );
}
 
export default VotePost;