//Metodo que hace la peticion al servidor
async function obtenerMateria(){
    const codigocarrera = document.getElementById('codigocarrera').value.trim();
    const codigomateria = document.getElementById('codigomateria').value.trim();

    /* fetch(`${uri}/${id}`)
    .then(response => response.json())
    .then(data => mostrarAlu(data), mostrarOcultarMensaje(true))
    .catch(error => console.error('ID de alumno invalido.', error), mostrarOcultarMensaje(false)); */

    try{
        const response = await fetch(`${uri_materias}/${codigocarrera}/${codigomateria}`); //Peticion con envio de id
        //Verifica que el codigo de respuesta sea el 200
        if(response.status == 200){
            //En este caso devuelvo un solo alumno
            const materia = await response.json();
            console.log(materia);
            mostrarMateria(materia);
            mostrarOcultarMensajeMateria(true);
        }else
            mostrarOcultarMensajeMateria(false);

    }catch(error){
        console.log(error)
    }
}

//Carga la tarjeta con los datos
function mostrarMateria(materia){
    const card = document.getElementById('materia');
    if(materia!=true){
        if(card.style.display == 'none'){
            card.style.display = 'block';
            document.getElementById('gnamemateria').innerHTML = materia.nombre;
            document.getElementById('ganio').innerHTML = materia.anio;
        }else{
            card.style.display = 'none';
        }
    }else{
        card.style.display = 'none';
    } 
    
    
}

//Muestra u oculta el mensaje de error
function mostrarOcultarMensajeMateria(band){
    if(!band){
        const msj_error = document.getElementById('msj_error_materia');
        if(msj_error.style.display=='none'){
            msj_error.style.display = 'block';
            mostrarMateria(true);
        }else{
            msj_error.style.display = 'none';
        }
    }else{
        console.info("Ocultar msj error");
        msj_error.style.display = 'none';
    }
    
}