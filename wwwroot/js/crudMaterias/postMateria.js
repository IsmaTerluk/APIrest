
//Vacia los input al ocultar el formulario
/* document.getElementById('postName').value='';
document.getElementById('postLastname').value='';
document.getElementById('postCarrera').value='Carrera';
document.getElementById('postRegistro').value=''; */


//Metodo que envia los datos al servidor
function postMateria(){

    //Captura los valores de los input
    const pcodigo = document.getElementById('postCodigo');
    const pnombre = document.getElementById('postNombre');
    const panio = document.getElementById('postAnio');
    const pcarrera = document.getElementById('postCarreraMateria');

    //Crea un objeto
    const materia = {
        codigocarrera: pcarrera.value.trim(),
        codigomateria: pcodigo.value.trim(),
        nombre: pnombre.value.trim(),
        anio: panio.value.trim()
    };

    //Metodo que usa js para conectarse con el bakc
    fetch(uri_materias, {
        method: 'POST',
        headers: {
          //Lo que acepta como respuesta
          'Accept': 'application/json',
          //Lo que envia
          'Content-Type': 'application/json'
        },
        //Convierte a json el objeto
        body: JSON.stringify(materia)
      })
        //En "este punto" se hace la llamada al servdir
    
        //Mecanismo que permite conectar con el back de forma async 
        //Mi app puede seguir funcionando mientras se esta haciendo transferencia de datos con el back
        .then(response => response.json())
        //.then(mostrarExito())
        .catch(error => console.error('No se pudo insertar alumno.', error));

        closeModalPostMateria();
}


//Metodo que cierra el modal
function closeModalPostMateria() {
    $('#insertModalMateria').modal('hide');
    getAllMaterias();
}


