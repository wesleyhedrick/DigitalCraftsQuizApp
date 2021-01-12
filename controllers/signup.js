const bcrypt = require('bcryptjs');
const { layout } = require('../utils');
const { Users } = require('../models');

const signUpForm = (req, res) => {
    res.render('signup', { 
    //     - foggy memory on this with my notes
    //     locals: {
    //         title: 'Sign Up!'
    //     },
    //     ...layout
    });
};

const createNewUser = async (req, res) => {
    const { first, last, username, email, password} = req.body
    const hash = bcrypt.hashSync(password, 10);
    console.log(first, last, username, email, hash);

    try {
        const newUser = await Users.create({
            First: first,
            Last: last,
            Username: username,
            email,
            hash
        });
        //res.redirect('/login') chris' notes have a res.redirect here after the information is created
    } catch (e) {
        if(e.name === "SequelizeUniqueConstraintError") {
            res.redirect('/signup/user-exists');
        }
    };
    res.redirect('/login');
};

const userNameExists = (req, res) => {
    res.render('user-exists')
};

module.exports = { signUpForm, createNewUser, userNameExists}