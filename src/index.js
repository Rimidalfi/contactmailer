import express from "express";
import cors from 'cors';
import InquiryMail from "./mailer.js";

const {EMAIL_HOST,EMAIL_PORT,EMAIL,EMAIL_PW,FROM,TO,SUBJECT} = process.env
const PORT = process.env.PORT || 8080;
const ORIGIN = process.env.ORIGIN 

const corsOptions = {
    origin: ORIGIN
}
const app = express();


async function forwardMail(req,res){
    const mailData = await req.body
    const {email,name,phone,message} = mailData
    console.log(mailData)
    console.log("email", email.length)
    if (email.length && message.length > 0){
        InquiryMail(email,name,phone,message)
        res.json({ msg: "Inquiry successfully forwarded ✨"})
    }else{
        res.json({ msg: "Empty message! Inquiry NOT forwarded ❌"})
    }
}


app.use(cors(corsOptions));
// app.use(cors());
app.use(express.json());

app.post('/',forwardMail)
app.get('/',(req,res)=>res.send("<h1 style='text-align: center;'>Contact NodeMailer online 🚀</h1>"))
app.get('/test',(req,res)=>res.send(`<h1 style='text-align: center;'>Host:${EMAIL_HOST}<br>From:${FROM}<br>to${TO}<br>port${EMAIL_PORT}</h1>`))
app.listen(PORT,()=>console.log(`Server runs on Port: ${PORT}`));
