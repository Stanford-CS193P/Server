/**
 * InClassStudentResponse
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

    rating: {
      type: "FLOAT",
      required: true
    },

    // An alphanumeric string that uniquely identifies a device to the app's
    // vendor.
    identifierForVendor: {
      type: "STRING",
      required: true
    },

    conceptID: {
      type: "STRING",
      required: true
    },
    conceptName: {
      type: "STRING",
      required: true
    }
  }

};
