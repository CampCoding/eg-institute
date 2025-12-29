import React from "react";
import LearningMaterials from "./Components/LearningMatrial";
import GroupClasses from "./Components/GroupClasses";
import CancellationPolicy from "./Components/Cancellation";
import PaymentsSafetyPolicy from "./Components/Paymeny";
import RefundAndActivationPolicies from "./Components/Refund_Package";
import ClassroomEtiquette from "./Components/ClassRoom";
import TechnicalRequirements from "./Components/Requirements";
import ChangingYourTeacher from "./Components/ChangingTeacher";
import OneToOnePrivateClasses from "./Components/One-one";

export default function Terms() {
  return (
    <>
      <LearningMaterials />
      <GroupClasses />
      <OneToOnePrivateClasses/>
      <CancellationPolicy />
      <ChangingYourTeacher />
      <PaymentsSafetyPolicy />
      <RefundAndActivationPolicies />
      <ClassroomEtiquette />
      <TechnicalRequirements />
    </>
  );
}
