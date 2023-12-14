const Queue = require('bull');
const { setQueues, BullAdapter } = require('bull-board');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
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

const readHTMLFile = function (path, callback) {
    fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
        if (err) {
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};

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
        const { to, items } = payload
        subject = 'Thank you for your purchase!'
        const templatePath = process.cwd() + '/src/mail/templates/purchaseSuccessful.ejs'
        const emailTemplate = fs.readFileSync(templatePath, 'utf-8');
        
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
        
        let htmlItems = ''
        let total = 0

        for (let item of items) {
            total += item.amount_total / 100
            htmlItems += `<li>${item.description} - $ ${item.amount_total}</li>`
        }

        payload.items = htmlItems
        payload.total = total

        const renderedTemplate = ejs.render(emailTemplate, payload);
        const mailOptions = {
            from: process.env.APP_EMAIL,
            to,
            subject,
            html: renderedTemplate
        };

        await transport.sendMail(mailOptions);
    } catch (error) {
        throw error
    }
}

module.exports = Mail;