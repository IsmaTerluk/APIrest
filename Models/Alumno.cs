using System;
using System.Collections.Generic;
using System.Text;

namespace APIprueba.Models 
{
    public class Alumno
    {
        public int Id { get; set; } 

        public int Registro { get; set; }

        //Para que no reciba parametos nulos
        public string? Name { get; set; } 

        public string? Lastname { get; set; }

        public string? Carrera { get; set; }
    } 
}