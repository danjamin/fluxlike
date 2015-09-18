var Dispatcher = require('./Dispatcher.js');
var ActionTypes = require('./ActionTypes.js');

module.exports = {
  setTemplate: function (template) {
    Dispatcher.dispatch({
      type: ActionTypes.SET_TEMPLATE,
      template: template
    });
  },

  clearSelectedItems: function () {
    Dispatcher.dispatch({
      type: ActionTypes.CLEAR_SELECTED_ITEMS
    });
  },

  resetStores: function () {
    Dispatcher.dispatch({
      type: ActionTypes.RESET
    });
  }
};
