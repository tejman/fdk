
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
buf.push('<div class="row"><div data-num-format="int" data-statname="grades" data-step-value="1" class="col-md-2 filter-item"><span class="filter-label-name">Grade Level</span><div class="slider-stat ui-slider"></div><span class="filter-label"><input class="input-sm form-control flat label-value value-min"/><span class="theto">to</span><input class="input-sm form-control flat label-value value-max"/></span></div><div data-num-format="int" data-statname="diversity" data-step-value="1" class="col-md-2 filter-item"><span class="filter-label-name">Diversity</span><div class="slider-stat ui-slider"></div><span class="filter-label"><input class="input-sm form-control flat label-value value-min"/><span class="theto">to</span><input class="input-sm form-control flat label-value value-max"/></span></div><div data-num-format="currency" data-statname="capitaIncome" data-step-value="5000" class="col-md-2 filter-item"><span class="filter-label-name">Income</span><div class="slider-stat ui-slider"></div><span class="filter-label"><input class="input-sm form-control flat label-value value-min"/><span class="theto">to</span><input class="input-sm form-control flat label-value value-max"/></span></div><div data-num-format="percent" data-statname="poverty" data-step-value="1" class="col-md-2 filter-item"><span class="filter-label-name">Poverty</span><div class="slider-stat ui-slider"></div><span class="filter-label"><input class="input-sm form-control flat label-value value-min"/><span class="theto">to</span><input class="input-sm form-control flat label-value value-max"/></span></div><div data-num-format="percent" data-statname="snapPercent" data-step-value="1" class="col-md-2 filter-item"><span class="filter-label-name">Food Aid</span><div class="slider-stat ui-slider"></div><span class="filter-label"><input class="input-sm form-control flat label-value value-min"/><span class="theto">to</span><input class="input-sm form-control flat label-value value-max"/></span></div><div data-num-format="percent" data-statname="unemployed" data-step-value="1" class="col-md-2 filter-item"><span class="filter-label-name">Unemployment</span><div class="slider-stat ui-slider"></div><span class="filter-label"><input class="input-sm form-control flat label-value value-min"/><span class="theto">to</span><input class="input-sm form-control flat label-value value-max"/></span></div></div>');
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
buf.push('></span><span class="filter-actions"><div id="filter-switch" class="switch"><input type="checkbox" checked="checked" data-toggle="switch"/></div></span></div>');
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
buf.push('><div class="row"><div class="col-md-4 school-search-pic vcenter"><img src="/images/stock-school.png"/></div><div class="col-md-8 school-search-prof vcenter"><ul class="list-group"><li class="list-group-item"><span class="badge">School</span>' + escape((interp = school.name.toLowerCase()) == null ? '' : interp) + '</li><li class="list-group-item"><span class="badge">District</span>' + escape((interp = school.agencyName.toLowerCase()) == null ? '' : interp) + '</li><li class="list-group-item"><span class="badge">State</span>' + escape((interp = school.stateFull.toLowerCase()) == null ? '' : interp) + '</li><li class="list-group-item"><span class="badge">$ Needed</span>');
if ( school.balance)
{
buf.push('' + escape((interp = school.balance.toLowerCase()) == null ? '' : interp) + '');
}
else
{
buf.push('$ ---');
}
buf.push('</li></ul></div></div><div class="row search-funding"><div class="col-md-8 funding-status vcenter"><div class="fundraising progress"><div style="width: 40%" class="progress-bar"></div></div><div class="progress"><div style="width: 40%" class="progress-bar"></div></div></div><div class="col-md-2 vcenter funding-label"><p class="percentRaised">90</p><p class="percentRaisedLabel"> % &nbsp; &nbsp; Raised</p></div></div></div>');
    }
  } else {
    for (var $index in schools) {
      var school = schools[$index];

buf.push('<div');
buf.push(attrs({ 'data-id':(school._id), "class": ('result-item') + ' ' + ('container') + ' ' + ('col-md-12') }, {"data-id":true}));
buf.push('><div class="row"><div class="col-md-4 school-search-pic vcenter"><img src="/images/stock-school.png"/></div><div class="col-md-8 school-search-prof vcenter"><ul class="list-group"><li class="list-group-item"><span class="badge">School</span>' + escape((interp = school.name.toLowerCase()) == null ? '' : interp) + '</li><li class="list-group-item"><span class="badge">District</span>' + escape((interp = school.agencyName.toLowerCase()) == null ? '' : interp) + '</li><li class="list-group-item"><span class="badge">State</span>' + escape((interp = school.stateFull.toLowerCase()) == null ? '' : interp) + '</li><li class="list-group-item"><span class="badge">$ Needed</span>');
if ( school.balance)
{
buf.push('' + escape((interp = school.balance.toLowerCase()) == null ? '' : interp) + '');
}
else
{
buf.push('$ ---');
}
buf.push('</li></ul></div></div><div class="row search-funding"><div class="col-md-8 funding-status vcenter"><div class="fundraising progress"><div style="width: 40%" class="progress-bar"></div></div><div class="progress"><div style="width: 40%" class="progress-bar"></div></div></div><div class="col-md-2 vcenter funding-label"><p class="percentRaised">90</p><p class="percentRaisedLabel"> % &nbsp; &nbsp; Raised</p></div></div></div>');
   }
  }
}).call(this);

}
return buf.join("");
}