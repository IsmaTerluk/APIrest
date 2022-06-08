//Muestra u oculta el formulario
function mostrarFormulario(){
    const table = document.getElementById('insertAlumno');
    const flecha = document.getElementById('flechaPost');
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
    }

    //Oculta mensaje de exito 
    const exito = document.getElementById('msj_exito');
    exito.style.display = 'none';

    //Vacia los input al ocultar el formulario
    /* document.getElementById('postName').value='';
    document.getElementById('postLastname').value='';
    document.getElementById('postCarrera').value='Carrera';
    document.getElementById('postRegistro').value=''; */
}

//Metodo que envia los datos al servidor
function postAlumno(){

    //Captura los valores de los input
    const pname = document.getElementById('postName');
    const plastname = document.getElementById('postLastname');
    const pcarrera = document.getElementById('postCarrera');
    const pregistro = document.getElementById('postRegistro');

    //Crea un objeto
    const alu = {
        name: pname.value.trim(),
        lastname: plastname.value.trim(),
        carrera: pcarrera.value.trim(),
        registro: pregistro.value.trim()
    };

    //Metodo que usa js para conectarse con el bakc
    fetch(uri, {
        method: 'POST',
        headers: {
          //Lo que acepta como respuesta
          'Accept': 'application/json',
          //Lo que envia
          'Content-Type': 'application/json'
        },
        //Convierte a json el objeto
        body: JSON.stringify(alu)
      })
        //En "este punto" se hace la llamada al servdir
    
        //Mecanismo que permite conectar con el back de forma async 
        //Mi app puede seguir funcionando mientras se esta haciendo transferencia de datos con el back
        .then(response => response.json())
        .then(() => {
          pname.value = '',
          plastname.value='',
          pcarrera.value='Carrera'
          pregistro.value=''
        })
        .then(mostrarExito())
        .catch(error => console.error('No se pudo insertar alumno.', error));
}

//Metodo que muestra mensaje de inserccion correcta
function mostrarExito(){
    const exito = document.getElementById('msj_exito');
    if(exito.style.display == 'none'){
        exito.style.display ='block';
    }
}


