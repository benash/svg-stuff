var SVG_NAMESPACE = "http://www.w3.org/2000/svg";

var getRandomInRange = function(min, size) {
  return Math.floor(Math.random() * size + min);
};

var getRandomInclusiveInt = function(min, max) {
  return getRandomInRange(min, max - min + 1);
};

var getRandomExclusiveInt = function(min, max) {
  return getRandomInRange(min, max - min);
};

var getRandomOffset = function(x) {
  return getRandomInclusiveInt(-x, x);
};

Object.prototype.eachProperty = function(iterator) {
  for (var key in this)
    if (this.hasOwnProperty(key))
      iterator(key, this[key]);

  return this;
};

Array.prototype.each = function(iterator) {
  this.map(iterator);
  return this;
};

Array.prototype.random = function() {
  return this[getRandomExclusiveInt(0, this.length)];
}

var createRange = function(start, offset, num) {
  var range = new Array(num);

  for (var i = 0; i < num; i++)
    range[i] = start + offset * i;

  return range;
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

var dist = function(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

SVGCircleElement.prototype.collidesWith = function(loc) {
  return dist(this.cx.baseVal.value, this.cy.baseVal.value, loc.x, loc.y) <= this.r.baseVal.value;
};

SVGElement.prototype.jostle = function(offset) {

    var newX = this.cx.baseVal.value + getRandomOffset(offset);
    var newY = this.cy.baseVal.value + getRandomOffset(offset);

    this.setAttribute('cx', newX);
    this.setAttribute('cy', newY);
};

var randomColor = (function() {

  var colors = [
    'AliceBlue',
    'AntiqueWhite',
    'Aqua',
    'Aquamarine',
    'Azure',
    'Beige',
    'Bisque',
    'Black',
    'BlanchedAlmond',
    'Blue',
    'BlueViolet',
    'Brown',
    'BurlyWood',
    'CadetBlue',
    'Chartreuse',
    'Chocolate',
    'Coral',
    'CornflowerBlue',
    'Cornsilk',
    'Crimson',
    'Cyan',
    'DarkBlue',
    'DarkCyan',
    'DarkGoldenRod',
    'DarkGray',
    'DarkGreen',
    'DarkKhaki',
    'DarkMagenta',
    'DarkOliveGreen',
    'DarkOrange',
    'DarkOrchid',
    'DarkRed',
    'DarkSalmon',
    'DarkSeaGreen',
    'DarkSlateBlue',
    'DarkSlateGray',
    'DarkTurquoise',
    'DarkViolet',
    'DeepPink',
    'DeepSkyBlue',
    'DimGray',
    'DodgerBlue',
    'FireBrick',
    'FloralWhite',
    'ForestGreen',
    'Fuchsia',
    'Gainsboro',
    'GhostWhite',
    'Gold',
    'GoldenRod',
    'Gray',
    'Green',
    'GreenYellow',
    'HoneyDew',
    'HotPink',
    'IndianRed',
    'Indigo',
    'Ivory',
    'Khaki',
    'Lavender',
    'LavenderBlush',
    'LawnGreen',
    'LemonChiffon',
    'LightBlue',
    'LightCoral',
    'LightCyan',
    'LightGoldenRodYellow',
    'LightGray',
    'LightGreen',
    'LightPink',
    'LightSalmon',
    'LightSeaGreen',
    'LightSkyBlue',
    'LightSlateGray',
    'LightSteelBlue',
    'LightYellow',
    'Lime',
    'LimeGreen',
    'Linen',
    'Magenta',
    'Maroon',
    'MediumAquaMarine',
    'MediumBlue',
    'MediumOrchid',
    'MediumPurple',
    'MediumSeaGreen',
    'MediumSlateBlue',
    'MediumSpringGreen',
    'MediumTurquoise',
    'MediumVioletRed',
    'MidnightBlue',
    'MintCream',
    'MistyRose',
    'Moccasin',
    'NavajoWhite',
    'Navy',
    'OldLace',
    'Olive',
    'OliveDrab',
    'Orange',
    'OrangeRed',
    'Orchid',
    'PaleGoldenRod',
    'PaleGreen',
    'PaleTurquoise',
    'PaleVioletRed',
    'PapayaWhip',
    'PeachPuff',
    'Peru',
    'Pink',
    'Plum',
    'PowderBlue',
    'Purple',
    'Red',
    'RosyBrown',
    'RoyalBlue',
    'SaddleBrown',
    'Salmon',
    'SandyBrown',
    'SeaGreen',
    'SeaShell',
    'Sienna',
    'Silver',
    'SkyBlue',
    'SlateBlue',
    'SlateGray',
    'Snow',
    'SpringGreen',
    'SteelBlue',
    'Tan',
    'Teal',
    'Thistle',
    'Tomato',
    'Turquoise',
    'Violet',
    'Wheat',
    'White',
    'WhiteSmoke',
    'Yellow',
    'YellowGreen'
  ];

  return function() {
    return colors.random();
  };

})();
