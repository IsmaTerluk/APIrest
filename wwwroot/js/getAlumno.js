//Muestra o oculta el input para ingresar el ID Alumno
function getAlumno(){

    const table = document.getElementById('unAlumno');
    const flecha = document.getElementById('flechaGet')
    if(table.style.display == 'none'){
        table.style.display = 'block';
        flecha.innerHTML = `<i class="bi bi-caret-up-fill">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
                                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                                </svg>
                            </i>`;
    }else{
        table.style.display = 'none';
        flecha.innerHTML = `<i class="bi bi-caret-down-fill" id="flecha1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                                </svg>
                            </i>`;
                            
        //Oculta la card de alumno
        const card = document.getElementById('alumno');
        card.style.display = 'none';

        //Oculta el mensaje de error
        const msj_error = document.getElementById('msj_error');
        msj_error.style.display = 'none';

        //Limpia el input
        document.getElementById('id').value='';
    }

}

//Metodo que hace la peticion al servidor
async function obtenerAlumno(){
    //Capturamos el id
    const id = document.getElementById('id').value.trim();
    /* fetch(`${uri}/${id}`)
    .then(response => response.json())
    .then(data => mostrarAlu(data), mostrarOcultarMensaje(true))
    .catch(error => console.error('ID de alumno invalido.', error), mostrarOcultarMensaje(false)); */

    try{
        const response = await fetch(`${uri}/${id}`); //Peticion con envio de id
        //Verifica que el codigo de respuesta sea el 200
        if(response.status == 200){
            //En este caso devuelvo un solo alumno
            const alumno = await response.json();
            mostrarAlu(alumno);
            mostrarOcultarMensaje(true);
        }else
            mostrarOcultarMensaje(false);

    }catch(error){
        console.log(error)
    }
}

//Carga la tarjeta con los datos
function mostrarAlu(alu){
    const card = document.getElementById('alumno');
    if(alu!=true){
        if(card.style.display == 'none'){
            card.style.display = 'block';
            document.getElementById('gname').innerHTML = alu.name + " " + alu.lastname;
            document.getElementById('gcarrera').innerHTML = alu.carrera;
            document.getElementById('gregistro').innerHTML = alu.registro;
        }else{
            card.style.display = 'none';
        }
    }else{
        card.style.display = 'none';
    } 
    
    
}

//Muestra u oculta el mensaje de error
function mostrarOcultarMensaje(band){
    if(!band){
        const msj_error = document.getElementById('msj_error');
        if(msj_error.style.display=='none'){
            msj_error.style.display = 'block';
            mostrarAlu(true);
        }else{
            msj_error.style.display = 'none';
        }
    }else{
        console.info("Ocultar msj error");
        msj_error.style.display = 'none';
    }
    
}