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
    public class CarreraRepository: ICarreraRepository
    {
        //Atributo de conexion
        private PostgreSQLConfig _conecctionString;

        public CarreraRepository(PostgreSQLConfig conecctionString){
            _conecctionString = conecctionString;
        }

        protected NpgsqlConnection dbConnection(){
            return new NpgsqlConnection(_conecctionString.conecctionStr);
        }

        //Metodo que retorna todos los alumnos
        public async Task<IEnumerable<Carrera>> GetAllCarreras(){
            //Conexion a la base de datos
            var db = dbConnection();
            //El @ me permite escribir la query en varios renglones
            var query = @"
                        SELECT * 
                        FROM carrera
                        ";
            //Le indico que me traiga una coleccion de alumnos
            return await db.QueryAsync<Carrera>(query, new {});
        }

        //Retorna el un unico alumno
        public async Task<Carrera> GetCarrera(int codigocarrera){
            var db = dbConnection();
            
            var query = @"
                        SELECT * 
                        FROM carrera 
                        WHERE codigocarrera = @CodigoCarrera";
            return await db.QueryFirstOrDefaultAsync<Carrera>(query, new { CodigoCarrera = codigocarrera});
        }
    
        //Inserta un alumno
        public async Task<bool> InsertCarrera(Carrera carrera){
            var db = dbConnection();
            
            var query = @"
                        INSERT INTO carrera (codigocarrera, nombrecarrera, iniciales, duracion)
                        VALUES(@CodigoCarrera, @NombreCarrera, @Iniciales, @Duracion)";
                //Execute la query
            var result = await db.ExecuteAsync(query, new { carrera.CodigoCarrera, carrera.NombreCarrera, carrera.Iniciales, carrera.Duracion});

            //Retorna verdadero si se inserto correctamente
            return result > 0;
        }

        //Actualiza un alumno
        public async Task<bool> UpdateCarrera(Carrera carrera){
            var db = dbConnection();
            
            var query = @"
                        UPDATE carrera
                        SET codigocarrera = @CodigoCarrera,
                            nombrecarrera = @NombreCarrera,
                            iniciales = @Iniciales,
                            duracion = @Duracion
                        WHERE codigocarrera = @CodigoCarrera;";
                //Execute la query
            var result = await db.ExecuteAsync(query, new { carrera.CodigoCarrera, carrera.NombreCarrera, carrera.Iniciales, carrera.Duracion});

            //Retorna verdadero si al menos una fila fue afectada
            return result > 0;
        }

        //Elimina un alumno
        public async Task<bool> DeleteCarrera(Carrera carrera){
            var db = dbConnection();
            
            var query = @"
                        DELETE FROM carrera
                        WHERE codigocarrera = @CodigoCarrera";
                //Execute la query
            var result = await db.ExecuteAsync(query, new { CodigoCarrera = carrera.CodigoCarrera});

            //Retorna verdadero si al menos una fila fue afectada
            return result > 0;
        }
    }
}
