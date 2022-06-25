const uri_alumnos = '../api/Alumno';
const uri_inscriptos = '../api/Inscripto';
const uri_materias = '../api/Materia';
const uri_carrera = '../api/Carrera';

const matricula = getQueryVariable('matri');
const cod_carrera = getQueryVariable('carrera');


function getQueryVariable(variable) {
    var query = window.location.search.substring(1); //Obtiene que la url a partir de los parametros
    var vars = query.split("&");
    for (var i=0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable) {
            return pair[1];
        }
    }
    return false;
 }

async function obtenerAlumno(){
    try{
        //Hacemos la peticion
        const response = await fetch(`${uri_alumnos}/${matricula}`);
        const response_carrera = await fetch(`${uri_carrera}/${cod_carrera}`);
        if(response.status == 200 & response_carrera.status == 200){
            const alumno = await response.json();
            const carrera = await response_carrera.json();
            //console.log(carrera)
            document.getElementById('user').innerHTML = alumno.nombre + " " + alumno.apellido;
            document.getElementById('name-carrera').innerHTML = carrera.nombreCarrera;
        }
    }catch(error){
        console.log(error)
    }
 }

 async function materiasInscripto(){
    try{
        const response_inscriptos = await fetch(`${uri_inscriptos}/${matricula}/${cod_carrera}`);  //Materias en las que esta inscritp
        const response_materias = await fetch(`${uri_materias}/${cod_carrera}`);
        if(response_inscriptos.status == 200 & response_materias.status == 200){
            const inscriptos = await response_inscriptos.json();
            const materias = await response_materias.json();
            //console.log(inscriptos);
            //console.log(materias);
            mostrarMateriasInscritpas(materias,inscriptos);
        }
    }catch(error){
        console.log(error)
    }
 
}

function mostrarMateriasInscritpas(materias, inscriptos){
    const body = document.getElementById('section-materias-inscripto');
    body.innerHTML = '';


    inscriptos.forEach(element => {
        //Objeto de la materia
        const mat = buscarMateria(element.codigoMateria, materias)
        //console.log(mat);

        const card = document.createElement("div");
        card.classList.add("card","mb-2");
        card.style.width ='28rem';

        //Cuerpo de la card
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body","text-center","d-flex","justify-content-between");

        card.appendChild(cardBody);

        //Title
        const h6 = document.createElement("h6");
        h6.classList.add("card-title","border-bottom");
        h6.textContent = mat.nombre;

        //Button
        const button = document.createElement("button");
        button.classList.add("btn", "btn-sm", "btn-outline-danger");
        button.textContent = "De baja";
        button.setAttribute('onclick', `bajaAlumno(${matricula}, ${cod_carrera}, ${mat.codigoMateria})`);

        cardBody.appendChild(h6);
        cardBody.appendChild(button);

        body.appendChild(card);

    });


}

function buscarMateria(codigo, materias){
    i=0;
    while(i<materias.length & codigo!= materias[i].codigoMateria){
        i++;
    }
    return materias[i];
}

async function materiasPorInscribirse(){
    try{
        const response_inscriptos = await fetch(`${uri_inscriptos}/${matricula}/${cod_carrera}`);  //Materias en las que esta inscritp
        const response_materias = await fetch(`${uri_materias}/${cod_carrera}`);
        if(response_inscriptos.status == 200 & response_materias.status == 200){
            const inscriptos = await response_inscriptos.json();
            const materias = await response_materias.json();
            //console.log(inscriptos);
            //console.log(materias);
            mostrarMateriasParaInscribirse(materias,inscriptos);
        }
    }catch(error){
        console.log(error)
    }
}

function mostrarMateriasParaInscribirse(materias, inscriptos){
    const body = document.getElementById('section-materias-para-inscribirse');
    body.innerHTML = '';


    materias.forEach(element => {
        //Objeto de la materia
        const mat = getMateria(element, inscriptos)
        if(mat!=null){
        
            const card = document.createElement("div");
            card.classList.add("card","mb-2");
            card.style.width ='28rem';

            //Cuerpo de la card
            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body","text-center","d-flex","justify-content-between");

            card.appendChild(cardBody);

            //Title
            const h6 = document.createElement("h6");
            h6.classList.add("card-title","border-bottom");
            h6.textContent = mat.nombre + " (" + mat.anio + "° año)";

            //Button
            const button = document.createElement("button");
            button.classList.add("btn", "btn-sm", "btn-outline-success");
            button.textContent = "Inscribirse";
            button.setAttribute('onclick', `inscribirAlumno(${matricula}, ${cod_carrera}, ${mat.codigoMateria})`);

            cardBody.appendChild(h6);
            cardBody.appendChild(button);

            body.appendChild(card);
        }
    });
}

function getMateria(materia,inscriptos){
    i=0;
    band = false;
    while(i<inscriptos.length & band==false){ 
        if (materia.codigoMateria==inscriptos[i].codigoMateria)
            band = true;
        else
            i++;
    }
    if(band == true)
        return null;
    else
        return materia;
}

async function inscribirAlumno(_matricula, _carrera, _materia){

    //Crea un objeto
    const inscripcion = {
        matricula: _matricula,
        codigocarrera: _carrera,
        codigomateria: _materia
    };

    //Metodo que usa js para conectarse con el bakc
    fetch(uri_inscriptos, {
        method: 'POST',
        headers: {
          //Lo que acepta como respuesta
          'Accept': 'application/json',
          //Lo que envia
          'Content-Type': 'application/json'
        },
        //Convierte a json el objeto
        body: JSON.stringify(inscripcion)
      })
        //En "este punto" se hace la llamada al servdir
    
        //Mecanismo que permite conectar con el back de forma async 
        //Mi app puede seguir funcionando mientras se esta haciendo transferencia de datos con el back
        .then(response => response.json())
        .then(materiasPorInscribirse())
        .then(materiasInscripto())
        //.then(mostrarExito())
        .catch(error => console.error('No se pudo inscribirse.', error));

}

async function bajaAlumno(matricula, carrera, materia){
    fetch(`${uri_inscriptos}/${matricula}/${carrera}/${materia}`, {
      method: 'DELETE'
    })
    .then(response => console.log(response.ok))
    .then(materiasPorInscribirse())
    .then(materiasInscripto())
    .catch(error => console.error('Unable to delete item.', error));
}
