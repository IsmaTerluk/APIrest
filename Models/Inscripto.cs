using System;
using System.Collections.Generic;
using System.Text;

namespace APIprueba.Models 
{
    public class Inscripto
    {
        public int Matricula { get; set; } 

        public int CodigoCarrera { get; set; }

        //Para que no reciba parametos nulos
        public int CodigoMateria { get; set; } 

    } 
}