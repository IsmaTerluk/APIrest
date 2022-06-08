const uri = '../api/Alumno';
//let allAlumnos = [];

//Cuando trabajamos con metodos asincronos hay que capturar el error
async function getAllAlumnos(display=null){
    try{
        const response = await fetch(uri);        //Este es la peticion -> Nos responde con una promise(promesa)
        if(response.status == 200){               //Verifica que el codigo de respuesta sea el 200
            const alumno = await response.json(); //Este metodo es para poder acceder a la informacion json que nos devuelve la peticion
            if(display==null)                    
                ocultar_mostrar_listado(alumno);  //alumno es un arreglo con todo los datos
            else
                mostrarAlumnos(alumno);   
        }
    }catch(error){
        console.log(error);
    }
}


function mostrarAlumnos(alumnos){
    //Nos traemos el cuerpo de la table
    const body = document.getElementById('section-all-alumnos');
    body.innerHTML = '';

    //Crea un botton
    const button = document.createElement('button');

    //Para cada alumno
    alumnos.forEach(alu => {

        //Boton Editar
        let editButton = button.cloneNode(false);
        editButton.innerText = 'Editar';
        editButton.className = 'btn btn-outline-info';
        editButton.id ="btnEdit";
        //Aributos para manejar el modal
        editButton.setAttribute('data-bs-toggle',`modal` );
        editButton.setAttribute('data-bs-target',`#editModal` );
        //Atributos para poder enviarle al modal los datos
        editButton.setAttribute('data-id',alu.id );
        editButton.setAttribute('data-name',alu.name );
        editButton.setAttribute('data-lastname',alu.lastname );
        editButton.setAttribute('data-carrera',alu.carrera );
        editButton.setAttribute('data-registro',alu.registro);

        //Boton Eliminar
        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Eliminar';
        deleteButton.className = 'btn btn-outline-danger';
        deleteButton.setAttribute('onclick', `deleteAlumno(${alu.id})`);

        //Agrega una fila a la tabla
        let tr = body.insertRow();

        //Inserta datos en la columa 0
        tr.insertCell(0).appendChild(document.createTextNode(alu.id));

        //Inserta datos en la columa 1
        tr.insertCell(1).appendChild(document.createTextNode(alu.name + " " + alu.lastname));

        //Inserta datos en la columa 2
        tr.insertCell(2).appendChild(document.createTextNode(alu.carrera));

        //Inserta datos en la columa 3
        tr.insertCell(3).appendChild(document.createTextNode(alu.registro));

        //Inserta datos en la columa 4
        tr.insertCell(4).appendChild(editButton);

        //Inserta datos en la columa 5
        tr.insertCell(5).appendChild(deleteButton);

    });

    //allAlumnos = alumnos;

}


function ocultar_mostrar_listado(alumno){
    const table = document.getElementById('getAlumnos');
    const flecha = document.getElementById('flechaAll')
    if(table.style.display == 'none'){
        table.style.display = 'block';
        flecha.innerHTML = `<i class="bi bi-caret-up-fill">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
                                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                                </svg>
                            </i>`;
        mostrarAlumnos(alumno);
    }else{
        table.style.display = 'none';
        flecha.innerHTML = `<i class="bi bi-caret-down-fill" id="flecha1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                </svg>
                            </i>`;
    }
}
