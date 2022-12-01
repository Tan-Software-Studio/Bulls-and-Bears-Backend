const nodemailer = require('nodemailer')
const fs = require('file-system')
const handlebars = require('handlebars')

// send welcome email template
const sendEmail = (sendData) => {
    try{

        return new Promise(async resolve => {
            var file_template = sendData.file_template
            var subject = sendData.subject

            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: "test.user25112020@gmail.com",
                    pass: "zmdjwxnvoamqwbgi"
                    // noreply user + pass
                }
    
            });

            fs.readFile(file_template, { encoding: 'utf-8' }, function (err, html) {
                
                var template = handlebars.compile(html);
                // console.log("🚀 ~ file: email.js ~ line 28 ~ sendData", sendData)
                var htmlToSend = template(sendData);
                
                var mailOptions = {
                    from: "test.user25112020@gmail.com", // set noreply mail id
                    to: "info@bullsandbears.site", // set noreply mail id
                    subject: subject,
                    html: htmlToSend
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log("error"+error)
                        return ({ status: false, data: [], message: 'Could not send mail!' });
                    }
        
                    console.log("info "+info)
                    console.log('Message sent: %s', info.messageId);
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                    return ({ status: true, data: [], message: 'mail sent!.' });
                });

               
            }); 

        })

    } catch (e) {
        console.log(e)
        return res.status(401).send({ "status": false, 'code': 401, "message": "Unable to send email!", data: {} })
    }
}

// send welcome email
async function sendWelcomeEmail(email, subject, html) {
    try{
        let transporter = nodemailer.createTransport({
            host: "mail.privateemail.com",
            port: 465,
            secure: true,
            auth: {
                user: "hello@wizzcoin.io",
                pass: "Wizz009$"
            }

        });
        var mailOptions = {
            // from:"test.user25112020@gmail.com",
            from: "hello@wizzcoin.io",
            to: email,
            subject: subject,
            html: html
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("error"+error)
                return ({ status: false, data: [], message: 'Could not send mail!' });
            }

            console.log("info "+info)
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            return ({ status: true, data: [], message: 'mail sent!.' });
        });
    } catch (err) {
        console.log(err)
    }
}


module.exports = {
    sendEmail,
    sendWelcomeEmail
}