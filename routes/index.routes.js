const { inSession } = require("../middlewares/secure-routes.middlewear");

const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/profile", (req, res) => {
  res.render("profile", {user: req.session.user})
})

router.get("/main", inSession, (req, res) => {
  res.render("main")
})

router.get("/private", inSession, (req, res) => {
  res.render("private")
})



module.exports = router;
