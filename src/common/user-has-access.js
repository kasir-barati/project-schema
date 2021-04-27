// @ts-check
const { UnauthorizedAccess } = require('./error-response');

/**
 *
 * @param {string} resource resource name
 * @param {string} userId
 * @param {object} searchedBy
 * @param {string} searchedBy.fieldName
 * @param {string} searchedBy.fieldValue
 * @throws {UnauthorizedAccess}
 */
function userHasAccess(resource, userId, searchedBy) {
    const { fieldName, fieldValue } = searchedBy;
    if (fieldValue !== userId) {
        throw new UnauthorizedAccess(resource, {
            fieldName,
            fieldValue,
            userId,
        });
    }
}

/**
 *
 * @param {string[]} departmentMembers
 * @param {string} adminId
 */
function adminIsInDepartment(departmentMembers, adminId) {
    if (!departmentMembers.includes(adminId)) {
        // TODO: add the action, user wants to do what and s/he does not have the right access
        throw new UnauthorizedAccess('ticket', {
            fieldName: 'department.members',
            fieldValue: departmentMembers,
            userId: adminId,
        });
    }
}

module.exports = {
    userHasAccess,
    adminIsInDepartment,
};
