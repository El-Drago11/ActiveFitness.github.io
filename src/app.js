//configuring/connecting express
const express = require("express");
const path = require("path")
const app = express();
const hbs = require("hbs");

require("./db/connection");
const {Register,Buynow} = require("./models/register"); //{Register,Buynow}==> Importing schema
const { warn } = require("console");

//automatic port genration 
const port = process.env.PORT || 5001; //--> (either genrate the automatic port or 3000port )

//connection to the HTML page
const static_path = path.join(__dirname,"../public");
const template_path = path.join(__dirname,"../templates/views");
const partials_path = path.join(__dirname,"../templates/partials");

app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use(express.static(static_path))
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);

app.get("/",(req,res)=>{
    res.render("index");
})
app.get("/userlog",(req,res)=>{
    res.render("userlog");
})
app.get("/register",(req,res)=>{
    res.render("register");
})
app.get("/food",(req,res)=>{
    res.render("food")
})
app.get("/support",(req,res)=>{
    res.render("support")
})
//Creating the database for the user who want to buy 
app.post("/",async(req,res)=>{
    try{
       const registerCustomer = new Buynow({ //Buynow == collection Name of the potential customer
        Name  : req.body.name,
        Email : req.body.email,
        Phone : req.body.phone,
        Whatsapp : req.body.whatsapp
       })
       const registered = await registerCustomer.save()
       console.log(registered)
       res.status(201).render("index");
    }
    catch(e){
        res.status(400).send(e);
        return;
    }
})

//lOGIN STATUS
app.post("/login",async(req,res)=>{
    try{
    const email = req.body.emaillog;
    const password = req.body.passwordlog;
    
    const useremail = await Register.findOne({$and:[{Emailaddress:email},{Password:password}]}) 
    if(!useremail){
        return res.status(404).send();
    }else{ 
        res.render("login",{
            Name : email,
           
        })
    }
    console.log(useremail)
    }
    catch(e){
        res.status(400).send(e)
    }
    
})

app.listen(port,()=>{
    console.log(`server is runnung at ${port}`);
})