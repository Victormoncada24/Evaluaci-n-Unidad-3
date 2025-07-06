$(document).ready(function() {
    // Inicializar DataTable con configuración mejorada
    const table = $('#dataTable').DataTable({
        responsive: true,
        language: {
            "decimal":        "",
            "emptyTable":     "No hay datos disponibles en la tabla",
            "info":           "Mostrando _START_ a _END_ de _TOTAL_ entradas",
            "infoEmpty":      "Mostrando 0 a 0 de 0 entradas",
            "infoFiltered":   "(filtrado de _MAX_ entradas totales)",
            "infoPostFix":    "",
            "thousands":      ",",
            "lengthMenu":     "Mostrar _MENU_ entradas",
            "loadingRecords": "Cargando...",
            "processing":     "Procesando...",
            "search":         "Buscar:",
            "zeroRecords":    "No se encontraron registros coincidentes",
            "paginate": {
                "first":      "Primero",
                "last":       "Último",
                "next":       "Siguiente",
                "previous":   "Anterior"
            }
        },
        columns: [
            { title: "ID" },
            { title: "Nombre" },
            { title: "Usuario" },
            { title: "Email/Detalle" }
        ]
    });

    // Función para cargar datos
    function loadData(dataType) {
        table.clear().draw();
        
        $.ajax({
            url: `https://jsonplaceholder.typicode.com/${dataType}`,
            method: 'GET',
            dataType: 'json',
            beforeSend: function() {
                // Mostrar carga
                $('#dataTable').addClass('loading');
            },
            success: function(data) {
                const limitedData = data.slice(0, 10);
                const rows = [];
                
                limitedData.forEach(item => {
                    if (dataType === 'users') {
                        rows.push([
                            item.id,
                            item.name,
                            item.username,
                            item.email
                        ]);
                    } else if (dataType === 'posts') {
                        rows.push([
                            item.id,
                            item.title,
                            `User ${item.userId}`,
                            item.body.substring(0, 50) + '...'
                        ]);
                    } else if (dataType === 'todos') {
                        rows.push([
                            item.id,
                            item.title,
                            `User ${item.userId}`,
                            item.completed ? 
                                '<span class="completed">Completo</span>' : 
                                '<span class="pending">Pendiente</span>'
                        ]);
                    }
                });
                
                table.rows.add(rows).draw();
            },
            error: function() {
                alert('Error al cargar los datos. Intente nuevamente.');
            },
            complete: function() {
                $('#dataTable').removeClass('loading');
            }
        });
    }

    // Cargar datos al hacer clic en el botón
    $('#loadData').click(function() {
        const dataType = $('#dataSelector').val();
        loadData(dataType);
    });

    // Cargar usuarios por defecto al iniciar
    loadData('users');
});