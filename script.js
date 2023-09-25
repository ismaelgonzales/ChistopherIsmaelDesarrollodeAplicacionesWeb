
document.addEventListener('DOMContentLoaded', function () {
    const formularioProducto = document.getElementById('formulario-producto');
    const listaProductos = document.getElementById('lista-productos');
    const contenedorFormularioEdicion = document.getElementById('contenedor-formulario-edicion');
    const formularioEditarProducto = document.getElementById('formulario-editar-producto');

    let productos = [];

    formularioProducto.addEventListener('submit', function (e) {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const precio = document.getElementById('precio').value;

        if (nombre && precio) {
            agregarProducto(nombre, precio);
            formularioProducto.reset();
        }
    });

    listaProductos.addEventListener('click', function (e) {
        if (e.target.classList.contains('eliminar')) {
            const idProducto = e.target.getAttribute('data-id');
            eliminarProducto(idProducto);
        } else if (e.target.classList.contains('editar')) {
            const idProducto = e.target.getAttribute('data-id');
            abrirFormularioEdicion(idProducto);
        }
    });

    formularioEditarProducto.addEventListener('submit', function (e) {
        e.preventDefault();

        const nombreEditado = document.getElementById('editar-nombre').value;
        const precioEditado = document.getElementById('editar-precio').value;
        const idProducto = document.getElementById('id-producto-editar').value;

        if (nombreEditado && precioEditado) {
            actualizarProducto(idProducto, nombreEditado, precioEditado);
            cerrarFormularioEdicion();
        }
    });

    function agregarProducto(nombre, precio) {
        const nuevoProducto = { nombre, precio };
        productos.push(nuevoProducto);
        mostrarProductos();
    }

    function eliminarProducto(idProducto) {
        productos.splice(idProducto, 1);
        mostrarProductos();
    }

    function actualizarProducto(idProducto, nombreEditado, precioEditado) {
        productos[idProducto].nombre = nombreEditado;
        productos[idProducto].precio = precioEditado;
        mostrarProductos();
    }

    function mostrarProductos() {
        listaProductos.innerHTML = '';

        productos.forEach((producto, indice) => {
            const elementoProducto = document.createElement('div');
            elementoProducto.classList.add('producto-item');
            elementoProducto.innerHTML = `
                <p><strong>Nombre:</strong> ${producto.nombre}</p>
                <p><strong>Precio:</strong> S/.${producto.precio}</p>
                <button class="eliminar" data-id="${indice}">Eliminar</button>
                <button class="editar" data-id="${indice}">Editar</button>
            `;
            listaProductos.appendChild(elementoProducto);
        });
    }

    function abrirFormularioEdicion(idProducto) {
        const productoAEditar = productos[idProducto];
        document.getElementById('id-producto-editar').value = idProducto;
        document.getElementById('editar-nombre').value = productoAEditar.nombre;
        document.getElementById('editar-precio').value = productoAEditar.precio;
        contenedorFormularioEdicion.style.display = 'block';
    }

    function cerrarFormularioEdicion() {
        contenedorFormularioEdicion.style.display = 'none';
    }
});
