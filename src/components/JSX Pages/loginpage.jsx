import "../css components/loginpage.css"
import BuildItLogo from "../../logos/BuildItLoginLogo.png"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = ({setCurrentUser=f=>f}) => {
    const navigate = useNavigate();
    const [Username, SetUsername] = useState('')
    const [Password, SetPassword] = useState('')
    const [Status,SetStatus] = useState(true)
    const [WrongInfo, SetWrongInfo] = useState('')

    let checkLogin = async (event) => {
        event.preventDefault()
        fetch("http://localhost:5000/api/login", {
            method : 'POST',
            mode : 'cors',
            body : JSON.stringify({
                Username : Username,
                Password : Password
            }),
            headers: {'Content-Type' : 'application/json'},
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.passwordstatus)
            if(data.passwordstatus === true)
            {
                setCurrentUser(Username)
                navigate(`/MainPage/${Username}`)
            }
            else
            {
                SetStatus(false)
                SetWrongInfo(data.error)
            }
        })
    }

    let goToRegsiterPage = () => {
        navigate("/Register")
    }

    return ( 
        <>
            <div className = "Login-Page-Wrapper">
                <label className = "Welcome-Label">Welcome to <p className = "Name-Label">Build it</p>!</label>
            </div>

            <table className = "Main-Content">
                <tbody>
                    <tr>
                    <td>
                        <div className = "Complete-Logo">
                            <img src = {BuildItLogo} className = "BuildItLogo"/>
                        </div>
                    </td>
                    <td>
                        <div className = "Login-Box">
                            <h1 className = "Login-Label">Login</h1>
                            <form onSubmit={checkLogin}>
                                <div className = "User-Box"><label>Username:</label><input 
                                type = "text" className = "Entry" onBlur = {e => SetUsername(e.target.value)}/></div>
                                <div className = "Pass-Box"><label>Password:</label><input 
                                type = "password" className = "Entry" onBlur={e => SetPassword(e.target.value)}/></div>
                                <br></br>
                                <button className = "Login-Button">Login</button>
                                {!Status && <h3 style = {{color : "red"}}>{WrongInfo}</h3>}
                                <h4 className = "Register-Label">New To Build-It?</h4>
                                <button className = "Register-Button" onClick = {() => navigate("/Register")}>Register</button>
                            </form>
                        </div>
                    </td>
                    </tr>
                </tbody>
            </table>
        </>
     );
}
 
export default Login;