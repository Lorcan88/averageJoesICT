"use strict";
const _ = require("lodash");
const memberStore = require("../models/member-store.js");


const gymUtility = {

  bmiCalculator(id ) {
    const member = memberStore.getMember(id);
    const assessments = member.assessments;
    let BMI;
    if (assessments.length !==0){
      BMI = (assessments[0].Weight / ((member.height/100) * (member.height/100))).toFixed(2)
    }
    else { BMI = (member.startingWeight / ((member.height/100) * (member.height/100))).toFixed(2)}

    return BMI;
  },

  determineBMICategory(id){
    const BMI = this.bmiCalculator(id);
    if (BMI < 16){
      return "SEVERELY UNDERWEIGHT";
    }
    if (BMI >= 16 && BMI <= 18.5){
      return "UNDERWEIGHT";
    }
    if (BMI >=18.5 && BMI <= 25){
      return "NORMAL";
    }
    if (BMI >= 25 && BMI <= 30){
      return "OVERWEIGHT";
    }
    if (BMI >= 30 && BMI <= 35){
      return "MODERATELY OBESE";
    }
    if (BMI > 35){
      return "SEVERELY OBESE";
    }
  },

  isIdealBodyWeight(id) {
    let isIdealBodyWeight = false;
    let bmi =  this. bmiCalculator(id);
    if(bmi >= 18.5 && bmi <= 24.9){
      isIdealBodyWeight = true;
    }
    return isIdealBodyWeight;
  },


  trend(id) {
    const member = memberStore.getMember(id);
    const assessments = member.assessments;
    let trend =false ;
    let weight;
    if (assessments.length >=1) {
      weight = assessments[0].Weight;
    //trend = true;
    }
     /*if (assessments.length >1) {
      trend = (assessments[assessments.length-2].Weight > assessments[assessments.length-1].weight);
    trend = true;
     }*/
    //else {
      //weight = member.startingWeight;
   // }

    if ( member.startingWeight > weight ){
    trend=true;
    }
    return trend;
  }

}

module.exports = gymUtility;
