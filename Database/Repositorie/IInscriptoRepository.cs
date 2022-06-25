using APIprueba.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;  //Para metodos asincronos 


namespace APIprueba.Database.Repositorie 
{
     public interface IInscriptoRepository
    {
        public Task<IEnumerable<Inscripto>> GetAllInscriptos();

        Task<IEnumerable<Inscripto>> GetInscriptoCarrera(int matricula, int codigocarrera);
    
        Task<bool> InsertInscripto(Inscripto Inscripto);

        Task<bool> UpdateInscripto(Inscripto inscripto);

        Task<bool> DeleteInscripto(Inscripto inscripto);
    }
}