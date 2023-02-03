//Calling packages
require('dotenv').config()
const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session  = require('express-session')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')
const _ = require('lodash')
const ___=require('lodash-contrib')


//Using express
const app = express()
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))

//Date
const actualDate = new Date()

//Setting session
app.use(session({
    secret : process.env.SECRET_CODE,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())


//Database connection
mongoose.set('strictQuery',false)
mongoose.connect('mongodb://127.0.0.1:27017/notepadDB',{
    useNewUrlParser : true,
    useUnifiedTopology: true
})
    //Schema

const noteSchema = new mongoose.Schema({
    title : String,
    date : {
        type : String,
        default : actualDate.toLocaleString()
    },
    content : String
})

const userSchema = new mongoose.Schema({
    username : String,
    password: String,
    notes : [noteSchema]
})
userSchema.plugin(passportLocalMongoose)

    //Model

const User = new mongoose.model('User',userSchema)
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

    //Gets

app.get('/',(req,res)=>{
    if(req.isAuthenticated()){
        res.redirect('/home')
    }else{
        res.render('login')
    }
})

app.get('/register',(req,res)=>{
    res.render('signup',{
        errormessage: ''
    })
})

app.get('/home',(req,res)=>{
    if(req.isAuthenticated()){
        User.findById(req.user.id,(err,found)=>{
            if(err){
                res.send(err)
            }else{
                if(found){
                    res.render('home',{
                        notes : found.notes
                    })
                }else{
                    res.render('home',{
                        notes : []
                    })
                }
            }
        })
    }else{
        res.redirect('/')
    }
})

app.get('/logout', function(req, res) {
    req.logout(function(err) {
      if (err) {console.log(err)}
      res.redirect('/');
    });
  });

app.get('/createnotes',(req,res)=>{
    if(req.isAuthenticated()){
        res.render('createNotes')
    }else{
        res.redirect('/')
    }
})

app.get('/options',(req,res)=>{
    if(req.isAuthenticated()){
        res.render('options')
    }else{
        res.redirect('/')
    }
})

app.get('/options/:type',(req,res)=>{
    if(req.isAuthenticated()){
        if(req.params.type == 'eraseAccount'){
            User.findByIdAndRemove(req.user.id,(err,user)=>{
                if(err){
                    res.send(err)
                }else{
                    console.log(user)
                    res.redirect('/home')
                }
            })
        }else if(req.params.type == 'eraseNotes'){
            User.findById(req.user.id,(err,user)=>{
                if(!err){
                    console.log(`Before erasing : ${user}`);
                    user.notes = []
                    console.log(`After erasing : ${user}`);
                    user.save()
                    res.redirect('/home')
                }
            })
        }
    }else{
        res.redirect('/')
    }
})

app.get

//Posts

app.post('/updateNote',(req,res)=>{
    if(req.isAuthenticated()){
        res.render('updateNote',{
            valueOfTitle : req.body.title,
            valueOfContent : req.body.content,
            id:req.body.id
        })
    }else{
        res.redirect('/')
    }
})

app.post('/',(req,res)=>{
    const user = new User({
        username : _.trim(req.body.username),
        password : req.body.password
    })

    req.login(user,(err)=>{
        if(err){
            console.log(err);
        }else{
            passport.authenticate('local', { failureRedirect: '/register', failureMessage: true })(req,res,()=>{
                res.redirect('/home')
            })
        }
    })
})

app.post('/register',(req,res)=>{
    User.register({username : _.trim(req.body.username)},req.body.password,(err,user)=>{
        if(err){
            res.render('signup',{
                errormessage : err.message
            });
        }else{
            passport.authenticate('local',{ failureRedirect: '/logout', failureMessage: true })(req,res,()=>{
                res.redirect('/home')
            })
        }
    })
})

app.post('/createnotes',(req,res)=>{
    if(req.isAuthenticated()){
        User.findById(req.user.id,(err,found)=>{
            if(err){
                res.send(err)
            }else{
                if(found){
                    found.notes.unshift({
                        title : req.body.title,
                        date : actualDate.toLocaleString(),
                        content : req.body.content
                    })
                    found.save()
                    res.redirect('/home')
                }else{
                    res.redirect('/createnotes')
                }
            }
        })
    }else{
        res.redirect('/')
    }
})

app.post('/deleteNote',(req,res)=>{
    if(req.isAuthenticated()){
        User.findById(req.user.id,(err,found)=>{
            if(err){
                res.send(err)
            }else{
                if(found){
                    const foundObj = found.notes.findIndex((obj)=>{
                        return obj.id == req.body.id
                    })
                    found.notes.splice(foundObj,1)
                    found.save()
                    res.redirect('/home')
                }else{
                    res.redirect('/home')
                }
            }
        })
    }else{
        res.redirect('/')
    }
})

app.post('/updateNote',(req,res)=>{
    if(req.isAuthenticated()){
        User.findById(req.user.id,(err,found)=>{
            if(err){
                res.send(err)
            }else{
                if(found){
                    const foundObj = found.notes.find((obj)=>{
                        return obj.id == req.body.id
                    })
                    console.log(`Note : ${foundObj}`)
                    foundObj.title = req.body.title
                    foundObj.content = req.body.content
                    foundObj.date = date.toLocaleString()

                    found.save()
                    res.redirect('/home')
                }else{
                    res.redirect('/home')
                }
            }
        })
    }else{
        res.redirect('/')
    }
})
app.post('/updateNote2',(req,res)=>{
    if(req.isAuthenticated()){
        User.findById(req.user.id,(err,found)=>{
            if(err){
                res.send(err)
            }else{
                if(found){
                    const foundObj = found.notes.find((obj)=>{
                        return obj.id == req.body.id
                    })

                    foundObj.title = req.body.title
                    foundObj.content = req.body.content
                    foundObj.date = actualDate.toLocaleString()

                    found.save()
                    res.redirect('/home')
                }else{
                    res.redirect('/home')
                }
            }
        })
    }else{
        res.redirect('/')
    }
})

app.post('/search',(req,res)=>{

    if(req.isAuthenticated()){
        User.findById(req.user.id,(err,found)=>{
            if(err){
                res.send(err)
            }else{
                if(found){
                    const foundArray = found.notes.filter((obj)=>{
                        return ___.strContains(_.toLower(_.trim(obj.title)),_.toLower(_.trim(req.body.search)))
                    })

                    if(foundArray.length!==0){
                        res.render('search',{
                            notes : foundArray
                        })
                    }else{
                        res.render('search',{
                            notes : [
                                {
                                    title: 'Nenhuma nota encontrada. Tente novamente!',
                                    content: '',
                                    date:''
                                }
                            ]
                        })
                    }
                }else{
                    res.redirect('/home')
                }
            }
        })
    }else{
        res.redirect('/')
    }

})



//Setting port
app.listen(8080,()=>{
    console.log('Server is up and running on port 8080');
})
