import NavBar from "../JSX Components/navbar";
import "../css components/usersettings.css"
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";

const UserSettings = () => {

    let {Username} = useParams();
    let navigate = useNavigate();

    const[currentUser, setUser] = useState(Username)
    const[userEmail, setUserEmail] = useState('')
    const[changeUserFlag,setUserFlag] = useState(false)
    const[changeEmailFlag,setEmailFlag] = useState(false)
    const[newUser, setnewUser] = useState('')
    const[newEmail, setnewEmail] = useState('')

    useEffect(() => {
        let getUserData = async () => {
            await fetch("http://localhost:5000/api/loadUserInfo", {
                method : 'POST',
                mode : 'cors',
                body : JSON.stringify({Username : Username}),
                headers : {'Content-Type' : 'application/json'}
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                let GetUser = data.data.Username
                let GetEmail = data.data.Email
                setUser(GetUser)
                setUserEmail(GetEmail)
            })
        }

        getUserData()
    },[])

    //TODO: Update User Data

    let ChangeUsername =  async () => {
        await fetch("/api/ChangeUsername", {
            method : 'POST',
            mode : 'cors',
            body : JSON.stringify({Username : Username, newUsername : newUser}),
            headers : {'Content-Type' : 'application/json'}
        })
        .then(res => res.json())
        .then(data => {
            if(data.status === 200){ 
                setUser(newUser)
                setUserFlag(false)
                navigate(`/UserSettings/${newUser}`)
            }
        })
    }

    let ChangeEmail = async() => {
        await fetch("/api/ChangeEmail", {
            method : 'POST',
            mode : 'cors',
            body : JSON.stringify({Email : userEmail, newEmail : newEmail}),
            headers : {'Content-Type' : 'application/json'}
        })
        .then(res => res.json())
        .then(data => {
            if(data.status === 200){
                setnewEmail(newEmail)
                setEmailFlag(false)
                navigate(`/UserSettings/${newUser}`)
            }
        })
    }
    

    return ( 
        <>
            <NavBar/>
            <div className = "User-Settings-Wrapper">
            <Popup open = {changeUserFlag} onClose = {() => setUserFlag(false)}>
                <form>
                    <h4>Change Username: </h4>
                    <label>New Username: </label>
                    <input type = "text" onBlur={e => setnewUser(e.target.value)}/>
                    <button type = "button" onClick = {ChangeUsername}>Submit Change</button>
                </form>
            </Popup>
            <Popup open = {changeEmailFlag} onClose = {() => setEmailFlag(false)}>
                <form>
                <h4>Change Email: </h4>
                    <label>New Username: </label>
                    <input type = "text" onBlur={e => setnewEmail(e.target.value)}/>
                    <button type = "button" onClick = {ChangeEmail}>Submit Change</button>
                </form>
            </Popup>
            <table>
                <tbody className = "User-Table">
                    <tr className = "Username-Data">
                        <td className  = "Label-Container"><p className = "Type-Label">Username: </p></td>
                        <td className = "User-Container"><p className = "Current-Data">{currentUser}</p></td>
                    </tr>
                    <tr>
                        <td><button className = "Change-Button" onClick={() => setUserFlag(true)}>Change Username</button></td>
                    </tr>
                    <tr className = "Email-Data">
                        <td className = "Label-Container"><p className = "Type-Label">Email: </p></td>
                        <td className = "User-Container"><p className = "Current-Data">{userEmail}</p></td>
                    </tr>
                    <tr>
                        <td><button className = "Change-Button" onClick = {() => setEmailFlag(true)}>Change Email</button></td>
                    </tr>
                </tbody>
            </table>
                
            </div>
        </>
     );
}
 
export default UserSettings;