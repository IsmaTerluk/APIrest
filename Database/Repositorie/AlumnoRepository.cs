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
    public class AlumnoRepository: IAlumnoRepository
    {
        //Atributo de conexion
        private PostgreSQLConfig _conecctionString;

        public AlumnoRepository(PostgreSQLConfig conecctionString){
            _conecctionString = conecctionString;
        }

        protected NpgsqlConnection dbConnection(){
            return new NpgsqlConnection(_conecctionString.conecctionStr);
        }

        //Metodo que retorna todos los alumnos
        public async Task<IEnumerable<Alumno>> GetAllAlumnos(){
            //Conexion a la base de datos
            var db = dbConnection();
            //El @ me permite escribir la query en varios renglones
            var query = @"
                        select *
                        from alumnos
                        ";
            //Le indico que me traiga una coleccion de alumnos
            return await db.QueryAsync<Alumno>(query, new {});
        }
        
        //Retorna el un unico alumno
        public async Task<Alumno> GetAlumno(int matricula){
            var db = dbConnection();
            
            var query = @"
                        SELECT * 
                        FROM alumnos 
                        WHERE matricula = @matricula";
            return await db.QueryFirstOrDefaultAsync<Alumno>(query, new { Matricula = matricula});
        }
    
        //Inserta un alumno
        public async Task<bool> InsertAlumno(Alumno alumno){
            var db = dbConnection();
            
            var query = @"
                        INSERT INTO alumnos (dni, nombre, apellido,codigocarrera)
                        VALUES(@Dni, @Nombre, @Apellido, @CodigoCarrera)";
                //Execute la query
            var result = await db.ExecuteAsync(query, new { alumno.Dni, alumno.Nombre, alumno.Apellido, alumno.CodigoCarrera});

            //Retorna verdadero si se inserto correctamente
            return result > 0;
        }

        //Actualiza un alumno
        public async Task<bool> UpdateAlumno(Alumno alumno){
            var db = dbConnection();
            
            var query = @"
                        UPDATE alumnos
                        SET dni = @Dni,
                            nombre = @Nombre,
                            apellido = @Apellido,
                            codigocarrera = @CodigoCarrera
                        WHERE matricula = @Matricula;";
                //Execute la query
            var result = await db.ExecuteAsync(query, new { alumno.Matricula, alumno.Dni, alumno.Nombre, alumno.Apellido, alumno.CodigoCarrera});

            //Retorna verdadero si al menos una fila fue afectada
            return result > 0;
        }

        //Elimina un alumno
        public async Task<bool> DeleteAlumno(Alumno alumno){
            var db = dbConnection();
            
            var query = @"
                        DELETE FROM alumnos
                        WHERE matricula = @Matricula;";
                //Execute la query
            var result = await db.ExecuteAsync(query, new { Matricula = alumno.Matricula });

            //Retorna verdadero si al menos una fila fue afectada
            return result > 0;
        }
    }
}