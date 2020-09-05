"use strict";

const accounts = require("./accounts.js");
const logger = require("../utils/logger");
const memberStore = require("../models/member-store");
const gymUtility = require("../utils/gymUtility");
const uuid = require("uuid");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: "Dashboard",
      members: memberStore.getAllMembers()

    };
    logger.info("about to render", memberStore.getAllMembers());
    response.render("dashboard", viewData);
  },

  memberTrainerIndex(request, response) {
    const memberId = request.params.id;
    const assessmentId = request.params.assessmentid;
    logger.debug("Member id = ", memberId);
    const viewData = {
      title: "Member",
      member: memberStore.getMember(memberId),
      assessment: memberStore.getAssessment(memberId, assessmentId),
      BMI: gymUtility.bmiCalculator(memberId),
      idealBodyWeight: gymUtility.determineBMICategory(memberId),
      isIdealBodyWeight: gymUtility.isIdealBodyWeight(memberId),
    };
    response.render("dashboardMemberView", viewData);
  },


  deleteMember(request, response) {
    const memberId = request.params.id;
    logger.debug(`Deleting member ${memberId}`);
    memberStore.removeMember(memberId);
    response.redirect("/dashboard");
  },

  addMember(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newMember = {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      address: request.body.address,
      gender: request.body.gender,
      height: Number(request.body.height),
      startingWeight: Number(request.body.startingWeight),
      id: uuid.v1(),
      userid: loggedInUser.id,
      assessments: [],

    };
    logger.debug("Creating a new Assessment", newMember);
    memberStore.addMember(newMember);
    response.redirect("/dashboard");
  },

  addComment(request, response) {
    const memberId = request.params.id;
    const assessmentId = request.params.assessmentid;
    const assessment = memberStore.getAssessment(memberId, assessmentId)
    const comment = {
      Comment: request.body.Comment,
    };
    logger.debug(`Updating Assessment from Member ${memberId}`);
    memberStore.addComment(assessment, comment);
    response.redirect("/dashboardMemberView/" + memberId);
  }

};

module.exports = dashboard;
