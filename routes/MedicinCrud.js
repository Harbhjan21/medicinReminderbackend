const routes = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../schema/User");

const Medicindetail = require("../schema/Medicin");
const schedule = require("node-schedule");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // e.g., 'Gmail'
  auth: {
    user: "shunnysingh65@gmail.com", // your email
    pass: "xctp oyqt tqgp lyzg", // your password
  },
});

// Schedule reminders for specific days of the week
const scheduleRemindersOnSpecificDays = (name, medication, email) => {
  const rule = new schedule.RecurrenceRule();
  //   rule.dayOfWeek = days; // An array of days (0 = Sunday, 1 = Monday, ..., 6 = Saturday)

  if (!medication?.everyday) {
    console.log("medication days", medication.days);
    rule.hour = 8; // 24-hour format (0-23)
    rule.minute = 0;
    rule.dayOfWeek = medication.days;
  } else {
    rule.dayOfWeek = ["1", "2", "3", "4", "5", "6", "0"];
    rule.hour = 8; // 24-hour format (0-23)
    rule.minute = 0;
  }

  const job = schedule.scheduleJob(rule, function () {
    // Send a reminder on the specified days
    console.log("2 check");
    sendReminderOnSpecificDays(name, medication, email, rule.dayOfWeek);
  });
};

function sendReminderOnSpecificDays(name, medication, email, days) {
  // Check if today is one of the specified days
  console.log(" 3 1 check");
  const today = new Date();
  const dayOfWeek = today.getDay();

  if (days.includes(dayOfWeek.toString())) {
    console.log(" 3 check");
    // Send a reminder email
    const mailOptions = {
      from: "shunnysing65@gmail.com",
      to: email, // User's email address
      subject: "Medication Reminder",
      text: `Hello ${name}, it's time to take your ${medication.name}.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending reminder email:", error);
      } else {
        console.log("Reminder email sent:", info.response);
      }
    });
  }
}

routes.post("/add", async (req, res) => {
  const { medicin, id } = req.body;

  const { name, email } = medicin;
  try {
    medicin?.medicin.map((item) => {
      scheduleRemindersOnSpecificDays(name, item, email);
    });

    const med = new Medicindetail({
      userId: id,
      medicin: medicin.medicin,
      name,
      email,
    });
    await med.save();
    const user = await User.findByIdAndUpdate(id, {
      $push: { medicin: med._id },
      new: true,
    });
    console.log("meddetails saved", med, user);

    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, error });
  }
});

routes.post("/getmedicins", async (req, res) => {
  const { id } = req.body;
  console.log(id);
  try {
    const med = await Medicindetail.find({ userId: id }).sort({
      createdAt: -1,
    });
    res.json({ success: true, med });
  } catch (error) {
    res.json({ success: false, error });
  }
});

module.exports = routes;
