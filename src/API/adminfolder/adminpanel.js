console.log("Working")



//TODO Set DB to delete, update or add here
let testFunc = async (event) => {
    console.log(event)
}

const setFormLabel = async () => {
    let Status = document.getElementById("ModeChange")
    let oldLabel = document.getElementById("OldData")
    let newLabel = document.getElementById("NewData")

    newLabel.innerText = `Update: ${Status.value}`
    oldLabel.innerText = `Change: ${Status.value}`
}

const DeleteUser = async (event) => {
    let output = document.getElementById("Result")
    await fetch("/api/DeleteUser", {
        method : 'POST',
        body : JSON.stringify({Username : event}),
        headers : {'Content-Type' : 'application/json'}
    })
    .then(res => res.json())
    .then(data => {
        if(data.status === 200) output.innerText = `Result: ${data.message}`
        else output.innerText = `Result ${data.message}`
    })
    document.getElementById("Result-List").innerHTML = ""
    getUsers();
}

const onUpdateDocument = async () => {
    let Status = document.getElementById("ModeChange").value
    let oldData = document.getElementById("OldForm").value
    let newData = document.getElementById("NewForm").value
    let output = document.getElementById("Result")
    let type = `new${Status}`
    switch(Status)
    {
        case "Username":
            await fetch("/api/ChangeUsername", {
                method : 'POST',
                body : JSON.stringify({Username : oldData , newUsername : newData}),
                headers : {'Content-Type' : 'application/json'}
            })
            .then(res => res.json())
            .then(data => {
                if(data.status === 200) output.innerText = `Result: ${data.message}`
                else output.innerText = `Result ${data.message}`
            })
            break;
        case "Email":
            await fetch("/api/ChangeEmail", {
                method : 'POST',
                body : JSON.stringify({Email : oldData , newEmail : newData}),
                headers : {'Content-Type' : 'application/json'}
            })
            .then(res => res.json())
            .then(data => {
                if(data.status === 200) output.innerText = `Result: ${data.message}`
                else output.innerText = `Result ${data.message}`
            })
            break;
        case "Password":
            await fetch("/api/ChangePassword", {
                method : 'POST',
                body : JSON.stringify({Password : oldData, newPassword : newData}),
                headers : {'Content-Type' : 'application/json'}
            }).then(res => res.json())
            .then(data => {
                if(data.status === 200) output.innerText = `Result: ${data.message}`
                else output.innerText = `Result ${data.message}`
            })
            break;
    }
    document.getElementById("Result-List").innerHTML = ""
    getUsers();
}

const getUsers = async () => {
    try{
    await fetch("/api/getUsers")
    .then(res => res.json())
    .then(data => {
        data.map((e,index) => {
            var tableBody = document.getElementById("Result-List")
            let UserRow = document.createElement("tr")
            let UsernameData = document.createElement("td")
            UsernameData.innerHTML = `<p>${e.Username}</p>`
            let UserpassData = document.createElement("td")
            UserpassData.innerHTML = `<p>${e.Password}</p>`
            let EmailData = document.createElement("td")
            EmailData.innerHTML = `<p>${e.Email}</p>`
            let DeleteButton = document.createElement("button")
            DeleteButton.innerText = "Delete User"
            DeleteButton.className = "btn btn-primary"
            DeleteButton.onclick = () => {DeleteUser(e.Username)}
            UserRow.appendChild(UsernameData)
            UserRow.appendChild(EmailData)
            UserRow.appendChild(UserpassData)
            UserRow.appendChild(DeleteButton)
            tableBody.appendChild(UserRow)
        })
    })
    }
    catch(err)
    {
        console.log(err)
    }
}

const getReports = async () => {
    try{
    await fetch("/api/getReports")
    .then(res => res.json())
    .then(data => {
        data.map((e,index) => {
            var tableBody2 = document.getElementById("Report-Result-List")
            let ReportRow = document.createElement("tr")
            let ReportData = document.createElement("td")
            let ReasonData = document.createElement("td")
            ReportData.innerHTML = `<p>${e.User}</p>`
            ReasonData.innerHTML = `<p>${e.Reason}</p>`
            let DeleteButton = document.createElement("button")
            DeleteButton.innerText = "Resolve Report"
            DeleteButton.className = "btn btn-primary"
            DeleteButton.onclick = () =>{testFunc(e.User)}
            ReportRow.appendChild(ReportData)
            ReportRow.appendChild(ReasonData)
            ReportRow.appendChild(DeleteButton)
            tableBody2.appendChild(ReportRow)

        })
    })}
    catch(err)
    {
        console.log(err)
    }
}

const getSupportForms = async () => {
    try{
    await fetch("/api/getSupportForm")
    .then(res => res.json())
    .then(data => {
        data.map((e,index) => {
            var tableBody3 = document.getElementById("Support-Result-List")
            let SupportRow = document.createElement("tr")
            let FnameData = document.createElement("td")
            FnameData.innerHTML = `<p>${e.FirstName}</p>`
            let LnameData = document.createElement("td")
            LnameData.innerHTML = `<p>${e.LastName}</p>`
            let EmailData = document.createElement("td")
            EmailData.innerHTML = `<p>${e.PhoneNumber}</p>`
            let DeleteButton = document.createElement("button")
            DeleteButton.innerText = "Resolve Form"
            DeleteButton.className = "btn btn-primary"
            DeleteButton.onclick = function () {testFunc(e.FirstName)}
            SupportRow.appendChild(FnameData)
            SupportRow.appendChild(LnameData)
            SupportRow.appendChild(EmailData)
            SupportRow.appendChild(DeleteButton)
            tableBody3.appendChild(SupportRow)
            
        })
    })}
    catch(err)
    {
        console.log(err)
    }
}

const submitDocument = async (event) => {
    event.preventDefault();
    let output = document.getElementById("Result-Label")
    try{
        let Username = document.getElementById("Username").value;
        let Password = document.getElementById("Password").value;
        let Email = document.getElementById("Email"). value;

        await fetch("/api/register", {
            method : 'POST',
            body : JSON.stringify({Username : Username, Password : Password , Email : Email}),
            headers : {'Content-Type' : 'application/json'}
        })
        .then(res => res.json())
        .then(data => {
            if(data.status === 200) output.innerHTML = "<p>Successfully Added!</p>"
            else output.innerHTML = "<p>Content Entered Already exsists in the DB!</p>"
        })
    }
    catch(err)
    {
        output.innerHTML = "<p>Caught an Error!</p>"
    }
}

const addNewPosts = async (event) => {
    event.preventDefault()
    let resultText = document.getElementById("Status")
    try{
        await fetch("/api/getFAQ")
        .then(res => res.json())
        .then(data => {
            if(data.status === 200) resultText.innerHTML = `<p>Status Response: ${data.message}</p>`
            else resultText.innerHTML = `<p>Status Response: ${data.message}</p>`
        })
    }
    catch(err){
        resultText.innerHTML = "<p>Status Response: Couldn't Access the Database!</p>"
    }
}

const deletePosts = async (event) => {
    event.preventDefault()
    let resultText = document.getElementById("Status")
    try{
        await fetch("/api/ClearPosts")
        .then(res => res.json())
        .then(data => {
            if(data.status === 200) resultText.innerHTML = `<p>Status Response: ${data.message}</p>`
            else resultText.innerHTML = `<p>Status Response: ${data.message}</p>`
        })
    }
    catch(err)
    {
        resultText.innerHTML = "<p>Status Response: Couldn't Access the Database!</p>"
    }
}


const checkPage = () => {
    if(document.body.classList.contains('main-panel')){
        getUsers()
        getReports()
        getSupportForms()
    }
}

checkPage()