const uri_alumnos = '../api/Alumno';
const uri_carreras ='../api/Carrera';
//let allAlumnos = [];

//Cuando trabajamos con metodos asincronos hay que capturar el error
async function getAllAlumnos(){
    try{
        const response_alumnos = await fetch(uri_alumnos);        //Este es la peticion -> Nos responde con una promise(promesa)
        const response_carreras = await fetch(uri_carreras);
        if(response_alumnos.status == 200 & response_carreras.status==200){               //Verifica que el codigo de respuesta sea el 200
            const alumnos = await response_alumnos.json(); //Este metodo es para poder acceder a la informacion json que nos devuelve la peticion
            const carreras = await response_carreras.json();
            mostrarAlumnos(alumnos,carreras);   
        }
    }catch(error){
        console.log(error);
    }
}


function mostrarAlumnos(alumnos, carreras){
    //Nos traemos el cuerpo de la table
    const body = document.getElementById('section-all-alumnos');
    body.innerHTML = '';

    //Crea un botton
    const button = document.createElement('button');

    //Para cada alumno
    alumnos.forEach(alu => {

        //Boton Editar
        let editButton = button.cloneNode(false);
        //editButton.innerText = 'Editar';
        editButton.innerHTML =
        `<i class="bi bi-pen-fill">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
            </svg>
        </i>`
        editButton.className = 'btn btn-outline-info';
        editButton.id ="btnEdit";
        //Aributos para manejar el modal
        editButton.setAttribute('data-bs-toggle',`modal` );
        editButton.setAttribute('data-bs-target',`#editModal` );
        //Atributos para poder enviarle al modal los datos
        editButton.setAttribute('data-matricula',alu.matricula );
        editButton.setAttribute('data-nombre',alu.nombre );
        editButton.setAttribute('data-apellido',alu.apellido );
        editButton.setAttribute('data-carrera',alu.codigoCarrera);
        editButton.setAttribute('data-dni',alu.dni);

        //Boton Eliminar
        let deleteButton = button.cloneNode(false);
        //deleteButton.innerText = 'Eliminar';
        deleteButton.innerHTML = 
        `<i class="bi bi-trash-fill">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
            </svg>
        </i>`;
        deleteButton.className = 'btn btn-outline-danger';
        deleteButton.setAttribute('onclick', `deleteAlumno(${alu.matricula})`);

        //Agrega una fila a la tabla
        let tr = body.insertRow();

        //Inserta datos en la columa 0
        tr.insertCell(0).appendChild(document.createTextNode(alu.matricula));

        //Inserta datos en la columa 1
        tr.insertCell(1).appendChild(document.createTextNode(alu.nombre));

        //Inserta datos en la columa 2
        tr.insertCell(1).appendChild(document.createTextNode(alu.apellido));


        //Inserta datos en la columa 3
        tr.insertCell(3).appendChild(document.createTextNode(alu.dni));


        //Inserta datos en la columna 4
        tr.insertCell(4).appendChild(document.createTextNode(carreras[alu.codigoCarrera-100].iniciales));

        //Inserta datos en la columa 5
        tr.insertCell(5).appendChild(editButton);

        //Inserta datos en la columa 6
        tr.insertCell(6).appendChild(deleteButton);

    });

    //allAlumnos = alumnos;

}
