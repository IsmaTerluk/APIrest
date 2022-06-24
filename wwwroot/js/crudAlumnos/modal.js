$(document).on("click", "#btnEdit", function(){
    var ematricula = $(this).data('matricula');
    var enombre = $(this).data('nombre');
    var eapellido = $(this).data('apellido');
    var ecarrera = $(this).data('carrera');
    var edni= $(this).data('dni');

    $("#ematricula").val(ematricula);
    $("#enombre").val(enombre);
    $("#eapellido").val(eapellido);
    $("#ecarrera").val(ecarrera);
    $("#edni").val(edni);
   
})