const routes = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../schema/User");

const S_KEY = "medicin";

routes.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const hash = user.password;
      if (bcrypt.compareSync(password, hash)) {
        res.json({
          success: true,
          user,
        });
      } else {
        res.json({ success: false, error: "provide correct credentials!" });
      }
    } else {
      res.json({ success: false, error: "please signup!" });
    }
  } catch (error) {
    res.json({ success: false, error });
  }
});
routes.post("/signup", async (req, res) => {
  const { username, email, password, phonenumber } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      console.log("find user");
      res.json({ success: false, error: "user already signup!" });
    } else {
      const hashpassword = await bcrypt.hash(password, 5);
      const signupuser = await new User({
        username,
        email,
        password: hashpassword,
        phoneNo: phonenumber,
      });
      await signupuser.save();
      console.log("new user", signupuser);
      res.json({ success: true });
    }
  } catch (error) {
    res.json({ success: false, error });
  }
});

// routes.get("/userprofile", Authverifycation, async (req, res) => {
//   try {
//     console.log("id", req.body.userdata);

//     const user = await User.findById(req.body.userdata.user.id);

//     console.log("user", user);

//     res.json({ success: true, user });
//   } catch (error) {
//     res.json({ success: false, error });
//   }
// });

module.exports = routes;
