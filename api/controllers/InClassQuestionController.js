/**
 * InClassQuestionController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

  create: function(req, res) {
    var type = "";
    var typeParam = req.param("type");
    if (typeof(typeParam) === "number") {
      if (typeParam === 0) type = "TRUE_FALSE";
      else if (typeParam === 1) type = "MULTIPLE_CHOICE";
      else if (typeParam === 2) type = "FREE_RESPONSE";
    } else if (typeof(typeParam) === "string") {
      type = typeParam;
    }

    InClassQuestion.create({
      text: req.param("text"),
      type: type,
      choices: (type === "MULTIPLE_CHOICE" ? req.param("choices") : [])
    }, function(err, model) {
      if (err) return res.send(err, 500);

      InClassQuestion.publishCreate({
        id: model.id,
        text: model.text,
        type: model.type,
        choices: model.choices
      });

      res.json(model);
    });
  },

  close: function(req, res) {
    var id = req.param("id");

    InClassQuestion.findOne(id).done(function(err, question) {
      if (err) return res.send(err, 500);
      if (!question) return res.send("no question with id " + id, 500);
      question.isOpen = false;
      question.save(function(err){
        if (err) return res.send(err, 500);

        InClassQuestion.publishUpdate(question.id, {
          isOpen: question.isOpen
        });
        return res.json(question);
      });
    });
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to InClassQuestionController)
   */
  _config: {}

};

