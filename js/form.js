$(document).ready(function() {
    // Inicializar datepicker con formato dd/mm/yyyy
    $('#date').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '1900:2025',
        beforeShow: function(input, inst) {
            setTimeout(function() {
                inst.dpDiv.css({
                    'z-index': 9999
                });
            }, 0);
        }
    });

    // Validación del formulario
    $('#userForm').submit(function(e) {
        e.preventDefault();
        let isValid = true;

        // Resetear errores
        $('.error-message').hide();
        $('input, select').removeClass('error');

        // Validar campos requeridos
        $('#userForm input[required]').each(function() {
            if (!$(this).val().trim()) {
                $(this).addClass('error');
                $(this).next('.error-message').text('Este campo es requerido').show();
                isValid = false;
            }
        });

        // Validar formato de email
        const email = $('#email').val().trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            $('#email').addClass('error');
            $('#email').next('.error-message').text('Ingrese un email válido').show();
            isValid = false;
        }

        // Validar formato de fecha (dd/mm/yyyy)
        const date = $('#date').val().trim();
        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        if (date && !dateRegex.test(date)) {
            $('#date').addClass('error');
            $('#date').next('.error-message').text('Formato de fecha inválido (dd/mm/yyyy)').show();
            isValid = false;
        }

        // Validar sitio web si tiene valor
        const website = $('#website').val().trim();
        if (website && !isValidUrl(website)) {
            $('#website').addClass('error');
            $('#website').next('.error-message').text('Ingrese una URL válida').show();
            isValid = false;
        }

        // Si todo es válido, mostrar mensaje de éxito
        if (isValid) {
            alert('Usuario creado correctamente');
            $('#userForm')[0].reset();
        }
    });

    // Botón cancelar
    $('#cancelBtn').click(function() {
        $('#userForm')[0].reset();
        $('.error-message').hide();
        $('input, select').removeClass('error');
    });

    // Función para validar URL
    function isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }
});