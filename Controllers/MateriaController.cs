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
public class MateriaController : ControllerBase
{
    //Aqui vamos hacer uso de esa interface
    private readonly IMateriaRepository _materiaRepository;

    //Con esto tengo acceso a todos los metodos de la interface
    public MateriaController(IMateriaRepository materiaRepository){
       _materiaRepository = materiaRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllMaterias(){
       return Ok(await _materiaRepository.GetAllMaterias());
    }

    //Recibe 2 parametros que son los que se reciben en la funcion
    [HttpGet("{codigocarrera}/{codigomateria}")]
    public async Task<IActionResult> GetMateria(int codigocarrera, int codigmomateria){
       return Ok(await _materiaRepository.GetMateria(codigocarrera, codigmomateria));
    }

    [HttpPost]
    //Como  viene los datos de las materias tienen que ser cargados desde el bodyRequest(json)
    public async Task<IActionResult> CreateMateria([FromBody] Materia materia){
       if(materia == null){
           //Devuelvo un error 400
           return BadRequest();
       }

        //Si por alguna razon lo que me envían no coincide con el modelo que hemos definido
       if(!ModelState.IsValid){
           //El usuario sabe cual es el error
           return BadRequest(ModelState);
       }

       var created = await _materiaRepository.InsertMateria(materia);

        //return un 200
       return Created("Se creo", created);
    }

    [HttpPut]
    //Como  viene los datos de alumnos, ahi mismo se crea el objeto
    public async Task<IActionResult> UpdateMateria([FromBody] Materia materia){
       if(materia == null){
           //Devuelvo un error 400
           return BadRequest();
       }

        //Si por alguna razon lo que me envían no coincide con el modelo que hemos definido
       if(!ModelState.IsValid){
           //El usuario sabe cual es el error
           return BadRequest(ModelState);
       }

        await _materiaRepository.UpdateMateria(materia);

        //return un 200
       return NoContent();
    }

    [HttpDelete("{codigocarrera}/{codigomateria}")]
    public async Task<IActionResult> DeleteMateria(int codigocarrera, int codigomateria){
       await _materiaRepository.DeleteMateria( new Materia {CodigoCarrera = codigocarrera, CodigoMateria = codigomateria});
       
       return NoContent();
    }


}
