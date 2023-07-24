
const selectPropiedad = document.querySelector("select.propiedad");
const selectUbicacion = document.querySelector("select.ubicacion");
const inputMetros2 = document.querySelector("input#metros2");

const btnCotizar = document.querySelector("button.button-outline");
const valorPoliza = document.querySelector("span#valorPoliza");
const btnGuardar = document.querySelector("button.guardar");


function recuperarHistorialLS() {
    return JSON.parse(localStorage.getItem("historialCotizaciones")) || []
}

const arrayHistorial = recuperarHistorialLS()



function cargarSelectPropiedad() {
    if (datosPropiedad && datosPropiedad.length > 0) {
        selectPropiedad.innerHTML = "<option selected disabled>...</option>"; // Agrega la opción "..." por defecto
        datosPropiedad.forEach((propiedad) => {
            selectPropiedad.innerHTML += `<option value="${propiedad.factor}">${propiedad.tipo}</option>`;
        });
    }
}

function cargarSelectUbicacion() {
    if (datosUbicacion && datosUbicacion.length > 0) {
        selectUbicacion.innerHTML = "<option selected disabled>...</option>"; // Agrega la opción "..." por defecto
        datosUbicacion.forEach((ubicacion) => {
            selectUbicacion.innerHTML += `<option value="${ubicacion.factor}">${ubicacion.tipo}</option>`;
        });
    }
}

function validarDatosSeleccionados() {
    return (
        selectPropiedad.value !== "..." &&
        selectUbicacion.value !== "..." &&
        inputMetros2.value.trim() !== ""
    );
}

document.addEventListener("DOMContentLoaded", () => {
    cargarSelectPropiedad();
    cargarSelectUbicacion();

    btnCotizar.addEventListener("click", () => {
        if (validarDatosSeleccionados()) {
            const coti = new Cotizador(inputMetros2.value, selectPropiedad.value, selectUbicacion.value, costoM2);
            valorPoliza.textContent = coti.cotizar();
        } else {
            alert("⚠️ Completa los datos solicitados.");
        }
    });

    btnGuardar.addEventListener("click", () => {
        let nuevoHistorial = {
            propiedad: selectPropiedad[selectPropiedad.options.selectedIndex].textContent,
            ubicacion: selectUbicacion[selectUbicacion.options.selectedIndex].textContent,
            metros2: inputMetros2.value,
            costoM2: costoM2,
            fechaCotización: new Date(),
        };
        arrayHistorial.push(nuevoHistorial);
        localStorage.setItem("historialCotizaciones", JSON.stringify(arrayHistorial));

        Swal.fire(
            'Se guardó correctamente la cotización en el historial.',)

    });
});
