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
                "El sistema no está disponible en este momento.";

            boton.disabled = true;

            return;
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