// Archivo: simulador.js

// Variables y constantes
const productos = ["Camisa", "Pantalón", "Zapatos"];
const precios = [20, 40, 60];
let carrito = [];

// Función para mostrar el menú de productos
function mostrarMenuProductos() {
    let menu = "Productos disponibles:\n";
    for (let i = 0; i < productos.length; i++) {
        menu += `${i + 1}. ${productos[i]} - $${precios[i]}\n`;
    }
    menu += "Ingrese el número del producto que desea comprar:";
    return menu;
}

// Función para agregar un producto al carrito
function agregarProductoAlCarrito() {
    let productoSeleccionado = parseInt(prompt(mostrarMenuProductos())) - 1;
    if (productoSeleccionado >= 0 && productoSeleccionado < productos.length) {
        let cantidad = parseInt(prompt(`Ingrese la cantidad de ${productos[productoSeleccionado]} que desea comprar:`));
        carrito.push({ producto: productos[productoSeleccionado], cantidad: cantidad, precio: precios[productoSeleccionado] });
        alert(`${cantidad} ${productos[productoSeleccionado]}(s) agregados al carrito.`);
    } else {
        alert("Selección inválida. Por favor, intente nuevamente.");
    }
}

// Función para mostrar el total del carrito
function mostrarTotalCarrito() {
    let total = 0;
    let detalleCarrito = "Detalle de su carrito:\n";
    for (let item of carrito) {
        let subtotal = item.cantidad * item.precio;
        detalleCarrito += `${item.cantidad} x ${item.producto} - $${subtotal}\n`;
        total += subtotal;
    }
    detalleCarrito += `Total a pagar: $${total}`;
    alert(detalleCarrito);
}

// Función principal
function iniciarSimulador() {
    let continuar = true;
    while (continuar) {
        let opcion = parseInt(prompt("Seleccione una opción:\n1. Agregar producto al carrito\n2. Ver total del carrito\n3. Salir"));
        switch (opcion) {
            case 1:
                agregarProductoAlCarrito();
                break;
            case 2:
                mostrarTotalCarrito();
                break;
            case 3:
                continuar = false;
                alert("Gracias por utilizar el simulador de compra en línea.");
                break;
            default:
                alert("Opción inválida. Por favor, intente nuevamente.");
        }
    }
}

// Iniciar el simulador
iniciarSimulador();
