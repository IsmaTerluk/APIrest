const uri_alumnos = '../api/Alumno';

async function login(){
    const user = document.getElementById('user').value;
    const pass = document.getElementById('pass').value;
    const error_user = document.getElementById('error_user');

    if(user=='admin') {
        if(pass=='admin')
            window.location.replace("../html/homeadmin.html");
        else
            error_user.style.display ='block';
    }else{
        try{
            const response = await fetch(`${uri_alumnos}/${user}`);
            if(response.status == 200){
                const alumno = await response.json();
                if(pass=='alumno'){
                    window.location.replace("../html/homealumno.html?matricula="+alumno.matricula);
                }else{
                    error_user.style.display ='block';
                }
            }else{
                error_user.style.display ='block';
            }   
        }catch(error){
            console.log(error)
        }
    }
}