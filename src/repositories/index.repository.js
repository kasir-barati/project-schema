// @ts-check
const { SchemaModel } = require('../schemas/test-schema.schema');

/**
 *
 * @param {string} id
 * @returns {Promise<{schema: {_id: string, fieldName: string}}>}
 */
async function findSchemaById(id) {
    const schema = await SchemaModel.findById(id);

    return {
        schema: {
            _id: schema.id,
            fieldName: schema.fieldName,
        },
    };
}

const schemaRepository = { findSchemaById };

module.exports = { schemaRepository };
