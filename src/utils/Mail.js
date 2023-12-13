const Queue = require('bull');
const { setQueues, BullAdapter } = require('bull-board');
const nodemailer = require('nodemailer');
require('dotenv').config()

const emailQueue = new Queue('emails');
// setQueues([new BullAdapter(emailQueue)]);

const Mail = {}

const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 2525,
    auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.APP_EMAIL_PSW
    }
})

// const worker = new Worker('emailQueue', async (job) => {
//     const { to, subject, body } = job

//     const mailOptions = {
//         from: process.env.APP_EMAIL,
//         to: to,
//         subject: subject,
//         text: body
//     };

//     console.log('sending email...')
//     await transport.sendMail(mailOptions);
// });

Mail.sendPurchaseEmail = async (payload) => {
    try {
        const { to, data } = payload
        subject = 'Thank you for your purchase!',
        body = '<h1>Thank you for trusting us.</h1> <p>In this email you will find all the details about the shipping...</p>'
        
        /*    
        await emailQueue.add({ payload });

        emailQueue.process(async (job, done) => {
            console.log('JOB STARTING',job)
            const { to, subject, body } = job.data;

            const mailOptions = {
                from: process.env.APP_EMAIL,
                to: to,
                subject: subject,
                text: body
            };

            console.log('here...')
            await transport.sendMail(mailOptions);
        });

        */

        const mailOptions = {
            from: process.env.APP_EMAIL,
            to,
            subject,
            html: body
        };

        await transport.sendMail(mailOptions);
    } catch (error) {
        throw error
    }
}

module.exports = Mail;