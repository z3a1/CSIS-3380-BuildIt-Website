import NavBar from "../JSX Components/navbar";
import "../css components/customersupport.css";
import { useState } from "react";
import {FaInstagram, FaPhoneAlt, FaMailBulk, FaTwitter, FaYoutube} from "react-icons/fa";
import Popup from "reactjs-popup";

const CustomerSupport = () => {
    let[Fname,SetFname] = useState('')
    let[Lname,SetLName] = useState('')
    let[PhoneNum,setPhoneNum] = useState('')
    let[ResultMessage,setMessage] = useState('')
    let[MessageFlag,setFlag] = useState(false)

    const sendSupportForm = async () => {
        await fetch("http://localhost:5000/api/SendSupportForm",{
            method : 'POST',
            body : JSON.stringify({
                Fname : Fname,
                Lname : Lname,
                PhoneNum : PhoneNum,
            }),
            mode: 'cors',
            headers: {'Content-Type' : 'application/json'}
        }).then(res => res.json())
        .then(data => {
            setMessage(data.message)
            setFlag(true)
        })
    }

    return ( 
        <div className = "Customer-Page-Wrapper">
            <NavBar/>
            <h1 className = "Message-Text">Send Us Your Contact Information and we will get back to you!</h1>
            <Popup open = {MessageFlag} onClose = {() => setFlag(false)}>
                <h4>{ResultMessage}</h4>
            </Popup>
            <div className = "Support-Main-Body">
                <div className = "Info-Form-Container">
                    <form className = "Info-Form">
                        <h3 className = "Label">First Name:</h3>
                        <input className = "FName" type = "text" placeholder="Bob" onBlur={e => SetFname(e.target.value)}></input>
                        <h3 className = "Label">Last Name:</h3>
                        <input className = "LName" type = "text" placeholder="Smith" onBlur={e => SetLName(e.target.value)}></input>
                        <h3 className = "Label">Phone Number:</h3>
                        <input className = "PhoneNum" type = "text" placeholder="123-456-7890" onBlur={e => setPhoneNum(e.target.value)}></input>
                        <button type = "button" className = "Submit-Button" onClick = {sendSupportForm}>Submit</button>
                    </form>
                </div>
                <div className = "Contact-Container">
                    <h3 className ="Contact-Label">Contact Us!</h3>
                    <div className = "Icon-Text-Container">
                        <FaPhoneAlt size = {50}/>
                        <h4>+1-123-456-7890</h4>
                        <FaMailBulk size = {50}/>
                        <h4>BuildITServices@Outlook.com</h4>
                        <FaInstagram size = {50}/>
                        <h4>@BuildIT</h4>
                        <FaTwitter size = {50}/>
                        <h4>@BuildITCustomerService</h4>
                        <FaYoutube size = {50}/>
                        <h4>BuildIT</h4>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default CustomerSupport;