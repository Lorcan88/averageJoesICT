"use strict";

const express = require("express");
const router = express.Router();

const accounts = require("./controllers/accounts.js");
const dashboard = require("./controllers/dashboard.js");
const about = require("./controllers/about.js");
const member = require("./controllers/member.js");
const assessment = require("./controllers/assessments.js");

router.get("/", accounts.index);
router.get("/login", accounts.login);
router.get("/signup", accounts.signup);
router.get("/logout", accounts.logout);
router.post("/register", accounts.register);
router.post("/authenticate", accounts.authenticate);


router.get("/dashboard", dashboard.index);
router.get("/dashboardMemberView/:id",dashboard.memberTrainerIndex);
router.get("/dashboard/deletemember/:id", dashboard.deleteMember);
router.post("/dashboard/addmember", dashboard.addMember);
router.post("/dashboardMemberView/:id/addcomment/:assessmentid", dashboard.addComment);


router.get("/about", about.index);
router.get("/member/:id", member.index);
router.get("/member/:id/deleteassessment/:assessmentid", member.deleteAssessment);
router.post("/member/:id/addassessment", member.addAssessment);

router.get("/settings/:id/editmember", member.editMember);
router.post("/settings/:id/updatemember", member.update);

router.get("/assessment/:id/editassessment/:assessmentid", assessment.index);
router.post("/assessment/:id/updateassessment/:assessmentid", assessment.update);


module.exports = router;
