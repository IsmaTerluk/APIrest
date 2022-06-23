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
public class CarreraController : ControllerBase
{
    //Aqui vamos hacer uso de esa interface
    private readonly ICarreraRepository _carreraRepository;

    //Con esto tengo acceso a todos los metodos de la interface
    public CarreraController(ICarreraRepository carreraRepository){
       _carreraRepository = carreraRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllCarreras(){
       return Ok(await _carreraRepository.GetAllCarreras());
    }

    //Recibe 2 parametros que son los que se reciben en la funcion
    [HttpGet("{codigocarrera}")]
    public async Task<IActionResult> GetCarrera(int codigocarrera){
       return Ok(await _carreraRepository.GetCarrera(codigocarrera));
    }

    [HttpPost]
    //Como  viene los datos de las materias tienen que ser cargados desde el bodyRequest(json)
    public async Task<IActionResult> CreateCarrera([FromBody] Carrera carrera){
       if(carrera == null){
           //Devuelvo un error 400
           return BadRequest();
       }

        //Si por alguna razon lo que me envían no coincide con el modelo que hemos definido
       if(!ModelState.IsValid){
           //El usuario sabe cual es el error
           return BadRequest(ModelState);
       }

       var created = await _carreraRepository.InsertCarrera(carrera);

        //return un 200
       return Created("Se creo", created);
    }

    [HttpPut]
    //Como  viene los datos de alumnos, ahi mismo se crea el objeto
    public async Task<IActionResult> UpdateCarrera([FromBody] Carrera carrera){
       if(carrera == null){
           //Devuelvo un error 400
           return BadRequest();
       }

        //Si por alguna razon lo que me envían no coincide con el modelo que hemos definido
       if(!ModelState.IsValid){
           //El usuario sabe cual es el error
           return BadRequest(ModelState);
       }

        await _carreraRepository.UpdateCarrera(carrera);

        //return un 200
       return NoContent();
    }

    [HttpDelete("{codigocarrera}")]
    public async Task<IActionResult> DeleteCarrera(int codigocarrera){
       await _carreraRepository.DeleteCarrera( new Carrera {CodigoCarrera = codigocarrera});
       
       return NoContent();
    }


}