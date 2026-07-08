async function cargarEstado() {
    try {
        const respuesta = await fetch("estado.json?" + new Date().getTime());
        const datos = await respuesta.json();

        const estado = document.querySelector(".status");
        const boton = document.getElementById("btnEntrar");

        if (datos.estado === "online") {

            estado.innerHTML = "Sistema disponible";
            estado.style.background = "#dcfce7";
            estado.style.color = "#166534";

            boton.disabled = false;

            boton.onclick = () => {
                window.location.href = datos.url;
            };

        } else {

            estado.innerHTML = "Sistema no disponible";
            estado.style.background = "#fee2e2";
            estado.style.color = "#991b1b";

            boton.disabled = true;
        }

    } catch (e) {

        document.querySelector(".status").innerHTML =
            "Error al consultar el servidor";

        document.getElementById("btnEntrar").disabled = true;

    }
}

cargarEstado();