function entrarAlSitio() {
    const presentacion = document.getElementById('pantalla-presentacion');
    if (presentacion) {
        presentacion.classList.add('ocultar');
    }
}

let montoTotal = 0;
let carritoProductos = [];

function agregarAlCarrito() {
    const nodoNombre = document.getElementById('nombre-prod');
    const nodoPrecio = document.getElementById('precio-prod');
    const nodoBotonCarrito = document.getElementById('total-carrito');

    if (nodoNombre && nodoPrecio) {
        const nombre = nodoNombre.innerText;

        const precioTexto = nodoPrecio.innerText.replace(/,/g, '');
        const precio = parseFloat(precioTexto);

        montoTotal += precio;
        carritoProductos.push({ nombre: nombre, precio: precio });

        if (nodoBotonCarrito) {
            nodoBotonCarrito.innerText = `Carrito: S/ ${montoTotal.toLocaleString('es-PE')}`;
        }

        alert(`¡Producto agregado!\n\nDetalle: ${nombre}\nCosto: S/ ${precio.toLocaleString('es-PE')}\n\nMonto acumulado total: S/ ${montoTotal.toLocaleString('es-PE')}`);
    }
}

document.addEventListener('DOMContentLoaded', function() {

    const nodoBotonCarrito = document.getElementById('total-carrito');
    if (nodoBotonCarrito) {
        nodoBotonCarrito.innerText = `Carrito: S/ ${montoTotal.toLocaleString('es-PE')}`;
    }

    const buscador = document.querySelector('.subheader input');
    const tarjetas = document.querySelectorAll('.tarjeta');
    const secciones = document.querySelectorAll('.seccion');

    if (buscador) {
        buscador.addEventListener('input', function () {
            const texto = buscador.value.toLowerCase().trim();

            for (const tarjeta of tarjetas) {
                const tituloContenedor = tarjeta.querySelector('.titulo');
                if (tituloContenedor) {
                    const titulo = tituloContenedor.textContent.toLowerCase();
                    if (titulo.includes(texto)) {
                        tarjeta.classList.remove('oculto');
                    } else {
                        tarjeta.classList.add('oculto');
                    }
                }
            }
            for (const seccion of secciones) {
                if (seccion.querySelector('.tarjeta:not(.oculto)')) {
                    seccion.classList.remove('oculto');
                } else {
                    seccion.classList.add('oculto');
                }
            }
        });
    }

    const hoy = new Date().toLocaleDateString('en-CA'); 
    const formularios = document.querySelectorAll('main form');

    for (const form of formularios) {
        form.noValidate = true;
        form.addEventListener('submit', function (e) {
            e.preventDefault(); 

            for (const mensaje of form.querySelectorAll('.error-msg')) {
                mensaje.remove();
            }

            let hayError = false;
            const campos = form.querySelectorAll('input, select, textarea');

            for (const campo of campos) {
                campo.classList.remove('invalido');
                const valor = campo.value.trim();
                let error = '';

                if (valor === '') {
                    if (campo.required) {
                        error = 'Completa este campo.';
                    }
                } else if (campo.type === 'email' && (!valor.includes('@') || !valor.includes('.'))) {
                    error = 'Escribe un correo válido.';
                } else if (campo.type === 'tel' && valor.replaceAll(' ', '').length !== 9) {
                    error = 'El teléfono debe tener 9 dígitos.';
                } else if (campo.type === 'password' && valor.length < 6) {
                    error = 'La contraseña debe tener al menos 6 caracteres.';
                } else if (campo.type === 'date' && valor < hoy) {
                    error = 'La fecha no puede ser anterior a hoy.';
                }

                if (error !== '') {
                    hayError = true;
                    campo.classList.add('invalido');
                    campo.insertAdjacentHTML('afterend', '<small class="error-msg">' + error + '</small>');
                }
            }

            if (!hayError) {
                form.reset();
                alert('¡Listo! Tus datos se enviaron correctamente.');
            }
        });
    }
});

