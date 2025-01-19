import React from "react";

function Proveedores() {
  return (
    <div>
      <h3>Proveedores</h3>
      <form>
        <input type="text" placeholder="Nombre del proveedor" />
        <input type="text" placeholder="Rubro" />
        <input type="text" placeholder="Teléfono" />
        <button>Agregar Proveedor</button>
      </form>
    </div>
  );
}

export default Proveedores;
