// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey("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");
// const msg = {
//   to: 'manish.sharma@seekware.com',
//   from: 'manishiit900@gmail.com', // Use the email address or domain you verified above
//   subject: 'Sending with Twilio SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };
// //ES6
// sgMail
//   .send(msg)
//   .then(() => {}, error => {
//     console.error(error);

//     if (error.response) {
//       console.error(error.response.body)
//     }
//   });
// //ES8
// (async () => {
//   try {
//     await sgMail.send(msg);
//   } catch (error) {
//     console.error(error);

//     if (error.response) {
//       console.error(error.response.body)
//     }
//   }
// })();



















// // const sgMail = require('@sendgrid/mail');
// // sgMail.setApiKey("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")
// // console.log(process.env.SMTP_PASSWORD)
// // console.log("================================EmailSent++++++++++++++++++++++++++++++++++")


// // const sendMail = (to) => {
// //   const msg = {
// //   to: 'manish.sharma@seekware.in', 
// //   from: 'manishiit900@gmail.com', 
// //   subject: 'Example Subject',
// //   text: 'This is the plain text version of the email body.',
// //   html: '<p>This is the HTML version of the email body.</p>',
// // };

// // sgMail.send(msg)
// //   .then(() => {
// //     console.log(msg)
// //     console.log('Email sent successfully');
// //   })
// //   .catch((error) => {
// //     console.log(error.message);
// //     console.error(error);
// //   });

// // }

// // module.exports = {
// //     sendMail
// // }