var weatherAsIcon = function(text) {
  var icon = ")";

  switch(text) {
    case 'wind':                icon = "&#xe020;"; break;
    case 'sleet':               icon = "&#xe010;"; break;
    case 'thunderstorm':        icon = "&#xe00f;"; break;
    case 'snow':
    case 'hail':                icon = "&#xe00c;"; break;
    case 'cloudy':              icon = "&#xe00e;"; break;
    case 'rain':                icon = "&#xe008;"; break;
    case 'fog':                 icon = "&#xe014;"; break;
    case 'clear-day':           icon = "&#xe001;"; break;
    case 'clear-night':         icon = "&#xe002;"; break;
    case 'partly-cloudy-day':   icon = "&#xe000;"; break;
    case 'partly-cloudy-night': icon = "&#xe004;"; break;
    default:                    icon = "&#xe00d;";
  }

  return icon;
};

var MinimalWeather = function(json) {
  this.mw = JSON.parse(json);
};

MinimalWeather.prototype = {
  generateIcon: function() {
    var icon = this.mw.weather.icon;
    var temperature = Math.floor(this.mw.weather.temperature);
    var umbrella = this.mw.weather.bring_umbrella;
    var fn = icons[icon];

    createAppIcon(fn, temperature, umbrella);
  }
};

var findOrCreateElement = function(id, rel) {
  var iosIcon = document.getElementById(id);

  if(!!iosIcon) {
    return iosIcon;
  } else {
    var link = document.createElement("link");

    link.id = id;
    link.rel = rel;

    document.head.appendChild(link);

    return link;
  }
}

var createAppIcon = function(iconFn, temperature, raining) {
  var appIcon = findOrCreateElement("ios_icon", "apple-touch-icon-precomposed");
  var canvas = document.getElementById("ios_icon_generator")

  canvas.setAttribute('width', 228);
  canvas.setAttribute('height', 228);

  var context = canvas.getContext("2d");
  var gradient = context.createLinearGradient(0, 0, 0, canvas.height);

  gradient.addColorStop(0, '#d55150');
  gradient.addColorStop(1, '#e47d43');

  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  iconFn(context);

  if(raining) icons["umbrella"](context)

  context.fillStyle = "white";
  context.font = "bold 3em sans-serif"; // temperature
  context.textAlign = "right";

  context.fillText(temperature + "C", 200, 50);
  context.scale(window.devicePixelRatio, window.devicePixelRatio);

  var data = canvas.toDataURL("image/png");

  appIcon.href = data;
};