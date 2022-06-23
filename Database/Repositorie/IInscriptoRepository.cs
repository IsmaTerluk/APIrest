using APIprueba.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;  //Para metodos asincronos 


namespace APIprueba.Database.Repositorie 
{
     public interface IInscriptoRepository
    {
        //Metodo que retorna todos los alumnos
        public Task<IEnumerable<Inscripto>> GetAllInscriptos();

        //Retorna el un unico alumno
        Task<IEnumerable<Inscripto>> GetInscripto(int matricula);
    
        //Inserta un alumno
        Task<bool> InsertInscripto(Inscripto Inscripto);

        //Actualiza un alumno
        Task<bool> UpdateInscripto(Inscripto inscripto);

        //Elimina un alumno
        Task<bool> DeleteInscripto(Inscripto inscripto);
    }
}