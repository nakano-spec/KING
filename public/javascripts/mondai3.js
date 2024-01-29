            var f  = document.forms.myform2;
            var socket = io();
            var rend = document.getElementById('my');
            var p2 = rend.innerText;
            var p3 = parseInt(p2/60,10);
            var p4 = p2%60
            if(p3 == 0 && p4 == 0){
                remain.innerText=p3;
                remain2.innerText=p4;
            }else{
                var countdownid = setInterval(function(){
                if(p3 != 0 && p4 == 0){
                    p3 = p3 --;
                    p4 = 59
                }else{
                   p4 --; 
                }
                remain.innerText=p3;
                remain2.innerText = p4;
                if(p3 >0 && p4 == 0){
                    p3 --;
                    p4 = 59;
                }
                if(p3 == 0 && p4 == 0){
                    clearInterval(countdownid);
                }
            }, 1000);
            }
            

            f.button3.addEventListener('click',function(e){
                e.preventDefault();
                socket.emit('owa2');
            })

            f.kekka.addEventListener('click',function(e){
                e.preventDefault();
                window.location.href = '/mondai3';
            })