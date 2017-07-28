var chai;
var sinon;
var sinonChai;
var expect;

var $;
var Module;
var jsdom;

// for running from terminal
if (typeof exports === 'object') {
  sinon = require('sinon');
  sinonChai = require('sinon-chai');
  chai = require('chai');
  expect = chai.expect;
  chai.use(sinonChai);

  jsdom = require('jsdom').jsdom;
  document = jsdom('<html><body></body></html>', {});
  window = document.defaultView;

  Dropdown = require('../dropdown.js');

  $ = require('jquery');
} else {
  expect = chai.expect;
  Dropdown = window.Module;
  $ = window.jQuery;
}

describe('Module', function() {

});