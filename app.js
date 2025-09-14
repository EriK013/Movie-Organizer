const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const movieRoutes = require("./routes/movieRoutes");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config({ path: "./api.env" });

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("MongoDB Connection Error:", err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: false
}));

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static("public"));

app.use(authRoutes);
app.use(movieRoutes);

app.get('/', (req, res) => {
  console.log("User session:", req.session.user);
  res.render('index', { user: req.session.user || null });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
