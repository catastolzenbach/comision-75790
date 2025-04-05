// Archivo: script.js

// Esperamos que el DOM cargue para agregar el evento al botón
window.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formularioIMC");
    formulario.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevenimos que se recargue la página
        simuladorIMC();

        // Mostramos los últimos datos guardados si existen
        const datosGuardados = JSON.parse(localStorage.getItem("datosUsuario"));
        const resultadoGuardado = JSON.parse(localStorage.getItem("resultadoIMC"));

        if (datosGuardados && resultadoGuardado) {
            mostrarResultados(
                datosGuardados.peso,
                datosGuardados.altura,
                resultadoGuardado.imc,
                resultadoGuardado.clasificacion
            );
        }
    });
});

// Función para solicitar datos desde el formulario HTML
function solicitarDatos() {
    const pesoInput = document.getElementById("peso");
    const alturaInput = document.getElementById("altura");

    let peso = parseFloat(pesoInput.value);
    let altura = parseFloat(alturaInput.value);

    // Validación defensiva
    if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
        mostrarError("Por favor, ingresa valores válidos y mayores a 0.");
        return null;
    }

    // Si la altura parece estar en centímetros (ej: 170), la convertimos a metros
    if (altura > 3) {
        altura = altura / 100;
    }

    // Guardamos los datos ingresados en el LocalStorage
    localStorage.setItem("datosUsuario", JSON.stringify({ peso, altura }));

    return { peso, altura };
}

// Función para calcular el IMC y clasificar según estándar chileno
function calcularIMC(peso, altura) {
    let imc = peso / (altura * altura);
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

// Función para mostrar resultados en la página
function mostrarResultados(peso, altura, imc, clasificacion) {
    const resultadoDiv = document.getElementById("resultado");

    resultadoDiv.innerHTML = `
        <p><strong>Peso:</strong> ${peso} kg</p>
        <p><strong>Altura:</strong> ${altura.toFixed(2)} m</p>
        <p><strong>IMC:</strong> ${imc.toFixed(2)}</p>
        <p><strong>Clasificación:</strong> ${clasificacion}</p>
    `;

    // Color del resultado según clasificación
    resultadoDiv.style.color = obtenerColorClasificacion(clasificacion);

    // Guardamos el resultado del cálculo en LocalStorage
    localStorage.setItem("resultadoIMC", JSON.stringify({ imc, clasificacion }));
}

// Función para mostrar errores en pantalla
function mostrarError(mensaje) {
    const resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = `<p style="color: red;">${mensaje}</p>`;
}

// Devuelve un color según la clasificación
function obtenerColorClasificacion(clasificacion) {
    switch (clasificacion) {
        case "Bajo peso": return "#f39c12"; // Naranja
        case "Peso normal": return "#27ae60"; // Verde
        case "Sobrepeso": return "#e67e22"; // Naranja oscuro
        case "Obesidad I": return "#d35400"; // Naranja fuerte
        case "Obesidad II": return "#c0392b"; // Rojo oscuro
        case "Obesidad III": return "#96281B"; // Rojo intenso
        default: return "black";
    }
}

// Función principal que ejecuta todo el proceso
function simuladorIMC() {
    const datos = solicitarDatos();
    if (datos) {
        const { peso, altura } = datos;
        const { imc, clasificacion } = calcularIMC(peso, altura);
        mostrarResultados(peso, altura, imc, clasificacion);
    }
}