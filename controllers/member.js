"use strict";

const logger = require("../utils/logger");
const memberStore = require("../models/member-store");
const gymUtility = require("../utils/gymUtility");
const uuid = require("uuid");

const member = {
  index(request, response) {
    const memberId = request.params.id;
    const assessment = request.params.assessmentid;
    logger.debug("Member id = ", memberId);
    const viewData = {
      title: "Member",
      member: memberStore.getMember(memberId),
      BMI: gymUtility.bmiCalculator(memberId),
      idealBodyWeight: gymUtility.determineBMICategory(memberId),
      isIdealBodyWeight: gymUtility.isIdealBodyWeight(memberId),
      //trend: gymUtility.trend(memberId),
    };
    response.render("member", viewData);
  },

  deleteAssessment(request, response) {
    const memberId = request.params.id;
    const assessmentId = request.params.assessmentid;
    logger.debug(`Deleting Assessment ${assessmentId} from Member ${memberId}`);
    memberStore.removeAssessment(memberId, assessmentId);
    response.redirect("/member/" + memberId);
  },

  addAssessment(request, response) {
    const memberId = request.params.id;
    const trend= gymUtility.trend(memberId);
    const newAssessment = {
      id: uuid.v1(),
      Date: new Date().toUTCString(),
      Weight: Number(request.body.Weight),
      Chest: Number(request.body.Chest),
      Thigh: Number(request.body.Thigh),
      UpperArm: Number(request.body.UpperArm),
      Waist: Number(request.body.Waist),
      Hips: Number(request.body.Hips),
      Comment: request.Comment,
      trend: trend,
    };
    logger.debug("New Assessment = ", newAssessment);
    memberStore.addAssessment(memberId, newAssessment);
    response.redirect("/member/" + memberId);
  },

  /*addComment(request, response) {
    const memberId = request.params.id;
    const assessmentId = request.params.id;
    const assessment = memberStore.getAssessment(memberId, assessmentId)
    const newComment = {
      Comment: request.body.Comment,
    };
    logger.debug(`Updating Assessment ${assessmentId} from Member ${memberId}`)
    memberStore.addComment(assessment, newComment);
    response.redirect("/dashboardMemberView/" + memberId);
  },*/

  /*deleteComment(request, response) {
    const memberId = request.params.id;
    const commentId = request.params.commentid;
    logger.debug(`Deleting Assessment ${commentId} from Member ${memberId}`);
    memberStore.removeComment(memberId, commentId);
    response.redirect("/member/" + memberId);
  },*/

  editMember(request, response) {
    const memberId = request.params.id;
    logger.debug(`Editing Member ${memberId}`);
    const viewData = {
      title: "Edit Member",
      member: memberStore.getMember(memberId),
    };
    response.render("settings", viewData);
  },

  update(request, response) {
    const memberId = request.params.id;
    const member = memberStore.getMember(memberId)
    const newMember = {
      firstName: request.body.firstName,
      lastName: request.body. lastName,
      address: request.body.address,
      gender: request.body.gender,
      email: request.body.email,
      password: request.body.password,
    };
    logger.debug(`Updating Member Info ${memberId} from Member ${memberId}`);
    memberStore.updateMember(member, newMember);
    response.redirect("/member/" + memberId);
  }
};

module.exports = member;
