/**
 * InClassConcept
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    conceptName: {
      type: "STRING",
      required: true
    }
  },

  publishMostRecentConceptFromToday: function(socket) {
    var d = new Date();
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);

    InClassConcept
      .find()
      .where({ createdAt: { '>=': d }})
      .sort("createdAt DESC")
      .limit(1)
      .done(function(err, conceptArr) {
        if (conceptArr.length === 0) return;

        // There wasn't a way to send a message to just one socket through
        // sails (http://sailsjs.org/#!documentation/sockets), so we create
        // the message manually.
        var concept = conceptArr[0];
        socket.emit('message', {
          id:concept.id,
          model:'inclassconcept',
          verb:'create',
          data: {
            id:concept.id,
            conceptName:concept.conceptName
          }
        });
      });
  }

};
