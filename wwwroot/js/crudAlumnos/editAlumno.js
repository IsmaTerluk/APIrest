
//Metodo que se comunica con la api y envia json con los datos actualizados
function editAlumno(){
    //Capturamos el id del alumno
    const aluMatricula = document.getElementById('ematricula').value;

    //Creamos un objeto alumno
    const alu = {
        matricula: parseInt(aluMatricula, 10),
        dni: document.getElementById('edni').value.trim(),
        nombre: document.getElementById('enombre').value.trim(),
        apellido: document.getElementById('eapellido').value.trim(),
        codigocarrera:document.getElementById('ecarrera').value.trim(),
    };

    fetch(uri_alumnos, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(alu)
      })
      .catch(error => console.error('Unable to update item.', error));
      
      closeModalEdit();

     
}


//Metodo que cierra el modal
function closeModalEdit() {
    $('#editModal').modal('hide');
    getAllAlumnos();
}