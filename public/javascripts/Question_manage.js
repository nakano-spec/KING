/*function loadScript(url, callback) {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;

  script.onload = function() {
      callback();
  };

  document.head.appendChild(script);
}*/

loadScript('bin/www', function() {
  document.getElementById('content').innerText = getValueFromScript2();
});
            f.button3.addEventListener('click',function(e){
                e.preventDefault();
                socket.emit('owa2');
            })

            f.kekka.addEventListener('click',function(e){
                e.preventDefault();
                window.location.href = '/Question_manage';
            })

