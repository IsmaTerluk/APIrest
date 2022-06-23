using APIprueba.Models;
using APIprueba.Database;
using Microsoft.EntityFrameworkCore;
using APIprueba.Database.Repositorie;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c => 
{
    c.SwaggerDoc("v1", new OpenApiInfo {Title = "APIpostgreSQL", Version = "v1"});
});

//Inyectamos el configurador de postgreSQL, para establecer la conexion
var postgreSQLConecction = new PostgreSQLConfig(builder.Configuration.GetConnectionString("PostgreSQLConnection"));
//Lo añadimos como servicio a nuestra app
builder.Services.AddSingleton(postgreSQLConecction);

//De este modo inyectamos la dependencia de la coneccion y automaticamente por parametros estara enviando
//El conecctionString 
builder.Services.AddScoped<IAlumnoRepository, AlumnoRepository>();
builder.Services.AddScoped<IMateriaRepository, MateriaRepository>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//Configuramos nuestra app para servir archivos estaticos
app.UseDefaultFiles();
app.UseStaticFiles();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
