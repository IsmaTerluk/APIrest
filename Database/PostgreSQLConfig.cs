using System;
using System.Collections.Generic;
using System.Text;

namespace APIprueba.Database
{
    public class PostgreSQLConfig{

        //Atributo conecction
        public string conecctionStr { get; set; }
        
        //Constructor
        public PostgreSQLConfig(string connection){
            conecctionStr = connection;
        }

    }
}