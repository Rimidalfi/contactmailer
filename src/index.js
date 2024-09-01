import express from "express";
import cors from 'cors';
import InquiryMail from "./mailer.js";


const PORT = process.env.PORT || 3001;
const corsOptions = {
    origin: "http://portfolio:3000"
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
app.use(express.json());

app.post('/',forwardMail)
app.get('/',(req,res)=>res.send("<h1 style='text-align: center;'>Contact NodeMailer online 🚀</h1>"))
app.listen(PORT,()=>console.log(`Server runs on Port: ${PORT}`));
