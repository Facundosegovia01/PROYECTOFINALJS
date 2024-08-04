const productos = fetch('https://fakestoreapi.com/products?limit=4')
.then(res => res.json())
.then(data => {
    renderProductos(data);
});

function renderProductos(productos) {
    let contenidoHTML = "";

    for (const producto of productos) {
        contenidoHTML += `
        <div class="w-60 h-full bg-gray-50 p-3 flex flex-col gap-1 rounded-2xl mt-10">
            <img class="h-48 rounded-xl object-cover" src="${producto.image}" />
            <div class="flex flex-col gap-4">
                <div class="flex flex-row justify-between">
                    <div class="flex flex-col">
                        <span class="text-xl font-bold">${producto.title}</span>
                        <span class="text-sm font-semibold text-gray-700">El mejor producto!</span>
                    </div>
                    <span class="font-bold text-purple-950">$${producto.price}</span>
                </div>
                <button class="hover:bg-purple-900 text-gray-50 bg-purple-600 py-2 rounded-md" onclick="agregarProducto(${producto.id});">Add to cart</button>
            </div>
        </div>`;
    }

    document.getElementById("card").innerHTML = contenidoHTML;
}

function agregarProducto(id) {
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    const producto = productos.find(item => item.id === id);
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    console.log("El producto se agregó correctamente");
    totalProductos();
}

function totalProductos() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    document.getElementById("totalCarrito").innerHTML = carrito.length;
    return carrito.length;
}

fetch('https://fakestoreapi.com/products?limit=4')
    .then(res => res.json())
    .then(data => {
        localStorage.setItem("productos", JSON.stringify(data));
        renderProductos(data);
    });

totalProductos();
