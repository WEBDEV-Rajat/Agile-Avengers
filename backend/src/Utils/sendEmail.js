// import nodemailer from "nodemailer";

// const sendEmail = async ({ to, subject, text }) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   });

//   await transporter.sendMail({
//     from: process.env.EMAIL,
//     to,
//     subject,
//     text,
//   });
// };

// export default sendEmail;

import nodeMailer from "nodemailer";

export const sendEmail = async ({ email, subject, htmlContent, }) => {
  try {

    console.log("hgjckdsbjfvh");
    
    const transporter = nodeMailer.createTransport({
      host: process.env.SMTP_HOST,
      service: process.env.SMTP_SERVICE,
      port: process.env.SMTP_PORT, // Corrected the port setting
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    console.log("hgjckdsbjfvhfzghjgk");

    const options = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject: subject,
      html: htmlContent,
    //   html: message, // for decoration
      // extra
      
    };
    console.log("xasghfg:",options);
    
    await transporter.sendMail(options);
    console.log("Mail sent successfully");
  } catch (error) {
    console.error("Couldn't send mail:", error);
    // If this is being used in an Express middleware, uncomment the following line:
    // return next(new ErrorHandler("Couldn't send mail", 400));
  }
};
