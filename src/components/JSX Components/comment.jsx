import ButtonRow from "./buttonrow";
import "../css components/comment.css"

const Comment = ({username,comment,childIndex,replies,votes,testFunc=f=>f,upVoteComment=f=>f,downVoteComment=f=>f}) => {
    //TODO Get All Children Comments

    return (
        <> 
            <div className = "Comment-Container">
                <h3>{username}</h3>
                <p>{comment}</p>
                <ButtonRow votes = {votes} 
                testFunc = {() => testFunc(username)}
                upVoteComment = {(votes,username) => upVoteComment(votes,username)}
                downVoteComment = {(votes,username) => downVoteComment(votes,username)}/>
            </div>
            {replies.length > 0 && replies.map((e,index) => {
                return(<div className = "Child-Comment-Container" key = {index + Math.random()}>
                    <h3 key = {index + Math.random()}>{e.author}</h3>
                    <p key = {index + Math.random()}>{e.body}</p>
                    <ButtonRow votes = {e.ups} key = {index + Math.random()} 
                    testFunc = {() => testFunc(e.author)}
                    upVoteComment = {(votes) => upVoteComment(votes,e.author)}
                    downVoteComment = {(votes) => downVoteComment(votes,e.author)}/>
                </div>)
            })}
        </>
     );
}
 
export default Comment;