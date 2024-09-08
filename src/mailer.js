import * as nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const {EMAIL_HOST,EMAIL_PORT,EMAIL,EMAIL_PW,FROM,TO,SUBJECT} = process.env

const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: true, 
    auth: {
        user: EMAIL,
        pass: EMAIL_PW,
    },
});
console.log("MAILER LOG 👉",EMAIL_HOST,EMAIL_PORT,EMAIL,EMAIL_PW,FROM,TO,SUBJECT)
function formatText(email,name,phone,message){
    return(
        `Contact\n\nName:${name} | Email: ${email} | phone:${phone !== ""? phone:"no phone number"}\n\nMessage:\n\n${message}`
    )
}
function formatHTML(email,name,phone,message){
    return(
        `<h3>Contact 📞</h3><p><b>Name:</b> ${name}<br><b>Email:</b> ${email}<br><b>Phone:</b> ${phone !== "" ? phone: "no phone number"}</p><h3>Message 📝</h3><p>${message}</p>`
    )
}

export default async function InquiryMail(email,name,phone,message) {
    
    const info = await transporter.sendMail({
        from: `${FROM} <${EMAIL}>`,
        to: `${TO}`,
        subject: `${SUBJECT}`,
        text: formatText(email,name,phone,message), 
        html: formatHTML(email,name,phone,message),
    });
    console.log("Message sent: %s", info.messageId);
}
