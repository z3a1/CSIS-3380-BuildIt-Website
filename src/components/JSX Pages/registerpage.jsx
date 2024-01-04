import "../css components/registerpage.css"
import BuildItLogo from "../../logos/BuildItLoginLogo.png"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const RegisterPage = ({setCurrentUser=f=>f}) => {
    const navigate = useNavigate();
    let[Username,setUsername] = useState('')
    let[Password,setPassword] = useState('')
    let[ConfirmPassword,isPasswordValid] = useState(false)
    let[Email,setEmail] = useState('')
    let[TOSAgree,setTOSAgree] = useState(false)
    let[ErrorMSG,setErrorMSG] = useState('')

    const validateInfo = (event) => {
        event.preventDefault()
        if(!TOSAgree)
        {
            return(
                <p>ERROR THE TOS HAS NOT BEEN CHECKED</p>
            )
        }
        else
        {
            fetch("http://localhost:5000/api/register", {
                method : 'POST',
                mode : 'cors',
                body : JSON.stringify({
                    Username : Username,
                    Password : Password,
                    Email : Email
                }),
                headers: {'Content-Type' : 'application/json'},
            }).then(res => res.json())
            .then(data => {
                if(data.status != 200)
                {
                    setErrorMSG(data.status.error)
                }
                else
                {
                    setCurrentUser(Username,Email)
                    navigate(`/MainPage/${Username}`)
                }
            })
        }
    }

    return ( 
        <div className = "Page-Wrapper">
            <div className = "Register-Page-Wrapper">
                <div className = "Logo-Wrapper">
                <img className = "Small-BuildIt-Logo" src = {BuildItLogo}/>
                </div>
                <form className = "Register-Form" onSubmit={validateInfo}>
                    <label>Username: </label>
                    <input required type = "text" onBlur={e => setUsername(e.target.value)}></input>
                    <label>Email: </label>
                    <input required type = "text" onBlur = {e => setEmail(e.target.value)}></input>
                    <label>Password: </label>
                    <input className = "Password-Input" required type = "password" onBlur={e => setPassword(e.target.value)}></input>
                    <label>Confirm Password: </label>
                    <input className = "Password-Input" required type = "password" onBlur = {e => {
                        let confirmPassword = e.target.value;
                        if(confirmPassword === Password)
                            isPasswordValid(true)
                        else
                            isPasswordValid(false)
                    }}></input>
                                        {ConfirmPassword && <p style = {{color: "green"}}>The passwords are matching</p>}
                    {!ConfirmPassword && <p style = {{color: "red"}}>Error! The passwords are not matching</p>}
                    <br/>
                    <input required type = "checkbox" name = "tos" onChange={() => setTOSAgree(true)}/>
                    <a>Do you agree with the policy?</a>
                    <button className = "Register-Button">Register</button>
                </form>
            </div>
        </div>
     );
}
 
export default RegisterPage;