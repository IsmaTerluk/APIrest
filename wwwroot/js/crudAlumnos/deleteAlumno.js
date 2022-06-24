
//Metodo que elimina un alumno
function deleteAlumno(matricula) {
    fetch(`${uri_alumnos}/${matricula}`, {
      method: 'DELETE'
    })
    .then(() => getAllAlumnos())
    .catch(error => console.error('Unable to delete item.', error));
}