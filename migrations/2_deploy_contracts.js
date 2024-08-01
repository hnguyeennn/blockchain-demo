// migrations/2_deploy_contracts.js
const StudentManagement = artifacts.require("StudentManagement");

module.exports = function (deployer) {
    deployer.deploy(StudentManagement);
};


