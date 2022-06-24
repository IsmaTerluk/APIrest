
//Metodo que elimina un alumno
function deleteMateria(codicocarrera, codigomateria) {
    fetch(`${uri_materias}/${codicocarrera}/${codigomateria}`, {
      method: 'DELETE'
    })
    .then(() => getAllMaterias())
    .catch(error => console.error('Unable to delete item.', error));
}