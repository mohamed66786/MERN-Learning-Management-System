require("dotenv").config();
import nodemailer, { Transporter } from "nodemailer";
import ejs from "ejs";
import path from "path";

interface EmailOptions {
  email: string;
  subject: string;
  template: string;
  data: {
    [key: string]: any;
  };
}

const sendMail = async (options: EmailOptions): Promise<void> => {
  const transporter: Transporter = nodemailer.createTransport({
    host: process.env.SNPT_HOST,
    port: parseInt(process.env.SNPT_PORT || "587"),
    service: process.env.SNPT_SERVICE,
    auth: {
      user: process.env.SNPT_MAIL,
      pass: process.env.SNPT_PASSWORD,
    },
  });
  const { email, subject, template, data } = options;
  // get the path to the email template file
  const templatePath = path.join(__dirname, "../mails", template);

  // render the email template with ejs
  const html: string = await ejs.renderFile(templatePath, data);

  const mailOptions = {
    from: process.env.SNPT_EMAIL,
    to: email,
    subject,
    html,
  };
  await transporter.sendMail(mailOptions);
};

export default sendMail;

// #################################

// Use require syntax for dotenv
// require("dotenv").config();

// import nodemailer, { Transporter } from "nodemailer";
// import ejs from "ejs";
// import path from "path";

// interface EmailOptions {
//   email: string;
//   subject: string;
//   template: string;
//   data: {
//     [key: string]: any;
//   };
// }

// const sendMail = async (options: EmailOptions): Promise<void> => {
//   const transporter: Transporter = nodemailer.createTransport({
//     host: process.env.SNPT_HOST,
//     port: parseInt(process.env.SNPT_PORT || "587"),
//     service: process.env.SNPT_SERVICE,
//     auth: {
//       user: process.env.SNPT_MAIL, // Use "user" instead of "username"
//       pass: process.env.SNPT_PASSWORD, // Use "pass" instead of "password"
//     },
//   });

//   // get the path to the email template file
//   const { email, subject, template, data } = options;

//   // render the email template with ejs
//   const html: string = await ejs.renderFile(path.resolve(template), data); // Resolve the template path

//   const mailOptions = {
//     from: process.env.SNPT_EMAIL,
//     to: email,
//     subject,
//     html,
//   };

//   await transporter.sendMail(mailOptions);
// };

// export default sendMail;
