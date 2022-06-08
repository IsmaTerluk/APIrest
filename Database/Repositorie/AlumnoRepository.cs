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
                        SELECT * 
                        FROM public.""Alumnos"" 
                        ORDER BY id
                        ";
            //Le indico que me traiga una coleccion de alumnos
            return await db.QueryAsync<Alumno>(query, new {});
        }

        //Retorna el un unico alumno
        public async Task<Alumno> GetAlumno(int id){
            var db = dbConnection();
            
            var query = @"
                        SELECT * 
                        FROM public.""Alumnos"" 
                        WHERE id = @Id";
            return await db.QueryFirstOrDefaultAsync<Alumno>(query, new { Id = id});
        }
    
        //Inserta un alumno
        public async Task<bool> InsertAlumno(Alumno alumno){
            var db = dbConnection();
            
            var query = @"
                        INSERT INTO public.""Alumnos"" (registro, name, lastname, carrera)
                        VALUES(@Registro, @Name, @Lastname, @Carrera)";
                //Execute la query
            var result = await db.ExecuteAsync(query, new { alumno.Registro, alumno.Name, alumno.Lastname, alumno.Carrera });

            //Retorna verdadero si se inserto correctamente
            return result > 0;
        }

        //Actualiza un alumno
        public async Task<bool> UpdateAlumno(Alumno alumno){
            var db = dbConnection();
            
            var query = @"
                        UPDATE public.""Alumnos""
                        SET registro = @Registro,
                            name = @Name,
                            lastname = @Lastname,
                            carrera = @Carrera
                        WHERE id = @Id;";
                //Execute la query
            var result = await db.ExecuteAsync(query, new { alumno.Id, alumno.Registro, alumno.Name, alumno.Lastname, alumno.Carrera });

            //Retorna verdadero si al menos una fila fue afectada
            return result > 0;
        }

        //Elimina un alumno
        public async Task<bool> DeleteAlumno(Alumno alumno){
            var db = dbConnection();
            
            var query = @"
                        DELETE FROM public.""Alumnos""
                        WHERE id = @Id;";
                //Execute la query
            var result = await db.ExecuteAsync(query, new { Id = alumno.Id });

            //Retorna verdadero si al menos una fila fue afectada
            return result > 0;
        }
    }
}