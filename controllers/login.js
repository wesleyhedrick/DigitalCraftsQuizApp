const { Users } = require('../models');
const bcrypt = require('bcryptjs');

const loginLanding = (req, res) => {
    res.render('login')
};

const loginVerify = async (req, res) => {
    const {username, password} = req.body;
    console.log('Username: ', username)
    console.log('Password: ', password)

    // Check to see if they exist in the database. If so redirect to quiz selection page
    const user = await Users.findOne({
        where: {
            username
        }
    })

    if(user) {
        //Compare req.body.password with user.hash
        const isValid = bcrypt.compareSync(password, user.hash);
        //If password matches with hash
        if(isValid){
            res.redirect('quiz')
        } else {
            res.send('Login Error')
        }
    } else {
        res.send('Login Error')
    }

    // if not rerender login page with error message




}

module.exports = {
    loginLanding, 
    loginVerify
};

