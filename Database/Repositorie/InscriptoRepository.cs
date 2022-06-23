using APIprueba.Models;
using Npgsql;
using Dapper;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace APIprueba.Database.Repositorie
{
    //Class que implementa la interface
    public class InscriptoRepository: IInscriptoRepository
    {
        //Atributo de conexion
        private PostgreSQLConfig _conecctionString;

        public InscriptoRepository(PostgreSQLConfig conecctionString){
            _conecctionString = conecctionString;
        }

        protected NpgsqlConnection dbConnection(){
            return new NpgsqlConnection(_conecctionString.conecctionStr);
        }

        //Metodo que retorna todos los alumnos
        public async Task<IEnumerable<Inscripto>> GetAllInscriptos(){
            //Conexion a la base de datos
            var db = dbConnection();
            //El @ me permite escribir la query en varios renglones
            var query = @"
                        SELECT * 
                        FROM inscriptos
                        ";
            //Le indico que me traiga una coleccion de alumnos
            return await db.QueryAsync<Inscripto>(query, new {});
        }

        //Retorna el un unico alumno
        public async  Task<IEnumerable<Inscripto>> GetInscripto(int matricula){
            var db = dbConnection();
            
            var query = @"
                        SELECT * 
                        FROM inscriptos 
                        WHERE matricula = @matricula";
            return await db.QueryAsync<Inscripto>(query, new { Matricula = matricula});
        }
    
        //Inserta un alumno
        public async Task<bool> InsertInscripto(Inscripto inscripto){
            var db = dbConnection();
            
            var query = @"
                        INSERT INTO inscriptos (matricula,codigocarrera, codigomateria)
                        VALUES(@Matricula, @CodigoCarrera, @CodigoMateria)";
                //Execute la query
            var result = await db.ExecuteAsync(query, new { inscripto.Matricula, inscripto.CodigoCarrera, inscripto.CodigoMateria});

            //Retorna verdadero si se inserto correctamente
            return result > 0;
        }

        //Actualiza un alumno
        public async Task<bool> UpdateInscripto(Inscripto inscripto){
            var db = dbConnection();
            
            var query = @"
                        UPDATE inscriptos
                        SET matricula = @Matricula,
                            codigocarrera = @CodigoCarrera,
                            codigomateria = @CodigoMateria
                        WHERE matricula = @Matricula;";
                //Execute la query
            var result = await db.ExecuteAsync(query, new { inscripto.Matricula, inscripto.CodigoCarrera, inscripto.CodigoMateria});

            //Retorna verdadero si al menos una fila fue afectada
            return result > 0;
        }

        //Elimina un alumno
        public async Task<bool> DeleteInscripto(Inscripto inscripto){
            var db = dbConnection();
            
            var query = @"
                        DELETE FROM inscriptos
                        WHERE matricula = @Matricula and codigocarrera=@CodigoCarrera and codigomateria=@CodigoMateria";
                //Execute la query
            var result = await db.ExecuteAsync(query, new { Matricula = inscripto.Matricula , CodigoCarrera = inscripto.CodigoCarrera, CodigoMateria = inscripto.CodigoMateria});

            //Retorna verdadero si al menos una fila fue afectada
            return result > 0;
        }
    }
}
