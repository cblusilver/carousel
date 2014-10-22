var carouselItems= {
  "bugs" : ["bee", "butterfly", "spider", "threebutterflies"],
  "birds" : [ "owl", "robin", "seagull", "yellowbird" ],
  "flowers" : ["feathertulip", "rose", "sunflower", "tulip"],
  "landscape" : ["autumnlake", "desert", "mountainlake", "snowmountains"]
};
var container = document.getElementsByClassName('container')[0];
var timer;

function removeLastImage() {
  var className = container.className;
  var classArr = className.split(" ");
  var newNames = [];

  for (var i=0; i<classArr.length; i++) {
    if (classArr[i].indexOf("carousel") == -1) {
      newNames.push(classArr[i]);
    }
  }

  container.className = newNames.join(" ");
}

function getNextImage(theme, index) {
  removeLastImage();

  container.className = container.className + " carousel_" + theme[index];
  index = (parseInt(index) < (theme.length-1)) ? parseInt(index) + 1 : 0;

  var nextImage = function() { getNextImage(theme, index); };

  timer = setTimeout(nextImage, 5000);
}

function changeCarousel() {
  var selectedTheme = this.value;
  var sTheme = carouselItems[selectedTheme];
  var carouselIndex = 0;

  if (timer) {
   clearTimeout(timer);
  }

  getNextImage(sTheme, carouselIndex);
}


var addEvent = function () {
  var setListener;

  return function (el, ev, fn) {
    if (!setListener) {
      if (el.addEventListener) {
        setListener = function (el, ev, fn) {
         el.addEventListener(ev, fn, false);
        };
      } else if (el.attachEvent) {
        setListener = function (el, ev, fn) {
         el.attachEvent('on' + ev, fn);
        };
      } else {
        setListener = function (el, ev, fn) {
         el['on' + ev] =  fn;
        };
      }
    }
    setListener(el, ev, fn);
    };
}();

var dropdown = document.getElementsByTagName("select")[0];
addEvent(dropdown, "change", changeCarousel);
		
