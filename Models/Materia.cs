using System;
using System.Collections.Generic;
using System.Text;

namespace APIprueba.Models
{
    public class Materia
    {
        public int CodigoCarrera { get; set; } 

        public int CodigoMateria { get; set; }

        //Para que no reciba parametos nulos
        public string? Nombre { get; set; } 

        public int Anio {get; set;}

    } 
}