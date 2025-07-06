$(document).ready(function() {
    // Inicializar datepicker
    $('#date').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '1900:2025'
    });

    // Validación del formulario
    $('#userForm').submit(function(e) {
        e.preventDefault();
        let isValid = true;

        // Validar campos requeridos
        $('#userForm input[required]').each(function() {
            const $input = $(this);
            const $error = $input.next('.error-message');
            
            if (!$input.val().trim()) {
                $input.addClass('error');
                $error.text('Este campo es requerido').show();
                isValid = false;
            } else {
                $input.removeClass('error');
                $error.hide();
            }
        });

        // Validar email
        const email = $('#email').val().trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            $('#email').addClass('error');
            $('#email').next('.error-message').text('Ingrese un email válido').show();
            isValid = false;
        }

        // Validar fecha (formato dd/mm/yyyy)
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
            alert('Datos enviados correctamente');
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