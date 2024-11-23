import nodemailer from 'nodemailer';
import bcrypt from "bcryptjs";
import User from "@/Models/users.models";

export const sendEmail =async ({email, emailType, userId}: any)=>{
    try {

        console.log("====================================")
        const hashToken = await bcrypt.hash(userId.toString(), 10);
        console.log("email: ", email);
        console.log("hashToken: ", hashToken);
        console.log("userId: ", userId);
        console.log("emailType: ", emailType);

        if(emailType==="VERIFY"){
            await User.findByIdAndUpdate(userId, {verifyUserToken: hashToken, verifyUserExpire: Date.now() + 3600000});
        }else if(emailType==="RESET"){
            await User.findByIdAndUpdate(userId, {forgetPasswordGenerateToken: hashToken, forgetPasswordGenerateExpire: Date.now() + 3600000});
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
            user: "038fab4677844a",
            pass: "94243451731c18"
            }
        });

        const mailOptions={
        from: 'sunny@gmail.com', // sender address
        to: email, // list of receivers
        subject: emailType==="VERIFY" ? "Verify your Email": "Reset your password ", // Subject line
        text: `Click on the link to ${emailType==="VERIFY" ? "verify your email": "reset your password"}`, // plain text body
        html: `<b>Click on the link to ${emailType==="VERIFY" ? "verify your email": "reset your password"}</b> <a href="${process.env.DOMAIN}/verify-email?token=${hashToken}">Click here</a> 
        or copy and paste the link below in your browser: <br> ${process.env.DOMAIN}/verify-email?token=${hashToken}
        `, // html body
        }

        const mailResponse = await transport.sendMail(mailOptions);
        console.log("Mail response: ", mailResponse);
        return mailResponse;
    } catch (error: any) {
        throw new Error(error.message);
    }
}




