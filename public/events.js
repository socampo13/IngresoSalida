window.onload = function(){
    document.getElementById('registro-form').reset();
    document.getElementById('mensaje').textContent = '';
    document.getElementById('tiempoTranscurrido').textContent = '';
}

// Simulación del envío del formulario con animación llamativa
/* document.getElementById('ingreso-btn').addEventListener('click', function() {
    const identificacion = document.getElementById('identificacion').value; */
    /* const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const correo = document.getElementById('correo').value; */

    // Validar el formulario
    /* if (!identificacion) {
        document.getElementById('mensaje').textContent = 'Por favor, completa todos los campos.';
        return;
    } */

    // Simular envío (aquí iría el fetch para la API)
    /* setTimeout(() => {
        // Mostrar mensaje de éxito con animación llamativa
        const mensaje = document.getElementById('mensaje');
        mensaje.textContent = '¡Ingreso registrado con éxito!';
        mensaje.classList.add('success');

        // Limpiar campos después de la animación
        document.getElementById('registro-form').reset(); */

        // Mostrar un tiempo simulado
        /* document.getElementById('tiempoTranscurrido').textContent = 'Tiempo transcurrido: 5 segundos'; */
    /* }, 1000); */ // Simulamos un tiempo de espera de 1 segundo
/* }); */

// Evento para el botón de "Registrar Salida"
/* document.getElementById('salida-btn').addEventListener('click', function() {
    const identificacion = document.getElementById('identificacion').value;

    // Validar que la identificación esté presente
    if (!identificacion) {
        document.getElementById('mensaje').textContent = 'Por favor, ingresa tu número de identificación para registrar la salida.';
        return;
    } */

    // Simular envío (aquí iría el fetch para la API de salida)
    /* setTimeout(() => {
        // Mostrar mensaje de éxito con animación llamativa para la salida
        const mensaje = document.getElementById('mensaje');
        mensaje.textContent = '¡Salida registrada con éxito! Que descanses!';
        mensaje.classList.add('success');

        // Limpiar campo de identificación después de la animación
        document.getElementById('registro-form').reset(); */

        /* // Mostrar tiempo de salida simulado
        document.getElementById('tiempoTranscurrido').textContent = 'Salida registrada. Tiempo transcurrido: '; */
    /* }, 1000); */ // Simulamos un tiempo de espera de 1 segundo
/* }); */


