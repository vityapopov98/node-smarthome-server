// import nodemailer from "nodemailer";
// import fs from "fs";

// const homeConfig = JSON.parse(fs.readFileSync("./config.json", "utf8"));

// // create reusable transporter object using the default SMTP transport
// let transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: homeConfig.users[0].login, // generated ethereal user
//     pass: homeConfig.users[0].password, // generated ethereal password
//   },
// });

// class Letter {
//   constructor(letter) {
//     this.from = homeConfig.users[0].login; // sender address
//     this.to = `${letter.to}, ${homeConfig.users[0].login}`; //"vityapopov98@yandex.ru" // list of receivers
//     this.subject = letter.subject; // Subject line
//     this.text = letter.text; // plain text body
//     //this.html = letter.html; // html body
//   }

//   sendMail() {
//     return new Promise((resolve, reject) => {
//       transporter.sendMail(this, (error, info) => {
//         if (error) reject(error);
//         else resolve(info);
//       });
//     });
//   }
// }

// export { Letter };
