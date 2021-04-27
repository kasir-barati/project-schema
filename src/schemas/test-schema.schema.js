// @ts-check
const { Schema, model } = require('mongoose');

const COLLECTION_NAME = 'test';

const schemaName = new Schema(
    {
        fieldName: String,
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    },
);

class SchemaName {
    static staticMethods() {}
    regularMethods() {}
    get fullname() {
        return this.name + this.family;
    }

    /**
     * @param {string} fullname
     */
    set fullname(fullname) {
        this.name = fullname.split(' ')[0];
        this.family = fullname.split(' ')[1];
    }
}

schemaName.loadClass(SchemaName);

const SchemaModel = model(COLLECTION_NAME, schemaName);

module.exports = { schemaName, SchemaModel };
