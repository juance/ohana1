import React from "react";

function Articulos() {
  return (
    <div>
      <h3>Artículos e Inventario</h3>
      <form>
        <input type="text" placeholder="Nombre del artículo" />
        <input type="number" placeholder="Cantidad en inventario" />
        <button>Agregar Artículo</button>
      </form>
    </div>
  );
}

export default Articulos;
