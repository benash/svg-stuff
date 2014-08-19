var SVG_NAMESPACE = "http://www.w3.org/2000/svg";

Object.prototype.eachProperty = function(iterator) {
  for (var key in this)
    if (this.hasOwnProperty(key))
      iterator(key, this[key]);

  return this;
};

var createSvgElement = function(tag, attrs) {
  var element = document.createElementNS(SVG_NAMESPACE, tag);

  attrs = attrs || {};

  attrs.eachProperty(function(key, val) {
    element.setAttribute(key, val);
  });

  return element;
};


// Get point in global SVG space
var svgLoc = (function() {

  var pt;

  return function(svg, x, y) {

    pt = pt || svg.createSVGPoint();
    pt.x = x;
    pt.y = y;

    return pt.matrixTransform(svg.getScreenCTM().inverse());
  }

})();


var getRandomInclusiveInt = function(min, max) {
  var range = max - min + 1;
  return Math.floor(Math.random() * range + min);
}

var getRandomOffset = function() {
  return getRandomInclusiveInt(-1, 1);
}

var jostle = function(element, loc) {

  var newX, newY;

  element.setAttribute('cx', parseInt(element.getAttribute('cx')) + getRandomOffset());
  element.setAttribute('cy', parseInt(element.getAttribute('cy')) + getRandomOffset());

  var x = document.getElementById("x");
  var y = document.getElementById("y");

  x.innerHTML = loc.x;
  y.innerHTML = loc.y;
};
