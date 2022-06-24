const uri_alumnos = '../api/Alumno'

function getQueryVariable(variable) {
    var query = window.location.search.substring(1); //Obtiene que la url a partir de los parametros
    var vars = query.split("&");
    for (var i=0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable) {
            return pair[1];
        }
    }
    return false;
 }

async function obtenerMatricula(){
    const matricula = getQueryVariable('matricula');
    try{
        //Hacemos la peticion
        const response = await fetch(`${uri_alumnos}/${matricula}`);
        if(response.status == 200){
            const alumno = await response.json();
            document.getElementById('user').innerHTML = alumno.nombre;
        }
    }catch(error){
        console.log(error)
    }
    
 }