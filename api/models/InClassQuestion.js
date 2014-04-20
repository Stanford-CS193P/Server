/**
 * InClassQuestion
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

// TODO: potentially make this a base class with question-type subclasses.
// Chose this method for speed of development.
module.exports = {

  attributes: {

    text: {
      type: "STRING",
      required: true
    },

    type: {
      type: "STRING",
      required: true,
      in: ["TRUE_FALSE", "MULTIPLE_CHOICE", "FREE_RESPONSE"]
    },

    choices: {
      type: "ARRAY"
    },

    isOpen: {
      type: "boolean",
      defaultsTo: true
    }

  },

  publishMostRecentOpenUnansweredQuestion: function(socket, identifierForVendor) {
    InClassQuestion.findOne()
      .where({ isOpen: true })
      .sort("createdAt DESC")
      .done(function(err, question) {
        if (err || !question) return;

        InClassQuestionResponse.findOne()
          .where({
            questionID: question.id,
            identifierForVendor: identifierForVendor
          }).done(function(err, response) {
            if (err) return;

            // device has already submitted response
            if (response) return;

            InClassQuestion.subscribe(socket, question);

            // There wasn't a way to send a message to just one socket through
            // sails (http://sailsjs.org/#!documentation/sockets), so we create
            // the message manually.
            socket.emit('message', {
              id:question.id,
              model:'inclassquestion',
              verb:'create',
              data: {
                id: question.id,
                text: question.text,
                type: question.type,
                choices: question.choices
              }
            });
          });
      });
  }

};
