var f  = document.forms.myform2;
            var socket = io();
            //値設定
            var rend = document.getElementById('my');
            var inner2 = rend.innerText;  //入力値を受け取る
            var minites = parseInt(inner2/60,10); //分を取得
            var seconds = Math.floor(inner2%60); //秒を取得

            remain.innerText=minites;
            remain2.innerText=seconds;

            //カウンドダウン開始
            if(minites == 0 && seconds == 0){
                remain.innerText=minites;
                remain2.innerText=seconds;
            }else{
                var countdownid = setInterval(function(){
                if(minites != 0 && seconds == 0){
                    minites --;
                    seconds = 59;
                }else{
                   seconds --; 
                }
                remain.innerText=minites;
                remain2.innerText = seconds;
                if(minites == 0 && seconds == 0){
                    clearInterval(countdownid);
                    //socket.emit('owa2'); -> 自動化するならこれがいる
                }
            }, 1000);
            }


            
            remain4.innerText = minites;
            remain5.innerText = seconds; 

            f.button3.addEventListener('click',function(e){
                e.preventDefault();
                socket.emit('owa2');
            })

            f.kekka.addEventListener('click',function(e){
                e.preventDefault();
                window.location.href = '/mondai3';
            })