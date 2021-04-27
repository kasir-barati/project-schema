// @ts-check

class ErrorResponse {
    /**
     *
     * @param {string} errorName
     * @param {string} message
     * @param {boolean} successful
     * @param {number} statusCode
     */
    constructor(errorName, message, successful, statusCode) {
        this.errorName = errorName;
        this.message = message;
        this.successful = successful;
        this.statusCode = statusCode;
    }
}

class UnprocessableEntry extends ErrorResponse {
    /** @param {string[]} validationErrors */
    constructor(validationErrors) {
        super(
            'E_EXPRESS_VALIDATOR',
            'Express validator throw error on these fields',
            false,
            422,
        );
        this.validationErrors = validationErrors;
    }
}

class DocumentNotFound extends ErrorResponse {
    /**
     *
     * @param {string} collectionName
     * @param {object} searchedBy
     * @param {string} searchedBy.fieldName
     * @param {string} searchedBy.fieldValue
     */
    constructor(collectionName, searchedBy) {
        super(
            'DOCUMENT_NOT_FOUND',
            'The searched document does not exists in Database.',
            false,
            404,
        );
        this.searchedBy = searchedBy;
        this.collectionName = collectionName.toUpperCase();
    }
}

class ForeignKeyConstraintsError extends ErrorResponse {
    /**
     *
     * @param {string} collectionName
     * @param {object} searchedBy
     * @param {string} searchedBy.fieldName
     * @param {string} searchedBy.fieldValue
     */
    constructor(collectionName, searchedBy) {
        super(
            'FOREIGN_KEY_CONSTRAITS_ERROR',
            'Foreign key does not found',
            false,
            404,
        );
        this.searchedBy = searchedBy;
        this.collectionName = collectionName.toUpperCase();
    }
}

class UnauthorizedAccess extends ErrorResponse {
    /**
     *
     * @param {string} resource
     * @param {object} searchedBy
     * @param {string} searchedBy.fieldName
     * @param {string|string[]} searchedBy.fieldValue
     * @param {string} searchedBy.userId
     */
    constructor(resource, searchedBy) {
        super(
            'UNAUTHORIZED_ACCESS_TO_RESOURCE',
            'Unauthorized access to the resource',
            false,
            403,
        );
        this.searchedBy = searchedBy;
        this.resource = resource.toUpperCase();
    }
}

class MemberNotFound extends ErrorResponse {
    /**
     *
     * @param {string} searchedValue
     */
    constructor(searchedValue) {
        super(
            'MEMBER_NOT_FOUND',
            'Member does not exists in the specified ticket department',
            false,
            422,
        );
        this.searchedValue = searchedValue;
        this.validationErrors = ['ASSIGNE_TO_NOT_FOUND'];
    }
}

class MemberDeletionInUpdating extends ErrorResponse {
    /**
     * @param {string} resourceId
     * @param {string} memberId
     */
    constructor(resourceId, memberId) {
        super(
            'MEMBER_DELETION_IN_UPDATING',
            'An update request tries to remove a member',
            false,
            422,
        );
        this.resourceId = resourceId;
        this.memberId = memberId;
    }
}

class MemberDoesNotExists extends ErrorResponse {
    /**
     *
     * @param {string} resourceId
     * @param {string} memberId
     */
    constructor(resourceId, memberId) {
        super(
            'MEMBER_DOES_NOT_EXISTS',
            'Member does not exists in database',
            false,
            404,
        );
        this.resourceId = resourceId;
        this.memberId = memberId;
    }
}

class TicketIsClose extends ErrorResponse {
    /**
     *
     * @param {string} resourceId
     */
    constructor(resourceId) {
        super(
            'TICKET_IS_CLOSE',
            'Ticket is close, you can not close it again',
            false,
            403,
        );
        this.resource = 'ticket';
        this.resourceid = resourceId;
    }
}

module.exports = {
    TicketIsClose,
    ErrorResponse,
    MemberNotFound,
    DocumentNotFound,
    UnprocessableEntry,
    UnauthorizedAccess,
    MemberDoesNotExists,
    MemberDeletionInUpdating,
    ForeignKeyConstraintsError,
};
