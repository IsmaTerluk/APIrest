$(document).on("click", "#btnEditMateria", function(){
    
    var ecodigocarrera = $(this).data('codigocarrera');
    var ecodigomateria = $(this).data('codigomateria');
    var enombre = $(this).data('nombre');
    var eanio = $(this).data('anio');

    $("#ecodigomat").val(ecodigomateria);
    $("#enombremat").val(enombre);
    $("#eaniomat").val(eanio);
    $("#ecarreramat").val(ecodigocarrera);
   
})