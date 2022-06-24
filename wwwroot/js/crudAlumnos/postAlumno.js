
//Vacia los input al ocultar el formulario
/* document.getElementById('postName').value='';
document.getElementById('postLastname').value='';
document.getElementById('postCarrera').value='Carrera';
document.getElementById('postRegistro').value=''; */


//Metodo que envia los datos al servidor
function postAlumno(){

    //Captura los valores de los input
    const pname = document.getElementById('postName');
    const plastname = document.getElementById('postLastname');
    const pcarrera = document.getElementById('postCarrera');
    const pdni = document.getElementById('postDni');

    //Crea un objeto
    const alu = {
        dni: pdni.value.trim(),
        nombre: pname.value.trim(),
        apellido: plastname.value.trim(),
        codigocarrera: pcarrera.value.trim()
    };

    //Metodo que usa js para conectarse con el bakc
    fetch(uri_alumnos, {
        method: 'POST',
        headers: {
          //Lo que acepta como respuesta
          'Accept': 'application/json',
          //Lo que envia
          'Content-Type': 'application/json'
        },
        //Convierte a json el objeto
        body: JSON.stringify(alu)
      })
        //En "este punto" se hace la llamada al servdir
    
        //Mecanismo que permite conectar con el back de forma async 
        //Mi app puede seguir funcionando mientras se esta haciendo transferencia de datos con el back
        .then(response => response.json())
        //.then(mostrarExito())
        .catch(error => console.error('No se pudo insertar alumno.', error));

        closeModalPost();
}


//Metodo que cierra el modal
function closeModalPost() {
    $('#insertModal').modal('hide');
    getAllAlumnos();
}


