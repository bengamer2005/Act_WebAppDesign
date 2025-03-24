const nodemailer = require("nodemailer")

const info = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "bennywuis@gmail.com",
        pass: "zzaorhubphxsqwjp"
    }
})

const sendEmail = async (to, subject, text) => {
    try {
        await info.sendMail({
            from: '"Comic Verse" <tuemail@gmail.com>',
            to,
            subject,
            text
        })
        console.log("correo enviado a:", to)
    } catch (error) {
        console.error("Error al mandar correo:", error)
    }
}

module.exports = sendEmail
