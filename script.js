async function cargarEstado() {

    const estado = document.querySelector(".status");
    const boton = document.getElementById("btnEntrar");
    const mensaje = document.getElementById("mensaje");

    try {

        const respuesta = await fetch("estado.json?" + Date.now());

        const datos = await respuesta.json();

        if (!datos.url) {

            estado.innerHTML = "Servidor fuera de servicio";
            estado.style.background = "#FEE2E2";
            estado.style.color = "#991B1B";

            mensaje.innerHTML =
                "El sistema no está disponible en este momento.<br>Intente nuevamente más tarde.";

            boton.disabled = true;

            return;
        }

        estado.innerHTML = "Servidor en línea";
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

        estado.innerHTML = "Servidor fuera de servicio";
        estado.style.background = "#FEE2E2";
        estado.style.color = "#991B1B";

        mensaje.innerHTML =
            "No fue posible consultar el estado del sistema.";

        boton.disabled = true;
    }

}

cargarEstado();