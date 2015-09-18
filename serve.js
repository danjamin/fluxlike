/* global __dirname */

import React from 'react';
import express from 'express';
import fs from 'fs';
import _ from 'underscore';

import Router from './lib/Router.js';
import bootstrap from './lib/bootstrap.js';
import ActionCreators from './lib/ActionCreators.js';
import RootView from './lib/RootView.js';

var BUILD_DIR = '_build';
var BUILD_JS_DIR = '_build_js';

export default function serve(routes, configFn, options) {
  var app = express();

  options = _.extendOwn({
    debug: true,
    port: '5000'
  }, options);

  // Set the port
  app.listen(options.port, function () {
    if (options.debug) {
      console.log('Node app is running at localhost:' + options.port);
    }
  });

  // Setup /public access
  app.use(express['static'](BUILD_DIR));
  app.use(express['static'](BUILD_JS_DIR));

  // init the app
  bootstrap.init(routes, configFn, true /*isServerSide*/);

  // Deliver index.html with pre-rendered content
  // catch all route!
  app.get('*', function (req, res) {
    var url = req.path.substr(1);

    if (options.debug) {
      console.log('serving url', url ? url : '/');
    }

    res.setHeader("Cache-Control", "no-cache");

    fs.readFile(__dirname + '/200.html', 'utf8', function(err, data) {
      var title = '',
        content = '',
        serializedData = '""';

      if (err) {
        console.error(err);
        res.sendStatus(500);
      }

      try {
        ActionCreators.resetStores();
        Router.linkToURL(url).then(function () {
          try {
            content = React.renderToString(React.createElement(RootView));
            serializedData = bootstrap.getSerializedData();
          } catch (e) {
            console.error(e, e.stack);
          } finally {
            _send();
          }
        })['catch'](function (e) {
          console.error(e, e.stack);
          _send();
        });
      } catch (e) {
        console.error(e, e.stack);
        res.sendStatus(404);
      }

      function _send () {
        data = data.replace('{{title}}', title);
        data = data.replace('{{content}}', content);
        data = data.replace('{{data}}', serializedData);
        res.send(data);
      }
    });
  });
}
