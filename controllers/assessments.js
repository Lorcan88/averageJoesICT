"use strict";

const logger = require("../utils/logger");
const memberStore = require("../models/member-store");

const assessment = {
  index(request, response) {
    const memberId = request.params.id;
    const assessmentId = request.params.assessmentid;
    logger.debug(`Editing assessment ${assessmentId} from Member ${memberId}`);
    const viewData = {
      title: "Edit Assessment",
      member: memberStore.getMember(memberId),
      assessment: memberStore.getAssessment(memberId, assessmentId)
    };
    response.render("assessment", viewData);
  },

  update(request, response) {
    const memberId = request.params.id;
    const assessmentId = request.params.assessmentid;
    const assessment = memberStore.getAssessment(memberId, assessmentId)
    const newAssessment = {
      Weight: request.body.Weight,
      Chest: request.body.Chest,
      Thigh: request.body.Thigh,
      UpperArm: request.body.UpperArm,
      Waist: request.body.Waist,
      Hips: request.body.Hips,
    };
    logger.debug(`Updating Assessment ${assessmentId} from Member ${memberId}`);
    memberStore.updateAssessment(assessment, newAssessment);
    response.redirect("/member/" + memberId);
  }
};

module.exports = assessment;
