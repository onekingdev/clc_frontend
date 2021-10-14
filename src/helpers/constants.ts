// API paths
export const apiCloudHostUrl =
  "https://us-central1-chipleadercoaching-webapp.cloudfunctions.net";
export const apiStagingHostUrl =
  "https://us-central1-staging-clc.cloudfunctions.net";
export const apiLocalhostUrl = "/chipleadercoaching-webapp/us-central1";
export const apiGetUserByEmail = "getUserByEmail";
export const apiCreateUser = "createUser";
export const apiValidateCode = "validateCode";
export const apiGetLibrary = "getLibrary";
export const apiPathsEndpoint = "getPaths";
export const apiSaveEarnings = "saveEarnings";
export const apiGetQuestions = "getQuestions";
export const apiGetAIQuestions = "getQuestionsAI";
export const apiGetAssessment = "getQuestionsAssessment";
export const apiLevelUp = "levelUp";
export const apiDropQuestions = "dropQuestions";
export const apiDropLessons = "dropLessons";
export const apiDropTopics = "dropTopics";
export const apiDropLibrary = "dropLibrary";
export const apiUploadLibrary = "uploadLibrary";
export const apiUploadContent = "uploadContent";
export const apiUploadGlossary = "uploadGlossary";
export const apiUploadEvents = "uploadEvents";
export const apiGetGlossary = "getGlossary";
export const apiGetEvents = "getEvents";
export const apiGetWeeklyHandBreakdown = "getWeeklyHandBreakdown";
export const apiGetSpotlight = "getSpotlight";
export const apiDropGlossary = "dropGlossary";
export const apiDropEvents = "dropEvents";
export const apiGetQuestionsProgressbar = "getQuestionsProgressbar";
export const apiFinishAssessment = "finishAssessment";
export const apiUpdateUser = "updateUser";
export const apiUpdateMasteredLessons = "updateMasteredLessons";
export const apiBuyTopic = "buyTopic";
export const apiPaymentSubscription = "paymentSubscription";
export const apiCancelSubscription = "cancelSubscription";
export const apiUpdatePaymentDetails = "updatePaymentDetails";

// front end messages
export const emptyEmailString = "Email required";
export const invalidEmailString = "Not valid Email";
export const notFoundEmailString = "Email not found";
export const emptyPasswordString = "Password required";
export const resetPasswordEmailSent =
  "We sent you a email to reset your password!";
export const emptyActivationCode = "Activation code required";
export const emptyUserName = "Username required";
export const passwordsDoNotMatch = "Passwords do not match";
export const libraryUploadError = "Error when uploading library content data";
export const questionsUploadError =
  "Error when uploading question content data";
export const glossaryUploadError = "Error when uploading glossary content data";
export const eventsUploadError = "Error when uploading events content data";

//other
export const bugTrackerScript = `https://learnwithsocrates.atlassian.net/s/d41d8cd98f00b204e9800998ecf8427e-T/o2joag/b/24/a44af77267a987a660377e5c46e0fb64/_/download/batch/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector/com.atlassian.jira.collector.plugin.jira-issue-collector-plugin:issuecollector.js?locale=en-US&collectorId=acf871b7`;

export enum Role {
  Free = "EARLYADOPTER",
  Premium = "PREMIUM2021",
}
