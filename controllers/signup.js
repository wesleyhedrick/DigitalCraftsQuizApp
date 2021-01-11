const bcrypt = require('bcryptjs');
const { layout } = require('../utils');
const { Users } = require('../models');

const RegisterUser = (req, res) => {
    res.render('signUp-form', { 
    //     - foggy memory on this with my notes
    //     locals: {
    //         title: 'Register'
    //     },
    //     ...layout
    });
        
    };
const createNewUser = async (req, res) => {
    const { fullName, userName, email, password} = req.body

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
        try {
            const newUser = await Users.create({
                fullname,
                username,
                email,
                hash
            });
            //res.reirect('/login') chris' notes have a res.redirect here after the information is created
        } catch (e) {
            if(e.name === "SequelizeUniqueConstraintError") {
                res.redirect('/login');

            }
            res.redirect('/');



        };
        
            
        };

        const userNameExists = (req, res) => {
            res.render('user-exists')
        };

        module.exports = { RegisterUser, createNewUser, userNameExists}