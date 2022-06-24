using System;
using System.Collections.Generic;
using System.Text;

namespace APIprueba.Models 
{
    public class Alumno
    {
        public int Matricula { get; set; } 

        public int Dni { get; set; }

        //Para que no reciba parametos nulos
        public string? Nombre { get; set; } 

        public string? Apellido { get; set; }

        public int CodigoCarrera { get; set; }

    } 
}