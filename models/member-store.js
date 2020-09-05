"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");

const memberStore = {
  store: new JsonStore("./models/member-store.json", {
    memberCollection: []
  }),
  collection: "memberCollection",

  getAllMembers() {
    return this.store.findAll(this.collection);
  },

  getMember(id) {
    return this.store.findOneBy(this.collection, { id: id});
  },
  getMembers(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },
  getUserMembers(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },
  getMemberByEmail(email) {
    return this.store.findOneBy(this.collection, { email: email });
  },

  registerMember(member) {
    this.store.add(this.collection, member);
    this.store.save();
  },

  addMember(member) {
    this.store.add(this.collection, member);
    this.store.add(this.member, {assessments:[]});
    this.store.save();
  },

  removeMember(id) {
    const member = this.getMember(id);
    this.store.remove(this.collection, member);
    this.store.save();
  },

  removeAllMembers() {
    this.store.removeAll(this.collection);
    this.store.save();
  },

  updateMember(member, updatedMember) {
    member.firstName = updatedMember.firstName;
    member.lastName = updatedMember.lastName;
    member.address = updatedMember.address;
    member.gender = updatedMember.gender;
    member.email = updatedMember.email;
    member.password=updatedMember.password;
    this.store.save();
  },

  addAssessment(id, assessment) {
    const member = this.getMember(id);
    member.assessments.unshift(assessment);
    this.store.save();
  },

  removeAssessment(id, assessmentId) {
    const member = this.getMember(id);
    const assessments = member.assessments;
    _.remove(assessments, { id: assessmentId });
    this.store.save();
  },

  getAssessment(id, assessmentId) {
    const member = this.store.findOneBy(this.collection, { id: id });
    const assessments = member.assessments.filter(assessment => assessment.id == assessmentId);
    return assessments[0];
  },

  getAllAssessment() {
    return this.store.findAll(this.collection);
  },

  updateAssessment(assessment, updatedAssessment) {
    assessment.Weight = updatedAssessment.Weight;
    assessment.Chest = updatedAssessment.Chest;
    assessment.Thigh = updatedAssessment.Thigh;
    assessment.UpperArm = updatedAssessment.UpperArm;
    assessment.Waist = updatedAssessment.Waist;
    assessment.Hips = updatedAssessment.Hips;
    this.store.save();
  },



  addComment(assessment, addComment) {
    assessment.Comment = addComment.Comment;
    this.store.save();
  },

  removeComment(id) {
    const member = this.getAssessment(id);
    this.store.remove(this.collection, member);
    this.store.save();
  },
  memberCheckPassword(password) {
    return this.store.findOneBy(this.collection, { password: password });
  },

}

module.exports = memberStore;
