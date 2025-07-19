import asyncHandler from "../Utils/asyncHandler.js";
import { Contact } from "../Models/contactus.model.js";
import { sendEmail } from "../Utils/sendEmail.js";

const options = {
  httpOnly: true,
  secure: true,
  sameSite : "none"
};

const submitContactForm = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;
  // console.log("in the form ");

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  const user = await Contact.findOne({ email });
  // console.log(user);
  
  if (user) {
    // console.log("efwd");
    
    return res.status(200).json({
      success: false,
      message:
        "We have already received your message. Our team will get back to you shortly.",
    });
  }
  // console.log("ddsrvrv"); 

  
  await Contact.create({ name, email, message });

  let subject = "Thank you for contacting Expense Guru!";
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <div style="background-color: #0D5B19; padding: 20px; color: white;">
          <h2>Expense Guru</h2>
        </div>
        <div style="padding: 20px;">
          <h3 style="color: #333;">Hi ${name},</h3>
          <p>Thank you for reaching out to us! 🎉</p>
          <p>We’ve received your message:</p>
          <blockquote style="border-left: 4px solid #0D5B19; padding-left: 10px; color: #555;">${message}</blockquote>
          <p>Our team will get back to you as soon as possible.</p>
          <p style="margin-top: 30px;">Warm regards,<br /><strong>The Epense Guru Team</strong></p>
        </div>
        <div style="background-color: #f1f1f1; text-align: center; padding: 10px; font-size: 12px; color: #777;">
          © ${new Date().getFullYear()} Expense Guru. All rights reserved.
        </div>
      </div>
    </div>
  `;

  await sendEmail({ email, subject, htmlContent });

  res.status(200).json({
    success: true,
    message:
      "Your message has been received. A confirmation email has been sent.",
  });
});

export { submitContactForm };
