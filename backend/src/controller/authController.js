const bcryptjs = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({msg: "User with same email already exists!"});
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        let user = new User({
            email,
            password: hashedPassword,
            name,
        });
        user = await user.save();
        res.json(user);
    } catch (error) {
        res.status(500).json({error: e.message})
    }
};

const signInController = async (req,res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User with this email does not extist!"});
            
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({msg: "Incorrect Password"});
        }

        const token = jwt.sign({id: user._id}, "passwordKey");
        res.json({token, ...user._doc});
    } catch (error) {
        res.status(500).json({error: e.message});
    }
}

module.exports = { registerController, signInController }