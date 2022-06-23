
//Metodo que se comunica con la api y envia json con los datos actualizados
function editAlumno(){
    //Capturamos el id del alumno
    const aluId = document.getElementById('eid').value;

    //Creamos un objeto alumno
    const alu = {
        id: parseInt(aluId, 10),
        name: document.getElementById('ename').value.trim(),
        lastname: document.getElementById('elastname').value.trim(),
        carrera: document.getElementById('ecarrera').value.trim(),
        registro: document.getElementById('eregistro').value.trim(),
    };

    fetch(uri, {
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
    //getAllAlumnos();
}