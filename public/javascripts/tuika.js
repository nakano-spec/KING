var n = document.forms.myform2;

        n.fail.addEventListener('click',function(e){
            e.preventDefault();
            window.location.href='/fail';
        })

        n.user.addEventListener('click',function(e){
            e.preventDefault();
            window.location.href='/tuika2';
        })