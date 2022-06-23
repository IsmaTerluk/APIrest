using System;
using System.Collections.Generic;
using System.Text;

namespace APIprueba.Models 
{
    public class Carrera
    {
        public int CodigoCarrera { get; set; } 

        //Para que no reciba parametos nulos
        public string? NombreCarrera { get; set; } 

        public string? Iniciales { get; set; }

        public int Duracion { get; set; }

    } 
}