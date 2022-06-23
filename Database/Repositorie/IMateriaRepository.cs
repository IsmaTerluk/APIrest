using APIprueba.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;  //Para metodos asincronos 

namespace APIprueba.Database.Repositorie 
{
     public interface IMateriaRepository
    {
        //Metodo que retorna todos los alumnos
        public Task<IEnumerable<Materia>> GetAllMaterias();

        //Retorna el un unico alumno
        Task<Materia> GetMateria(int codigocarrera, int codigomateria);
    
        //Inserta un alumno
        Task<bool> InsertMateria(Materia materia);

        //Actualiza un alumno
        Task<bool> UpdateMateria(Materia materia);

        //Elimina un alumno
        Task<bool> DeleteMateria(Materia materia);

    }
}