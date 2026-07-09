async function cargarEstado() {

    const estado = document.querySelector(".status");
    const boton = document.getElementById("btnEntrar");
    const mensaje = document.getElementById("mensaje");

    try {

        const respuesta = await fetch("estado.json?" + Date.now());

        const datos = await respuesta.json();

        if (!datos.url) {

            estado.innerHTML = "Sistema no disponible";
            estado.style.background = "#FEE2E2";
            estado.style.color = "#991B1B";

            mensaje.innerHTML =
                "No existe una dirección publicada para el sistema.";

            boton.disabled = true;

            return;
        }

        const controller = new AbortController();

        const timeout = setTimeout(() => controller.abort(), 3000);

        const health = await fetch(`${datos.url}/api/health`, {
            cache: "no-store",
            signal: controller.signal
        });

        clearTimeout(timeout);

        if (!health.ok) {
            throw new Error("La API no respondió correctamente.");
        }

        estado.innerHTML = "Sistema disponible";
        estado.style.background = "#DCFCE7";
        estado.style.color = "#166534";

        mensaje.innerHTML =
            "El sistema está disponible y listo para utilizarse.";

        boton.disabled = false;

        boton.onclick = () => {
            window.location.href = datos.url;
        };

    }
    catch {

        estado.innerHTML = "Error al consultar el servidor";
        estado.style.background = "#FEE2E2";
        estado.style.color = "#991B1B";

        mensaje.innerHTML =
            "No fue posible consultar el estado.";

        boton.disabled = true;
    }

}

cargarEstado();