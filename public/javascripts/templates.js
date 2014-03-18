
jade = (function(exports){
/*!
 * Jade - runtime
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Lame Array.isArray() polyfill for now.
 */

if (!Array.isArray) {
  Array.isArray = function(arr){
    return '[object Array]' == Object.prototype.toString.call(arr);
  };
}

/**
 * Lame Object.keys() polyfill for now.
 */

if (!Object.keys) {
  Object.keys = function(obj){
    var arr = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        arr.push(key);
      }
    }
    return arr;
  }
}

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = function merge(a, b) {
  var ac = a['class'];
  var bc = b['class'];

  if (ac || bc) {
    ac = ac || [];
    bc = bc || [];
    if (!Array.isArray(ac)) ac = [ac];
    if (!Array.isArray(bc)) bc = [bc];
    ac = ac.filter(nulls);
    bc = bc.filter(nulls);
    a['class'] = ac.concat(bc).join(' ');
  }

  for (var key in b) {
    if (key != 'class') {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Filter null `val`s.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function nulls(val) {
  return val != null;
}

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} escaped
 * @return {String}
 * @api private
 */

exports.attrs = function attrs(obj, escaped){
  var buf = []
    , terse = obj.terse;

  delete obj.terse;
  var keys = Object.keys(obj)
    , len = keys.length;

  if (len) {
    buf.push('');
    for (var i = 0; i < len; ++i) {
      var key = keys[i]
        , val = obj[key];

      if ('boolean' == typeof val || null == val) {
        if (val) {
          terse
            ? buf.push(key)
            : buf.push(key + '="' + key + '"');
        }
      } else if (0 == key.indexOf('data') && 'string' != typeof val) {
        buf.push(key + "='" + JSON.stringify(val) + "'");
      } else if ('class' == key && Array.isArray(val)) {
        buf.push(key + '="' + exports.escape(val.join(' ')) + '"');
      } else if (escaped && escaped[key]) {
        buf.push(key + '="' + exports.escape(val) + '"');
      } else {
        buf.push(key + '="' + val + '"');
      }
    }
  }

  return buf.join(' ');
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

exports.escape = function escape(html){
  return String(html)
    .replace(/&(?!(\w+|\#\d+);)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
};

/**
 * Re-throw the given `err` in context to the
 * the jade in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @api private
 */

exports.rethrow = function rethrow(err, filename, lineno){
  if (!filename) throw err;

  var context = 3
    , str = require('fs').readFileSync(filename, 'utf8')
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Jade') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};

  return exports;

})({});

jade.templates = {};
jade.render = function(node, template, data) {
  var tmp = jade.templates[template](data);
  node.innerHTML = tmp;
};

jade.templates["filterBar"] = function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="row"><div data-statname="grades" data-step-value="1" class="col-md-2 filter-item"><span class="filter-label">Grade Level: <input class="input-sm form-control flat label-value value-min"/><span class="theto">to</span><input class="input-sm form-control flat label-value value-max"/></span><div class="slider-stat ui-slider"></div></div><div data-statname="diversity" data-step-value="1" class="col-md-2 filter-item"><span class="filter-label">Diversity: <input class="input-sm form-control flat label-value value-min"/><span class="theto">to</span><input class="input-sm form-control flat label-value value-max"/></span><div class="slider-stat ui-slider"></div></div><div data-statname="capitaIncome" data-step-value="5000" class="col-md-2 filter-item"><span class="filter-label">Income: <input class="input-sm form-control flat label-value value-min"/><span class="theto">to</span><input class="input-sm form-control flat label-value value-max"/></span><div class="slider-stat ui-slider"></div></div><div data-statname="poverty" data-step-value="1" class="col-md-2 filter-item"><span class="filter-label">Poverty:<input class="input-sm form-control flat label-value value-min"/><span class="theto">to</span><input class="input-sm form-control flat label-value value-max"/></span><div class="slider-stat ui-slider"></div></div><div data-statname="snapPercent" data-step-value="1" class="col-md-2 filter-item"><span class="filter-label">Food Aid: <input class="input-sm form-control flat label-value value-min"/><span class="theto">to</span><input class="input-sm form-control flat label-value value-max"/></span><div class="slider-stat ui-slider"></div></div><div data-statname="unemployed" data-step-value="1" class="col-md-2 filter-item"><span class="filter-label">Unemployment: <input class="input-sm form-control flat label-value value-min"/><span class="theto">to</span><input class="input-sm form-control flat label-value value-max"/></span><div class="slider-stat ui-slider"></div></div></div>');
}
return buf.join("");
}
jade.templates["find"] = function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<!DOCTYPE html><html><head><title>');
var __val__ = title
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</title><link rel="stylesheet" type="text/css" href="http://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.1.0/css/bootstrap.min.css"><link href="/stylesheets/flat-ui.css" rel="stylesheet"><link rel="stylesheet" href="/stylesheets/main.css"></head><body><div class="navbar navbar-inverse navbar-fixed-top"><div class="container"><div class="navbar-header"><button type="button" data-toggle="collapse" data-target="#navbar-collapse-main" class="navbar-toggle"><span class="sr-only">Toggle Nav</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><span class="navbar-brand">Feed Dem Kids</span></div><div id="navbar-collapse-main" class="collapse navbar-collapse"><ul class="nav nav-pills nav-justified"><li><a href="#">Home</a></li><li><a href="#">Trending</a></li><li><a href="#">Find My School</a></li><li><a href="#">Maps</a></li><li><a href="#">About</a></li></ul></div></div></div><div class="row search-tools"><div class="col-md-5 col-md-offset-1"><div class="input-group"><input id="search-bar" type="text" placeholder="Search by School Name..." class="form-control"><span class="input-group-btn"><button id="search-button" type="button" class="btn bth-default"><span class="glyphicon glyphicon-search"></span></button></span></div></div><div class="col-md-1 or-elem"><p>OR</p></div><div class="col-md-3"><select id="browse-state" class="form-control"><option value="0" selected="selected">- Browse by State -</option></select></div></div><div id="search-divider" class="row"></div><div id="query-menu" class="row"></div><div id="search-filters" class="row"></div><div class="row"><div id="search-results" class="col-md-8 col-md-offset-2"></div></div><div id="pagination" class="row"></div><script src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min.js"></script><script src="/javascripts/jquery-1.8.3.min.js"></script><script src="/javascripts/jquery-ui-1.10.3.custom.min.js"></script><script src="/javascripts/jquery.ui.touch-punch.min.js"></script><script src="/javascripts/bootstrap.min.js"></script><script src="/javascripts/bootstrap-select.js"></script><script src="/javascripts/bootstrap-switch.js"></script><script src="/javascripts/flatui-checkbox.js"></script><script src="/javascripts/flatui-radio.js"></script><script src="/javascripts/jquery.tagsinput.js"></script><script src="/javascripts/jquery.placeholder.js"></script><script src="/javascripts/templates.js"></script><script src="/javascripts/application.js"></script><script src="/javascripts/findClient.js"></script></body></html>');
}
return buf.join("");
}
jade.templates["index"] = function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<!DOCTYPE html><html><head><title>');
var __val__ = title
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</title><link rel="stylesheet" type="text/css" href="http://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.1.0/css/bootstrap.min.css"><link href="/stylesheets/flat-ui.css" rel="stylesheet"><link rel="stylesheet" href="/stylesheets/main.css"></head><body><div class="navbar navbar-inverse navbar-fixed-top"><div class="container"><div class="navbar-header"><button type="button" data-toggle="collapse" data-target="#navbar-collapse-main" class="navbar-toggle"><span class="sr-only">Toggle Nav</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><span class="navbar-brand">Feed Dem Kids</span></div><div id="navbar-collapse-main" class="collapse navbar-collapse"><ul class="nav nav-pills nav-justified"><li><a href="#">Home</a></li><li><a href="#">Trending</a></li><li><a href="#">Find My School</a></li><li><a href="#">Maps</a></li><li><a href="#">About</a></li></ul></div></div></div><h1>');
var __val__ = title
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</h1><p>Welcome to ' + escape((interp = title) == null ? '' : interp) + '</p><script src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min.js"></script><script src="/javascripts/jquery-1.8.3.min.js"></script><script src="/javascripts/jquery-ui-1.10.3.custom.min.js"></script><script src="/javascripts/jquery.ui.touch-punch.min.js"></script><script src="/javascripts/bootstrap.min.js"></script><script src="/javascripts/bootstrap-select.js"></script><script src="/javascripts/bootstrap-switch.js"></script><script src="/javascripts/flatui-checkbox.js"></script><script src="/javascripts/flatui-radio.js"></script><script src="/javascripts/jquery.tagsinput.js"></script><script src="/javascripts/jquery.placeholder.js"></script><script src="/javascripts/templates.js"></script><script src="/javascripts/application.js"></script></body></html>');
}
return buf.join("");
}
jade.templates["layout"] = function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<!DOCTYPE html><html><head><title>');
var __val__ = title
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</title><link rel="stylesheet" type="text/css" href="http://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.1.0/css/bootstrap.min.css"><link href="/stylesheets/flat-ui.css" rel="stylesheet"><link rel="stylesheet" href="/stylesheets/main.css"></head><body><div class="navbar navbar-inverse navbar-fixed-top"><div class="container"><div class="navbar-header"><button type="button" data-toggle="collapse" data-target="#navbar-collapse-main" class="navbar-toggle"><span class="sr-only">Toggle Nav</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><span class="navbar-brand">Feed Dem Kids</span></div><div id="navbar-collapse-main" class="collapse navbar-collapse"><ul class="nav nav-pills nav-justified"><li><a href="#">Home</a></li><li><a href="#">Trending</a></li><li><a href="#">Find My School</a></li><li><a href="#">Maps</a></li><li><a href="#">About</a></li></ul></div></div></div><script src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min.js"></script><script src="/javascripts/jquery-1.8.3.min.js"></script><script src="/javascripts/jquery-ui-1.10.3.custom.min.js"></script><script src="/javascripts/jquery.ui.touch-punch.min.js"></script><script src="/javascripts/bootstrap.min.js"></script><script src="/javascripts/bootstrap-select.js"></script><script src="/javascripts/bootstrap-switch.js"></script><script src="/javascripts/flatui-checkbox.js"></script><script src="/javascripts/flatui-radio.js"></script><script src="/javascripts/jquery.tagsinput.js"></script><script src="/javascripts/jquery.placeholder.js"></script><script src="/javascripts/templates.js"></script><script src="/javascripts/application.js"></script></body></html>');
}
return buf.join("");
}
jade.templates["pagination"] = function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<ul class="pager"><li class="previous"><a href="#"><i class="fui-arrow-left"></i></a></li><li class="pages"><div><span class="totalPages">' + escape((interp = pages) == null ? '' : interp) + '</span><span><em>of </em></span><input value="1" class="form-control flat"/></div></li><li class="next"><a href="#"><i class="fui-arrow-right"></i></a></li></ul>');
}
return buf.join("");
}
jade.templates["queryMenu"] = function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="col-md-12"><span><strong class="query-label">' + escape((interp = label) == null ? '' : interp) + '</strong><em class="query-value">' + escape((interp = value) == null ? '' : interp) + '</em></span><span');
buf.push(attrs({ 'id':('filter-button'), 'data-delay':({show: 1000, hide: 0}), 'data-animation':("true"), 'data-toggle':("tooltip"), 'title':("Show Filters"), "class": ('glyphicon') + ' ' + ('glyphicon-filter') }, {"data-delay":true,"data-animation":true,"data-toggle":true,"title":true}));
buf.push('></span><span class="filter-actions"><button id="reset-filter" class="btn btn-embossed btn-danger">Reset</button></span></div>');
}
return buf.join("");
}
jade.templates["results"] = function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
// iterate schools
;(function(){
  if ('number' == typeof schools.length) {
    for (var $index = 0, $$l = schools.length; $index < $$l; $index++) {
      var school = schools[$index];

buf.push('<div');
buf.push(attrs({ 'data-id':(school._id), "class": ('result-item') + ' ' + ('container') + ' ' + ('col-md-12') }, {"data-id":true}));
buf.push('><div class="row"><div class="col-md-3 school-search-pic"><img src="http://placehold.it/225x150"/></div><div class="col-md-6 school-search-prof"><ul class="list-group"><li class="list-group-item"><span class="badge">School</span>' + escape((interp = school.name) == null ? '' : interp) + '</li><li class="list-group-item"><span class="badge">District</span>' + escape((interp = school.agencyName) == null ? '' : interp) + '</li><li class="list-group-item"><span class="badge">State</span>' + escape((interp = school.stateFull) == null ? '' : interp) + '</li><li class="list-group-item"><span class="badge">$ Needed</span>Current Balance</li></ul></div><div class="col-md-2 col-md-offset-1 funding-status"><div class="empty-img">empty img</div><div class="fill-img">fill img</div></div></div></div>');
    }
  } else {
    for (var $index in schools) {
      var school = schools[$index];

buf.push('<div');
buf.push(attrs({ 'data-id':(school._id), "class": ('result-item') + ' ' + ('container') + ' ' + ('col-md-12') }, {"data-id":true}));
buf.push('><div class="row"><div class="col-md-3 school-search-pic"><img src="http://placehold.it/225x150"/></div><div class="col-md-6 school-search-prof"><ul class="list-group"><li class="list-group-item"><span class="badge">School</span>' + escape((interp = school.name) == null ? '' : interp) + '</li><li class="list-group-item"><span class="badge">District</span>' + escape((interp = school.agencyName) == null ? '' : interp) + '</li><li class="list-group-item"><span class="badge">State</span>' + escape((interp = school.stateFull) == null ? '' : interp) + '</li><li class="list-group-item"><span class="badge">$ Needed</span>Current Balance</li></ul></div><div class="col-md-2 col-md-offset-1 funding-status"><div class="empty-img">empty img</div><div class="fill-img">fill img</div></div></div></div>');
   }
  }
}).call(this);

}
return buf.join("");
}
jade.templates["school-profile"] = function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<!DOCTYPE html><html><head><title>');
var __val__ = title
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</title><link rel="stylesheet" type="text/css" href="http://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.1.0/css/bootstrap.min.css"><link href="/stylesheets/flat-ui.css" rel="stylesheet"><link rel="stylesheet" href="/stylesheets/main.css"></head><body><div class="navbar navbar-inverse navbar-fixed-top"><div class="container"><div class="navbar-header"><button type="button" data-toggle="collapse" data-target="#navbar-collapse-main" class="navbar-toggle"><span class="sr-only">Toggle Nav</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><span class="navbar-brand">Feed Dem Kids</span></div><div id="navbar-collapse-main" class="collapse navbar-collapse"><ul class="nav nav-pills nav-justified"><li><a href="#">Home</a></li><li><a href="#">Trending</a></li><li><a href="#">Find My School</a></li><li><a href="#">Maps</a></li><li><a href="#">About</a></li></ul></div></div></div><p>' + escape((interp = school) == null ? '' : interp) + ', ' + escape((interp = finance) == null ? '' : interp) + '</p><div id="profile-container"><div class="jumbotron clearfix"><div class="container"><div class="row"><div class="col-md-5"><img src="http://placehold.it/300x200"></div><div class="col-md-7"><ul class="list-group"><li class="list-group-item"><span class="badge">School</span>' + escape((interp = school.name) == null ? '' : interp) + '</li><li class="list-group-item"><span class="badge">District</span>' + escape((interp = school.agencyName) == null ? '' : interp) + '</li><li class="list-group-item"><span class="badge">Zip</span>' + escape((interp = school.zip) == null ? '' : interp) + '</li><li class="list-group-item"><span class="badge">State</span>' + escape((interp = school.stateFull) == null ? '' : interp) + '</li><li class="list-group-item"><a href="#">Link to school webpage</a></li></ul></div></div><div class="row"><div class="col-md-5"><table class="table-hover table-condensed"><tr><th>School Rank:</th><td>hold</td></tr><tr><th>School Deficit:</th><td>hold</td></tr><tr><th>Cost per Lunch:</th><td>hold</td></tr></table></div><div class="col-md-7"><table class="table-hover table-condensed"><tr><th>Ethnic: </th><td>hold</td></tr><tr><th>Median Income:</th><td>$' + escape((interp = finance.medianIncome) == null ? '' : interp) + '</td></tr><tr><th>Poverty: </th><td>' + escape((interp = finance.poverty) == null ? '' : interp) + '%</td></tr><tr><th>Food Aid: </th><td>' + escape((interp = finance.snapPercent) == null ? '' : interp) + '%</td></tr></table></div></div></div></div></div><div class="row"><div class="col-md-12"><div class="row"><div class="col-md-10 col-md-offset-1 container"><div class="row"><h2>We need lunch money!</h2><a href="#" class="btn btn-success">Feed!</a></div><div class="row"><table class="table-hover table-condensed col-md-4 col-md-offset-2"><tr><th>Deliquent Accounts:</th><td>hold</td></tr><tr><th>Avg Deliquent Balance:</th><td>hold</td></tr><tr><th>Cost per Lunch:</th><td>hold</td></tr></table><div class="col-md-4 col-md-offset2"><div>Empty Image</div><div>Fill Image</div></div></div></div></div><div class="row"><div class="col-md-10 col-md-offset01 container"><div class="row"><h2>Feedback</h2><a href="#" class="btn btn-success">Holla!</a></div><div class="row"><ul class="comments list-unstyled"><li><img src="http://placehold.it/50x50"><div><h3>User 1</h3><p>timestamp</p></div><p>Comment........</p></li><li><img src="http://placehold.it/50x50"><div><h3>User 1</h3><p>timestamp</p></div><p>Comment........</p></li><li><img src="http://placehold.it/50x50"><div><h3>User 1</h3><p>timestamp</p></div><p>Comment........</p></li></ul></div></div></div></div></div><script src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min.js"></script><script src="/javascripts/jquery-1.8.3.min.js"></script><script src="/javascripts/jquery-ui-1.10.3.custom.min.js"></script><script src="/javascripts/jquery.ui.touch-punch.min.js"></script><script src="/javascripts/bootstrap.min.js"></script><script src="/javascripts/bootstrap-select.js"></script><script src="/javascripts/bootstrap-switch.js"></script><script src="/javascripts/flatui-checkbox.js"></script><script src="/javascripts/flatui-radio.js"></script><script src="/javascripts/jquery.tagsinput.js"></script><script src="/javascripts/jquery.placeholder.js"></script><script src="/javascripts/templates.js"></script><script src="/javascripts/application.js"></script></body></html>');
}
return buf.join("");
}