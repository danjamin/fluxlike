/* global __serializedData__ */

var React = require('react');

var Router = require('./Router.js');
var ActionCreators = require('./ActionCreators.js');
var Serializer = require('./Serializer.js');
var RootView = require('./RootView.js');

var _alreadyInit = false;
var _isServerSide = false;

module.exports = {
  init: function (routes, configFn, isServerSide) {
    if (_alreadyInit) {
      return;
    }

    _isServerSide = isServerSide;
    _alreadyInit = true;

    configFn(_isServerSide);

    if (!_isServerSide && typeof __serializedData__ === 'object') {
      Serializer.deserialize(__serializedData__);
    }

    // register beforeEach route callback
    Router.beforeEach(function (name) {
      ActionCreators.clearSelectedItems();
    });

    // Start routing
    Router.start(routes, {
      pushState: true,
      root: '/',
      isServerSide: isServerSide
    });

    if (!_isServerSide) {
      // Render app into DOM (client side)
      React.render(
        React.createElement(RootView),
        document.getElementById('app')
      );
    }
  },

  getSerializedData: function () {
    var data = {};

    if (!_isServerSide) {
      return data;
    }

    return Serializer.serialize();
  }
};
