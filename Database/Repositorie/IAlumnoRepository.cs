using APIprueba.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;  //Para metodos asincronos 

namespace APIprueba.Database.Repositorie 
{
    public interface IAlumnoRepository
    {
        //Metodo que retorna todos los alumnos
        public Task<IEnumerable<Alumno>> GetAllAlumnos();
        
        //Retorna el un unico alumno
        Task<Alumno> GetAlumno(int matricula);
    
        //Inserta un alumno
        Task<bool> InsertAlumno(Alumno alumno);

        //Actualiza un alumno
        Task<bool> UpdateAlumno(Alumno alumno);

        //Elimina un alumno
        Task<bool> DeleteAlumno(Alumno alumno);
    }

}