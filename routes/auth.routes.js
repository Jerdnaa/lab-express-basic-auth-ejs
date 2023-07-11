const router = require("express").Router();
const User = require('../models/User.model')
const bcrypt = require('bcryptjs')

router.get("/signup", (req, res) => {
    res.render("authFolder/signup")
})

router.post("/signup", async (req,res) => {
    const data = { ...req.body };
    const salt = bcrypt.genSaltSync(13)
    data.password = bcrypt.hashSync(data.password, salt)
    console.log(data.password)
    try {
        await User.create(data)
        res.redirect("/")
    } catch (err) {
        console.log(err)
    }
})

router.get("/login", (req, res) => {
    res.render("authFolder/login")
})

router.post("/login", async (req, res) => {
    // console.log(req.body)
    const userLogin = req.body;
    try {
        const checkedUser = await User.findOne({username: userLogin.username})
        console.log(checkedUser)
        if(checkedUser) {
            if(bcrypt.compareSync(userLogin.password, checkedUser.password)){
                const loggedUser = { ...checkedUser._doc}
                delete loggedUser.password
                res.redirect("/profile")
            } else {
                console.log("Incorect password or username")
                res.render("authFolder/login", {errMessage: "Incorect password or username"})
            }
        } else {
            console.log("No user")
            res.render("authFolder/login", {errMessage: "User doesnt exsist"})
        }
    } catch (error) {
        console.log(error)
    }
})



module.exports = router;