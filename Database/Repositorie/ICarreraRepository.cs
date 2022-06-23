using APIprueba.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;  //Para metodos asincronos 


namespace APIprueba.Database.Repositorie 
{
     public interface ICarreraRepository
    {
        //Metodo que retorna todos los alumnos
        public Task<IEnumerable<Carrera>> GetAllCarreras();

        //Retorna el un unico alumno
        Task<Carrera> GetCarrera(int codigocarrera);
    
        //Inserta un alumno
        Task<bool> InsertCarrera(Carrera carrera);

        //Actualiza un alumno
        Task<bool> UpdateCarrera(Carrera carrera);

        //Elimina un alumno
        Task<bool> DeleteCarrera(Carrera carrera);
    }
}