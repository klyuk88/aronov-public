import nodemailer from "nodemailer";
import formidable from "formidable";

export default defineEventHandler(async (event) => {
  var form = new formidable.IncomingForm();

  try {
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(event.node.req, (err, fields, files) => {
        if (err) {
          reject(err);
          return;
        }

        resolve({ fields, files });
      });
    });

    let htmlBody = `<table style="width: 100%;">`;

    for (const key in fields) {
      if (Object.hasOwnProperty.call(fields, key) && key !== "files") {
        htmlBody =
          htmlBody +
          `<tr style="background-color: #f8f8f8;">
                <td style="padding: 10px; border: #e9e9e9 1px solid;"><b>${key}</b></td>
                <td style="padding: 10px; border: #e9e9e9 1px solid;">${fields[key]}</td>
                </tr>`;
      }
    }
    htmlBody = htmlBody + `</table>`;

    const transporter = nodemailer.createTransport({
      port: process.env.SMTP_PORT,
      host: process.env.SMTP_HOST,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      secure: true,
    });

    const attachments = [];

    for (const key in files) {
      attachments.push({
        filename: files[key].originalFilename,
        path: files[key].filepath,
      });
    }

    const mailData = {
      from: process.env.SMTP_USER,
      to: "",
      subject: "Письмо с сайта Аронов и партнеры",
      text: "",
      html: htmlBody,
      attachments,
    };

    const info = await transporter.sendMail(mailData);

    return info;
  } catch (e) {
    return e;
  }
});
