// Esperamos que el contenido de la página se haya cargado completamente
window.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formularioIMC");

    // Cuando el formulario se envíe, llamamos a la función para calcular el IMC
    formulario.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevenimos la recarga de la página al enviar el formulario
        simuladorIMC();
    });

    // Mostrar historial cuando la página cargue
    mostrarHistorial();
});

// Función para obtener los datos del formulario
function solicitarDatos() {
    const pesoInput = document.getElementById("peso");
    const alturaInput = document.getElementById("altura");

    let peso = parseFloat(pesoInput.value);
    let altura = parseFloat(alturaInput.value);

    // Validación
    if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
        mostrarError("Por favor, ingresa valores válidos y mayores a 0.");
        return null;
    }

    // Si la altura está en cm, la convertimos a metros
    if (altura > 3) {
        altura = altura / 100;
    }

    return { peso, altura };
}

// Función para calcular el IMC
function calcularIMC(peso, altura) {
    const imc = peso / (altura * altura);
    let clasificacion = "";

    if (imc < 18.5) {
        clasificacion = "Bajo peso";
    } else if (imc >= 18.5 && imc <= 24.9) {
        clasificacion = "Peso normal";
    } else if (imc >= 25 && imc <= 29.9) {
        clasificacion = "Sobrepeso";
    } else if (imc >= 30 && imc <= 34.9) {
        clasificacion = "Obesidad I";
    } else if (imc >= 35 && imc <= 39.9) {
        clasificacion = "Obesidad II";
    } else {
        clasificacion = "Obesidad III";
    }

    return { imc, clasificacion };
}

// Función para mostrar los resultados en la página
function mostrarResultados(peso, altura, imc, clasificacion) {
    const resultadoDiv = document.getElementById("resultado");

    // Limpiar el contenido anterior y las clases
    resultadoDiv.className = '';

    // Asignar la clase correspondiente según la clasificación
    if (clasificacion === "Bajo peso") {
        resultadoDiv.classList.add("bajoPeso");
    } else if (clasificacion === "Peso normal") {
        resultadoDiv.classList.add("pesoNormal");
    } else if (clasificacion === "Sobrepeso") {
        resultadoDiv.classList.add("sobrepeso");
    } else if (clasificacion === "Obesidad I" || clasificacion === "Obesidad II" || clasificacion === "Obesidad III") {
        resultadoDiv.classList.add("obesidad");
    }

    resultadoDiv.innerHTML = `
        <p><strong>Peso:</strong> ${peso} kg</p>
        <p><strong>Altura:</strong> ${altura.toFixed(2)} m</p>
        <p><strong>IMC:</strong> ${imc.toFixed(2)}</p>
        <p><strong>Clasificación:</strong> ${clasificacion}</p>
    `;

    // Guardamos los resultados en el historial
    guardarEnHistorial(peso, altura, imc, clasificacion);
}

// Función para mostrar errores en la página
function mostrarError(mensaje) {
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.className = ''; // Quitar cualquier clase previa
    resultadoDiv.innerHTML = `<p style="color: red;">${mensaje}</p>`;
}

// Función para guardar los resultados en el historial
function guardarEnHistorial(peso, altura, imc, clasificacion) {
    const historialDiv = document.getElementById("historial");
    const historial = JSON.parse(localStorage.getItem("historial")) || [];

    // Crear un nuevo registro
    const nuevoRegistro = {
        fecha: new Date().toLocaleString(),
        peso,
        altura,
        imc,
        clasificacion
    };

    // Insertamos el nuevo registro al principio del historial para que el último quede arriba
    historial.unshift(nuevoRegistro);

    // Guardamos el historial en localStorage
    localStorage.setItem("historial", JSON.stringify(historial));

    mostrarHistorial(); // Actualizamos la vista del historial
}

// Función para mostrar el historial en la página
function mostrarHistorial() {
    const historialDiv = document.getElementById("historial");
    const historial = JSON.parse(localStorage.getItem("historial")) || [];

    if (historial.length === 0) {
        historialDiv.innerHTML = "<p>Aún no hay registros.</p>";
        return;
    }

    historialDiv.innerHTML = historial
        .map((registro) => {
            return `
                <p>
                    <strong>Fecha:</strong> ${registro.fecha} <br />
                    <strong>Peso:</strong> ${registro.peso} kg <br />
                    <strong>Altura:</strong> ${registro.altura} m <br />
                    <strong>IMC:</strong> ${registro.imc.toFixed(2)} <br />
                    <strong>Clasificación:</strong> ${registro.clasificacion}
                </p>
            `;
        })
        .join("");
}

// Función principal del simulador IMC
function simuladorIMC() {
    const datos = solicitarDatos();
    if (!datos) return; // Si los datos son inválidos, no continuamos

    const { peso, altura } = datos;
    const { imc, clasificacion } = calcularIMC(peso, altura);
    mostrarResultados(peso, altura, imc, clasificacion);
}
