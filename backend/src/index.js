const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const SignUpCollection = require("./mongodb");

const templatePath = path.join(__dirname, "../templates");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set up view engine
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.redirect("/login"); // Redirect to login or signup
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  console.log("Received signup request"); // Initial logging

  const data = {
    fullname: req.body.fullname,
    email: req.body.email,
    phonenumber: req.body.phonenumber,
    password: req.body.password,
    confirmpassword: req.body.confirmpassword,
    reason: req.body.reason,
    introduction: req.body.introduction,
  };

  console.log("Form Data:", data); // Debugging line

  try {
    const userdata = await SignUpCollection.insertMany([data]);
    console.log("User Data Inserted:", userdata);
    res.render("login");
  } catch (error) {
    console.error("Error Inserting Data:", error); // Debugging line
    res.status(500).send("Error inserting data");
  }
});

app.post("/login", async (req, res) => {
  try {
    const user = await SignUpCollection.findOne({ email: req.body.email });

    if (user && user.password === req.body.password) {
      if (user.email.endsWith("@aidbridge.in")) {
        res.json({ success: true, redirectToAdmin: true });
      } else {
        res.json({ success: true, redirectToAdmin: false });
      }
    } else {
      res.json({ success: false, message: "Incorrect email or password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Error during login" });
  }
});

app.get("/admin", (req, res) => {
  res.render("admin");
});
app.get('/admin_dashboard', (req, res) => {
  res.render('admin_dashboard');
});
app.get("/admin_verify_good", (req, res) => {
  res.render("admin_verify_good");
});

app.get("/admin_verify", (req, res) => {
  const eventId = req.query.eventId;
  res.render("admin_verify", { eventId });
});
app.get('/home', (req, res) => {
  res.render('home');
});


// Start server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
