const User = require("../models/User");

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        let existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send("User already exists");
        }

        const newUser = new User({ username, email, password });
        await newUser.save();
        req.session.user = newUser;

        res.redirect("/");
    } catch (error) {
        res.status(500).send("Server error Login");
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.render("authViews/login", { error: "User not found" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.render("authViews/login", { error: "Invalid credentials" });
        }

        req.session.user = user;

        res.redirect("/");
    } catch (error) {
        res.status(500).send("Server error");
    }
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Failed to log out");
        }
        res.redirect("/");
    });
};
