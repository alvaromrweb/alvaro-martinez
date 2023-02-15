import nodemailer from 'nodemailer'

export async function post({request}) {
  if (request.headers.get("Content-Type") === "application/json") {
    const body = await request.json();
    if(body.email && body.subject && body.message) {

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: import.meta.env.GMAIL_USER, // generated ethereal user
          pass: import.meta.env.GMAIL_PASSWORD, // generated ethereal password
        },
      });

      // send mail with defined transport object
      try {
        let info = await transporter.sendMail({
          from: `Contacto Web Portfolio <${import.meta.env.GMAIL_USER}>`, // sender address
          to: import.meta.env.EMAIL_TO, // list of receivers
          subject: body.subject, // Subject line
          html: `<h4>De: ${body.email}</h4> <p>${body.message}</p>`, // html body
        });
        console.log(info)
        // console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        return new Response(JSON.stringify({"status": "success", "message": "Mensaje enviado"}), {
          status: 200,
        });
        
      } catch (error) {
        return new Response(JSON.stringify({"status": "fail", "message": `Error al enviar el correo: ${error.message}`}), {
          status: 400,
        });
      }

    } else {
      return new Response(JSON.stringify({"status": "fail", "message": `Faltan campos por rellenar`}), {
        status: 400,
      });
    }

  } else {
    return new Response(JSON.stringify({"status": "fail", "message": `Header Content-type invalid`}), {
      status: 400,
    });
  }
}
