
//Metodo que elimina un alumno
function deleteAlumno(id) {
    fetch(`${uri}/${id}`, {
      method: 'DELETE'
    })
    .then(() => getAllAlumnos("block"))
    .catch(error => console.error('Unable to delete item.', error));
}