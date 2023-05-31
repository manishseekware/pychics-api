const nodemailer = require('nodemailer');

 const transporter = nodemailer.createTransport({
       host: "smtp.gmail.com",
      port: 587,
      auth: { user: "manishiit900@gmail.com", pass: "rwbyvrcxbtozxagm" },
    });


const sendMail = async(to,  subject , body) => {
    
try{
     const mailOptions = {
      from: process.env.EMAIL_HOST,
      to: to,
      subject: subject,
      html: body
    };
    await transporter.sendMail(mailOptions);
}catch(err){
    console.log(err)
}
}

module.exports = sendMail;