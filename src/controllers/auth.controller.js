const User = require('../models/User')

module.exports.signupGet = (req, res) => {
    res.send('signup get')
}

module.exports.signupPost = async (req, res) => {
    const {email, password, name} = req.body

    try {
        const user = await User.create({email, password, name})
        console.log(user)
        res.json({user})
    } catch (err) {
        console.log(err)
    }
}

module.exports.loginGet = (req, res) => {
    res.send('login get')
}

module.exports.loginPost = async (req, res) => {
    res.send('login post')
}

module.exports.logout = (req, res) => {
    res.send('logout')
}