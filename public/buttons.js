// Validación de longitud de identificación
function validarIdentificacion(identificacion){
  const regex = /^[0-9]{8,10}$/;
  return regex.test(identificacion);
}

// Registrar ingreso
document.getElementById('ingreso-btn').addEventListener('click', () => {
    const identificacion = document.getElementById('identificacion').value;
    
    if (!validarIdentificacion(identificacion)){
      document.getElementById('mensaje').textContent = 'Ingresa un numero de identificacion valido';
      return;
    }

    fetch('/api/registro/ingreso', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identificacion })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('mensaje').textContent = data.message || data.error;
        document.getElementById('tiempoTranscurrido').textContent = '';

        // Limpiar el input luego de hacer click
        document.getElementById('identificacion').value = '';
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('mensaje').textContent = 'Hubo un error al registrar el ingreso.';
    });
});

//Registrar salida
document.getElementById('salida-btn').addEventListener('click', () => {
    const identificacion = document.getElementById('identificacion').value;
    // Validar cantidad de numeros
    if (!validarIdentificacion(identificacion)){
      document.getElementById('mensaje').textContent = 'Ingresa un numero de identificacion valido';
      return;
    }
            
    fetch('/api/registro/salida', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identificacion })
    })
    .then(response => response.json())
    .then(data => {
      document.getElementById('mensaje').textContent = data.message || data.error;
                
      // Mostrar el tiempo transcurrido si está disponible
      if (data.tiempoTranscurrido) {
        document.getElementById('tiempoTranscurrido').textContent = data.tiempoTranscurrido;
      } else {
        document.getElementById('tiempoTranscurrido').textContent = ''; // Limpiar si no hay tiempo
      }

      // Limpiar el campo de texto de identificacion 
      document.getElementById('identificacion').value = '';
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('mensaje').textContent = 'Hubo un error al registrar la salida.';
    });
});