$(document).on("click", "#btnEdit", function(){
    var eid = $(this).data('id');
    var ename = $(this).data('name');
    var elastname = $(this).data('lastname');
    var ecarrera = $(this).data('carrera');
    var eregistro= $(this).data('registro');

    $("#eid").val(eid);
    $("#ename").val(ename);
    $("#elastname").val(elastname);
    $("#ecarrera").val(ecarrera);
    $("#eregistro").val(eregistro);
   
})