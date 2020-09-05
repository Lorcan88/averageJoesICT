"use strict";

const userStore = require("../models/user-store");
const memberStore = require("../models/member-store");
const logger = require("../utils/logger");
const uuid = require("uuid");
const assessments=[];


const accounts = {
  index(request, response) {
    const viewData = {
      title: "Login or Signup"
    };
    response.render("index", viewData);
  },

  login(request, response) {
    const viewData = {
      title: "Login to the Service"
    };
    response.render("login", viewData);
  },

  logout(request, response) {
    response.cookie("member", "");
    response.redirect("/");
  },

  signup(request, response) {
    const viewData = {
      title: "Login to the Service"
    };
    response.render("signup", viewData);
  },

  register(request, response) {
    const member = request.body;
    member.id = uuid.v1();
    member.userid = uuid.v1();
    member.assessments=assessments;
    memberStore.addMember(member);
    logger.info(`registering ${member.email}`);
    response.redirect("/");
  },

  authenticate(request, response) {
    const user = userStore.getUserByEmail(request.body.email);
    const member = memberStore.getMemberByEmail(request.body.email);
    if (user&& userStore.userCheckPassword(request.body.password)) {
      response.cookie("member", user.email);
      logger.info(`logging in ${user.email}`);
      response.redirect("/dashboard");
    }
    else if (member && memberStore.memberCheckPassword(request.body.password)) {
      response.cookie("memberView", member.email, member.id);
      logger.info(`logging in ${member.email},${member.id}`);
      response.redirect("/member/" + member.id);
    } else {
      response.redirect("/login");
    }
  },
  getCurrentUser(request) {
    const userEmail = request.cookies.member;
    return userStore.getUserByEmail(userEmail);
  },
  getCurrentMember(request) {
    const memberEmail = request.cookies.member;
    return memberStore.getMemberByEmail(memberEmail);
  }
};

module.exports = accounts;
