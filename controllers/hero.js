const hero = (req, res) => {
    req.session.destroy();
    res.render('hero')

}

module.exports = {hero}