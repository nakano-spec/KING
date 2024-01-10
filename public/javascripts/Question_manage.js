function loadScript(url, callback) {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;

  script.onload = function() {
      callback();
  };

  document.head.appendChild(script);
}

loadScript('bin/www', function() {
  document.getElementById('content').innerText = getValueFromScript2();
});

