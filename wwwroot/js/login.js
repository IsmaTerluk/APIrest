function login(){
    const user = document.getElementById('user').value;
    const pass = document.getElementById('pass').value;
    const error_user = document.getElementById('error_user');

    if(user!='admin'){
        if(error_user.style.display == 'none'){
            error_user.style.display ='block';
        }
    }else{
        error_user.style.display ='none';
        if(pass != 'admin'){
            const error_pass = document.getElementById('error_pass');
            if(error_pass.style.display == 'none'){
                error_pass.style.display ='block';
            }
        }else{
            window.location.replace("../html/admin.html");
        }
    }
}