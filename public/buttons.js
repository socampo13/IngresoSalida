document.getElementById('ingreso-btn').addEventListener('click', () => {
    const identificacion = document.getElementById('identificacion').value;
    
    fetch('/api/registro/ingreso', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identificacion })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('mensaje').textContent = data.message || data.error;
        document.getElementById('tiempoTranscurrido').textContent = '';
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('mensaje').textContent = 'Hubo un error al registrar el ingreso.';
    });
});

document.getElementById('salida-btn').addEventListener('click', () => {
    const identificacion = document.getElementById('identificacion').value;
            
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
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('mensaje').textContent = 'Hubo un error al registrar la salida.';
    });
});