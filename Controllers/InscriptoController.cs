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
public class InscriptoController : ControllerBase
{
    //Aqui vamos hacer uso de esa interface
    private readonly IInscriptoRepository _inscriptoRepository;

    //Con esto tengo acceso a todos los metodos de la interface
    public InscriptoController(IInscriptoRepository inscriptoRepository){
       _inscriptoRepository = inscriptoRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllInscriptos(){
       return Ok(await _inscriptoRepository.GetAllInscriptos());
    }

    //Recibe un parametro que es el que agrega al parametro
    [HttpGet("{matricula}/{codigocarrera}")]
    public async Task<IActionResult> GetInscriptoCarrera(int matricula,int codigocarrera){
       return Ok(await _inscriptoRepository.GetInscriptoCarrera(matricula,codigocarrera));
    }

    [HttpPost]
    //Como  viene los datos de alumnos tienen que ser cargados desde el bodyRequest(json)
    public async Task<IActionResult> CreateInscripto([FromBody] Inscripto inscripto){
       if(inscripto == null){
           //Devuelvo un error 400
           return BadRequest();
       }

        //Si por alguna razon lo que me envían no coincide con el modelo que hemos definido
       if(!ModelState.IsValid){
           //El usuario sabe cual es el error
           return BadRequest(ModelState);
       }

       var created = await _inscriptoRepository.InsertInscripto(inscripto);

        //return un 200
       return Created("Se creo", created);
    }

    [HttpPut]
    //Como  viene los datos de alumnos, ahi mismo se crea el objeto
    public async Task<IActionResult> UpdateInscripto([FromBody] Inscripto inscripto){
       if(inscripto == null){
           //Devuelvo un error 400
           return BadRequest();
       }

        //Si por alguna razon lo que me envían no coincide con el modelo que hemos definido
       if(!ModelState.IsValid){
           //El usuario sabe cual es el error
           return BadRequest(ModelState);
       }

        await _inscriptoRepository.UpdateInscripto(inscripto);

        //return un 200
       return NoContent();
    }

    [HttpDelete("{matricula}/{codigocarrera}/{codigomateria}")]
    public async Task<IActionResult> DeleteAlumno(int matricula, int codigocarrera, int codigomateria){
       await _inscriptoRepository.DeleteInscripto( new Inscripto {Matricula = matricula, CodigoCarrera= codigocarrera, CodigoMateria = codigomateria});
       
       return NoContent();
    }


}