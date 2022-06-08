using Microsoft.AspNetCore.Mvc;
using APIprueba.Database.Repositorie;
using APIprueba.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace APIprueba.Controllers;

//Ruteo
[Route("api/[controller]")]
//[ApiController]
public class AlumnoController : ControllerBase
{
    //Aqui vamos hacer uso de esa interface
    private readonly IAlumnoRepository _alumnoRepository;

    //Con esto tengo acceso a todos los metodos de la interface
    public AlumnoController(IAlumnoRepository alumnoRepository){
       _alumnoRepository = alumnoRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllAlumnos(){
       return Ok(await _alumnoRepository.GetAllAlumnos());
    }

    //Recibe un parametro que es el que agrega al parametro
    [HttpGet("{id}")]
    public async Task<IActionResult> GetAlumno(int id){
       return Ok(await _alumnoRepository.GetAlumno(id));
    }

    [HttpPost]
    //Como  viene los datos de alumnos tienen que ser cargados desde el bodyRequest(json)
    public async Task<IActionResult> CreateAlumno([FromBody] Alumno alumno){
       if(alumno == null){
           //Devuelvo un error 400
           return BadRequest();
       }

        //Si por alguna razon lo que me envían no coincide con el modelo que hemos definido
       if(!ModelState.IsValid){
           //El usuario sabe cual es el error
           return BadRequest(ModelState);
       }

       var created = await _alumnoRepository.InsertAlumno(alumno);

        //return un 200
       return Created("se creo", created);
    }

    [HttpPut]
    //Como  viene los datos de alumnos, ahi mismo se crea el objeto
    public async Task<IActionResult> UpdateAlumno([FromBody] Alumno alumno){
       if(alumno == null){
           //Devuelvo un error 400
           return BadRequest();
       }

        //Si por alguna razon lo que me envían no coincide con el modelo que hemos definido
       if(!ModelState.IsValid){
           //El usuario sabe cual es el error
           return BadRequest(ModelState);
       }

        await _alumnoRepository.UpdateAlumno(alumno);

        //return un 200
       return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAlumno(int id){
       await _alumnoRepository.DeleteAlumno( new Alumno {Id = id});
       
       return NoContent();
    }


}
