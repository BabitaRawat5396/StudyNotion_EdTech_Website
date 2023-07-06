const nodemailer = require("nodemailer");

exports.mailSender = async(email,title,body) => {
    try {
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        })
        let info = transporter.sendMail({
            from:'studyNotion || codeHelp by babbar', 
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`
        })

        return info;

    } catch (error) {
        console.log(`${error} has occured in mailSender Function`);
    }
}