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