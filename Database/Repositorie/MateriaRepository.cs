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
    public class MateriaRepository: IMateriaRepository
    {
        //Atributo de conexion
        private PostgreSQLConfig _conecctionString;

        public MateriaRepository(PostgreSQLConfig conecctionString){
            _conecctionString = conecctionString;
        }

        protected NpgsqlConnection dbConnection(){
            return new NpgsqlConnection(_conecctionString.conecctionStr);
        }

        //Metodo que retorna todos los alumnos
        public async Task<IEnumerable<Materia>> GetAllMaterias(){
            //Conexion a la base de datos
            var db = dbConnection();
            //El @ me permite escribir la query en varios renglones
            var query = @"
                        SELECT * 
                        FROM materias
                        ";
            //Le indico que me traiga una coleccion de alumnos
            return await db.QueryAsync<Materia>(query, new {});
        }

        //Retorna el un unico alumno
        public async Task<Materia> GetMateria(int codigocarrera, int codigomateria){
            var db = dbConnection();
            
            var query = @"
                        SELECT * 
                        FROM materias 
                        WHERE codigocarrera = @codigocarrera AND codigomateria=@codigomateria";
            return await db.QueryFirstOrDefaultAsync<Materia>(query, new { CodigoCarrera = codigocarrera, CodigoMateria=codigomateria});
        }
    
        //Inserta un alumno
        public async Task<bool> InsertMateria(Materia materia){
            var db = dbConnection();
            
            var query = @"
                        INSERT INTO materias (codigocarrera, codigomateria, nombre, anio)
                        VALUES(@CodigoCarrera, @CodigoMateria, @Nombre, @Anio)";
                //Execute la query
            var result = await db.ExecuteAsync(query, new { materia.CodigoCarrera, materia.CodigoMateria, materia.Nombre, materia.Anio});

            //Retorna verdadero si se inserto correctamente
            return result > 0;
        }

        //Actualiza un alumno
        public async Task<bool> UpdateMateria(Materia materia){
            var db = dbConnection();
            
            var query = @"
                        UPDATE materias
                        SET codigocarrera = @CodigoCarrera,
                            codigomateria = @CodigoMateria,
                            nombre = @Nombre,
                            anio = @Anio
                        WHERE codigocarrera = @CodigoCarrera AND codigomateria = @CodigoMateria;";
                //Execute la query
            var result = await db.ExecuteAsync(query, new { materia.CodigoCarrera,materia.CodigoMateria, materia.Nombre,materia.Anio});

            //Retorna verdadero si al menos una fila fue afectada
            return result > 0;
        }

        //Elimina un alumno
        public async Task<bool> DeleteMateria(Materia materia){
            var db = dbConnection();
            
            var query = @"
                        DELETE FROM materias
                        WHERE codigocarrera = @CodigoCarrera AND codigomateria = @CodigoMateria";
                //Execute la query
            var result = await db.ExecuteAsync(query, new { CodigoCarrera = materia.CodigoCarrera, CodigoMateria = materia.CodigoMateria });

            //Retorna verdadero si al menos una fila fue afectada
            return result > 0;
        }
    }
}