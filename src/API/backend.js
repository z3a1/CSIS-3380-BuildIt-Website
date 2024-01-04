const snoowrap = require("snoowrap")
const express = require("express")
const axios = require("axios")
const mongoose = require("mongoose")
const app = express();
const bodyParser = require("body-parser")
const User = require("./Schemas/user").UserSchema
const Report = require("./Schemas/report").ReportSchema
const Post = require("./Schemas/post").PostSchema
const Support = require("./Schemas/support").SupportSchema
app.use(express.urlencoded({extended : true}))
app.use(express.json());
const path = require("path")
require('dotenv').config({path: path.resolve(__dirname, '../../.env')})
const cors = require("cors");
app.use(cors());
const Static = path.join(__dirname, 'adminfolder')
console.log(Static)
app.use(express.static(Static))

app.listen(5000,(req,res) => {
    console.log("Reddit.Js Has been called")
    console.log("Up On Port 5000")
})

app.get("/",(req,res) => {
    res.sendFile(__dirname + "/adminpanel.html")
})


app.get("/addUser", (req,res) => {
    res.sendFile(__dirname + '/adduser.html')
})

app.get("/appendUser", (req,res) => {
    res.sendFile(__dirname + "/appenduser.html")
})

app.get("/generatePosts", (req,res) => {
    res.sendFile(__dirname + "/updateposts.html")
})

const youtube = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        maxResults: 1,
        key: process.env.REACT_APP_YOUTUBE_KEY
    }
})


const r = new snoowrap({
    userAgent: 'Get Reddit Posts with Images',
    clientId: process.env.REACT_APP_REDDIT_ID,
    clientSecret: process.env.REACT_APP_REDDIT_KEY,
    username: "Derponius",
    password: process.env.REACT_APP_REDDIT_PW
});

app.get("/api/redditFeed", (req,res) => {
    r.getSubreddit('pcmasterrace').getHot().then(data => {
        res.json(data)
    })
})

app.get("/api/getCategories", (req,res) => {

    r.getSubreddit('pcmasterrace').getHot().then(data => {
            res.json(data)
    })
})

app.get("/api/getFAQ", async (req, res) => {
    await r.getSubreddit('buildapc').getRising().then(data => {
        let connect = mongoose.createConnection("mongodb://localhost:27017/UserPostsDB")
        let postDocument = connect.model('Post', Post)
        data.forEach(async (e,index) => {
            let Title = e.title
            let User = e.author.name
            let Description = e.selftext
            let Votes = e.ups
            let PostID = e.id
            let newPost = new postDocument({
                Title : Title,
                User : User,
                Description : Description,
                Votes : Votes,
                Tag : PostID
            })
            newPost.save((err) => {
                if(err) res.send(err)
            })
        })
        data.forEach(async (e,index) => {
            try{
                let Comment = await r.getSubmission(e.id).expandReplies({limit : 5, depth : 0})
                .then(data => {return data})
                let CommentArr = [];
                Comment.comments.forEach((e,index) => {
                    let CommentItem = {User : e.author.name , Votes : e.ups, Body : e.body}
                    CommentArr.push(CommentItem)
                })
                postDocument.updateOne({Tag : e.id}, {Comments : CommentArr},(err) => {
                    if(err) res.send(err)
                })
            }
            catch(err)
            {
                res.send(err)
            }
        })
        res.send({status : 200 , message : "Posts have been saved!"})
        mongoose.connection.close()
    })
})

app.get("/api/ClearPosts", (req,res) => {
    try{
    let connect = mongoose.createConnection("mongodb://localhost:27017/UserPostsDB")
    let postDocument = connect.model('Post', Post)
    postDocument.deleteMany({}, (err) => {
        if(err) res.send({status: 401, message : err})
        else res.send({status: 200, message: "Succesfully cleared Posts!"})
    })}
    catch(err)
    {
        res.send({status: 404, message : "Couldn't load the Database!"})
    }
})

app.get("/api/getBuilds", (req,res) => {
    r.getSubreddit('battlestations').getTop({time : "all"}).then(data => res.json(data))
})

app.get("/api/getPosts" , (req,res) => {
    let connect = mongoose.createConnection("mongodb://localhost:27017/UserPostsDB")
    let postDocument = connect.model('Post', Post)
    postDocument.find({},(err,result) => {
        if(err) res.send(err)
        else res.json(result)
    })
    mongoose.connection.close()
})

app.get("/api/getReports" , (req,res) => {
    let connect = mongoose.createConnection("mongodb://localhost:27017/ReportsDB")
    let ReportDocument = connect.model('Report', Report)
    ReportDocument.find({}, (err, result) => {
        if(err) res.send(err)
        else res.json(result)
    })
})

app.get("/api/getSupportForm", (req,res) => {
    let connect = mongoose.createConnection("mongodb://localhost:27017/SupportDB")
    let supportDocument = connect.model('Support', Support)
    supportDocument.find({}, (err,result) => {
        if(err) res.send(err)
        else res.json(result)
    })

})

app.get("/api/getUsers", (req,res) => {
    let connect = mongoose.createConnection("mongodb://localhost:27017/UserDB")
    let userDocument = connect.model('User',User)
    userDocument.find({}, (err, result) => {
        if(err) res.send(err)
        else res.json(result)
    })
    mongoose.connection.close()
})

app.post("/api/UpdateComment", (req,res) => {
    let {Tag, Comments} = req.body
    console.log(Comments)
    let connect = mongoose.createConnection("mongodb://localhost:27017/UserPostsDB")
    let postDocument = connect.model('Post', Post)
    postDocument.findOneAndUpdate({Tag : Tag},{Comments : Comments},(err,result) => {
        if(err) res.send({status: 401, message : "Could not update the comment!"})
        else res.json({status : 200 , message : "Success!"})
    })
})

app.post("/api/UpVote", (req,res) => {
    let {Comments,Username} = req.body
    console.log(req.body.Comments)
    let connect = mongoose.createConnection("mongodb://localhost:27017/UserPostsDB")
    let postDocument = connect.model('Post', Post)
    postDocument.findOneAndUpdate({Username : Username},{Comments : Comments},(err) => {
        if(err) res.send({status : 400, message : "Nope"})
        else res.send({status : 200, message : "Yes"})
    })
    mongoose.connection.close()
})

app.post("/api/redditFeed/getComments", (req,res) => {
    let id = req.body.id
    try{
        r.getSubmission(id).expandReplies({limit: 5, depth: 0}).then(data => res.json(data))
    }
    catch(err)
    {
        res.send(err)
    }
})


app.post("/api/register", async (req,res) => {
    let {Username,Password,Email} = req.body
    console.log("Adding User...")

    let connect = mongoose.createConnection("mongodb://localhost:27017/UserDB")
    let userDocument = connect.model('User', User)
    console.log(userDocument)

    userDocument.findOne({Username : Username},(err,name) => {
        if(!name || err)
        {
            userDocument.findOne({Password : Password},(err,pass) => {
                if(!pass || err)
                {
                    userDocument.findOne({Email : Email},(err,email) => {
                        if(!email || err)
                        {
                            let newUser = new userDocument({Username : Username , Password : Password, Email : Email})
                            newUser.save((err) => {
                                if(err) res.send({status: 404,error : "Error! There has been a issue with registering your account!"})
                                else res.send ({status : 200})
                                mongoose.connection.close();
                            })
                        }else{res.send({status: 402, error: "Error! The email is already attached to an account!"})}})
                }else{res.send({status: 401, error: "Error! The password is already in use, would you like to sign instead?"})}})
        }else{res.send({status: 400, error: "Error! The username is already attached to an account!"})}})
    mongoose.connection.close();
})

app.post("/api/login", async (req,res) => {
    console.log(req.body)
    let documentFound = false;
    try{
        let connect = mongoose.createConnection("mongodb://localhost:27017/UserDB")
        let userDocument = connect.model('User', User)
        userDocument.findOne({Username : req.body.Username},(err,user) => {
            if(err || !user)
            {
                console.log(`Error! Cannot Find!`)
                res.json({UserFound : documentFound, error : "Cannot Find the Username!"})
                mongoose.connection.close();
            }
            else
            {
                console.log(`Found!`)
                if(req.body.Password === user.Password)
                {
                    console.log("Correct Password!")
                    documentFound = true;
                    res.json({passwordstatus : documentFound, error : ""})
                }
                else
                {
                    console.log("Error!")
                    res.json({passwordstatus : documentFound ,error : "Invalid Password! Please Try Again Later"})
                }
                mongoose.connection.close();
            }
        })
    }
    catch(err)
    {
        console.log(`Unable to connect to internet. \n Reason: ${err}`)
        mongoose.connection.close()
    }
})

app.post("/api/loadUserInfo", async (req,res) => {
    if(req.body)
    {
        let {Username} = req.body
        try
        {
            let connect = mongoose.createConnection("mongodb://localhost:27017/UserDB")
            let userDocument = connect.model('User',User)
            userDocument.findOne({Username : Username},(err,result) => {
                if(!result || err)
                {
                    res.send({status: 401 , error: "Could not find the user!"})
                }
                else
                {
                    res.send({status: 200, data : result})
                }
            })
            mongoose.connection.close();
        }
        catch(err)
        {
            res.send({status: 400 , error : err})
            mongoose.connection.close();
        }

    }
    else
    {
        res.send({status: 404, error: "Could not load user!"})
    }
})

app.post("/api/sendReport", async (req,res) => {
    if(req.body)
    {
        let {User,Reason} = req.body
        console.log(User)
        let connect = mongoose.createConnection("mongodb://localhost:27017/ReportsDB")
        let ReportDocument = connect.model('Report', Report)
        try
        {
            let newReport = new ReportDocument({User : User, Reason : Reason})
            console.log(newReport)
            newReport.save((err, result) => {
                if(err)
                {
                    console.log("Message Not Sent")
                    res.send(err)
                    mongoose.connection.close()
                }
                else
                {
                    console.log(result)
                    res.send({status : 200 , response : "Sent!"})
                    mongoose.connection.close()
                }
            })
        }
        catch(err)
        {
            console.log("Err1")
            res.send(err)
            mongoose.connection.close()
        }
    }
    else
    {
        res.send({status : 400, message : "not sent!"})
    }
})

app.post("/api/SendSupportForm", (req,res) => {
    if(req.body)
    {
        let {Fname, Lname, PhoneNum} = req.body
        let connect = mongoose.createConnection("mongodb://localhost:27017/SupportDB")
        let supportDocument = connect.model('Support', Support)
        let newSupportForm = new supportDocument({FirstName : Fname , LastName : Lname , PhoneNumber : PhoneNum })
        newSupportForm.save((err) => {
            if(err) res.send({status : 407 , message : err})
            else
            {
                mongoose.connection.close()
                res.send({status : 200 , message : "Ticket has been sent!"})
            }
        })

    }
    else
    {
        mongoose.connection.close()
        res.send({status : 400, message : "Unable to send the ticket!"})
    }
})

app.post("/api/ChangeUsername", (req,res) => {
    console.log(req.body)
    if(req.body)
    {
        let {Username,newUsername} = req.body
        let connect = mongoose.createConnection("mongodb://localhost:27017/UserDB")
        let userDocument = connect.model('User',User)
        if(Username)
        {
            userDocument.findOneAndUpdate({Username : Username} ,{Username : newUsername}, (err) => {
                if(err) {
                    res.send({status : 406, message : err}) 
                    mongoose.connection.close()}
                else{
                    res.send({status : 200, message : "The data has been updated!"})
                    mongoose.connection.close()
                }
            })
        }
        else{res.send({status : 405 , message : "The username entered is invalid!"})}
    }
    else{res.send({status: 404, message : "Could not get the data!"})}
})

app.post("/api/ChangeEmail", (req,res) => {
    console.log(req.body)
    if(req.body){
        let connect = mongoose.createConnection("mongodb://localhost:27017/UserDB")
        let userDocument = connect.model('User',User)
        let {Email, newEmail} = req.body
        if(Email)
        {
            userDocument.findOneAndUpdate({Email : Email}, {Email : newEmail}, (err) => {
                if(err){
                    res.send({status : 406, message : err})
                }
                else
                {
                    res.send({status : 200, message : "The data has been updated!"})
                }
            })
        }
        else{res.send({status : 405, message : "The email could not be updated!"})}
    }
    else{
        res.send({status: 404, message : "Could not get the data!"})
    }
})

app.post("/api/ChangePassword", (req,res) => {
    console.log(req.body)
    {
        let connect = mongoose.createConnection("mongodb://localhost:27017/UserDB")
        let userDocument = connect.model('User',User)
        let {Password, newPassword} = req.body
        if(Password)
        {
            userDocument.findOneAndUpdate({Password : Password}, {Password : newPassword}, (err) => {
                if(err) res.send({status : 409, message : err})
                else res.send({status: 200, message : "Password has been updated!"})
            })
        }
        else{res.send({status : 408, message : "The Password could not be updated!"})}
    }
})

app.post("/api/DeleteUser", (req,res) => {
    console.log(req.body)
    if(req.body)
    {
        let connect = mongoose.createConnection("mongodb://localhost:27017/UserDB")
        let userDocument = connect.model('User',User)
        let {Username} = req.body
        if(Username)
        {
            userDocument.findOneAndDelete({Username : Username}, (err,result) => {
                if(err) res.send({status : 400, message : "Couldn't find the user!"})
                else res.send({status : 200, message : `Deleted: ${Username}!`})
            })
        }
        else res.send({status : 401, message : "Error! Could not find the user!"})
    }
    else
    {
        res.send({status : 400, message : "Something's wrong with the connection!"})
    }
    mongoose.connection.close()
})

app.post("/api/DeleteReport", (req,res) => {
    let connect = mongoose.createConnection("mongodb://localhost:27017/ReportsDB")
    let ReportDocument = connect.model('Report', Report)
    if(req.body)
    {
        let {ReportedUser} = req.body
        ReportDocument.findOneAndDelete({ReportedUser : ReportedUser}, (err,result) => {
            if(err) res.send({status : 400, message : "Couldn't find the Report!"})
            else res.send({status : 200, message : `Resolved Report with: ${Username}!`})
        })
    }
    else
    {
        res.send({status : 400, message : "Something's wrong with the connection!"})
    }
    mongoose.connection.close()
})

app.post("/api/DeleteSupportTicket", (req,res) => {

})

app.post("/api/redditFeed/getCategory",(req,res) => {
    let Category = req.body.title
    if(Category == "Hot")
    {
        r.getSubreddit('pcmasterrace').getHot().then(data => {res.json(data)})
    }
    else if(Category == "New")
    {
        r.getSubreddit('pcmasterrace').getNew().then(data => {res.json(data)})
    }
    else if(Category == "Top")
    {
        r.getSubreddit('pcmasterrace').getTop({time : "week"}).then(data => {res.json(data)})
    }
    else if(Category == "Rising")
    {
        r.getSubreddit('pcmasterrace').getRising().then(data => {res.json(data)})
    }

})

app.post("/api/YouTubeFeed", (req,res) => {
    let Title = (req.body)
    console.log(Title.title)
    try
    {
        const response = youtube.get('/search', {
            params : {
                q : `How to install ${Title.title}`
                
            }
        })
        .then(response => {
            res.send(response.data.items)})
    }
    catch(err)
    {
        console.log(err)
    }
})