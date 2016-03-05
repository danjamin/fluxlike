var _ = require('underscore');

var Store = require('./Store.js');
var Dispatcher = require('./Dispatcher.js');
var ActionTypes = require('./ActionTypes.js');

var RootStore;

var _template;

function _setTemplate(template) {
  _template = template;
}

RootStore = _.extend({}, Store, {
  getTemplate: function () {
    return _template;
  }
});

// Register callback with dispatcher and save dispatchToken
RootStore.dispatchToken = Dispatcher.register(function (action) {
  switch (action.type) {
    case ActionTypes.SET_TEMPLATE:
      _setTemplate(action.template);
      RootStore.emitChange();
      break;

    default:
      // do nothing
  }
});

module.exports = RootStore;
