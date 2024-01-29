var doc = document.getElementById("modoru");
var mydiv = document.getElementById("myid2");
doc.innerHTML = "<a href=http://localhost:3000/kaitou?name=" + encodeURIComponent(mydiv.innerText) + ">戻る</a>"