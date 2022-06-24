//Metodo que se comunica con la api y envia json con los datos actualizados
function editMateria(){
    //Capturamos el id del alumno
    const codigo_carrera = document.getElementById('ecarreramat').value;
    const codigo_materia = document.getElementById('ecodigomat').value;

    //Creamos un objeto alumno
    const materia = {
        codigocarrera: parseInt(codigo_carrera, 10),
        codigomateria: parseInt(codigo_materia, 10),
        nombre: document.getElementById('enombremat').value.trim(),
        anio: document.getElementById('eaniomat').value.trim(),
    };

    fetch(uri_materias, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(materia)
      })
      .catch(error => console.error('Unable to update item.', error));
      
      closeModalEditMateria();

     
}


//Metodo que cierra el modal
function closeModalEditMateria() {
    $('#editModalMateria').modal('hide');
    getAllMaterias();
}