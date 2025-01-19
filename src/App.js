import React, { useState } from "react";
import { TextField, Button, Checkbox, FormControlLabel, Select, MenuItem, Typography, Grid } from "@mui/material";

// Simulación de base de datos (local)
const database = [];

function App() {
  const [ticketNumber, setTicketNumber] = useState(1); // Ticket inicial 0000001
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [valetCount, setValetCount] = useState(0);
  const [service, setService] = useState("Lavandería");
  const [extras, setExtras] = useState({
    separarPorColor: false,
    secadoEnFrio: false,
    desmanchar: false,
    blanquear: false,
    sinPerfume: false,
    noSecar: false,
  });
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [priceList] = useState({
    "Acolchado pluma 1 pl": 12000,
    "Acolchado pluma 2pl/queen": 14000,
    "Acolchado pluma king": 16000,
    "Almohada desde": 9000,
    "Campera simple": 11000,
    "Camperon": 12400,
  });
  const valetCost = 4500;
  const [ticketToShow, setTicketToShow] = useState(null);

  const validateInputs = () => {
    if (!customer.trim()) {
      alert("El nombre del cliente no puede estar vacío.");
      return false;
    }
    if (!/^\d{10}$/.test(phone)) {
      alert("El teléfono debe ser un número válido de 10 dígitos.");
      return false;
    }
    if (!paymentMethod) {
      alert("Debes seleccionar un método de pago.");
      return false;
    }
    if (valetCount < 0 || isNaN(valetCount)) {
      alert("La cantidad de valet debe ser un número positivo.");
      return false;
    }
    if (selectedItems.length === 0) {
      alert("Debes seleccionar al menos un artículo.");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateInputs()) return;

    const totalItemCost = selectedItems.reduce((total, item) => total + priceList[item], 0);
    const totalValetCost = valetCount * valetCost;
    const totalCost = totalItemCost + totalValetCost;
    const date = new Date();
    const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

    const ticketData = {
      ticketNumber: ticketNumber.toString().padStart(7, "0"),
      servicio: service,
      cliente: customer,
      telefono: phone,
      valetCount,
      selectedItems,
      totalItemCost,
      totalValetCost,
      totalCost,
      extras,
      fecha: formattedDate,
      metodoPago: paymentMethod,
    };

    database.push(ticketData);
    setTicketToShow(ticketData);
    setTicketNumber(ticketNumber + 1);
    alert("Ticket generado correctamente.");
  };

  const handleExtraChange = (event) => {
    const { name, checked } = event.target;
    setExtras({ ...extras, [name]: checked });
  };

  const handleAddItem = () => {
    if (selectedItem && !selectedItems.includes(selectedItem)) {
      setSelectedItems([...selectedItems, selectedItem]);
    } else {
      alert("Por favor, selecciona un artículo válido.");
    }
  };

  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      <Typography variant="h4">Lavandería y Tintorería "Ohana"</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Cliente"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            placeholder="Nombre del cliente"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Teléfono"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Número de teléfono"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">Servicio</Typography>
          <Select value={service} onChange={(e) => setService(e.target.value)} fullWidth>
            <MenuItem value="Lavandería">Lavandería</MenuItem>
            <MenuItem value="Tintorería">Tintorería</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="number"
            label="Cantidad de Valet"
            value={valetCount}
            onChange={(e) => setValetCount(Number(e.target.value))}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Artículos disponibles</Typography>
          <Select value={selectedItem} onChange={(e) => setSelectedItem(e.target.value)} fullWidth>
            {Object.keys(priceList).map((item, index) => (
              <MenuItem key={index} value={item}>
                {item} - ${priceList[item]}
              </MenuItem>
            ))}
          </Select>
          <Button onClick={handleAddItem} variant="contained" style={{ marginTop: "10px" }}>
            Agregar Artículo
          </Button>
          <ul>
            {selectedItems.map((item, index) => (
              <li key={index}>
                {item} - ${priceList[item]}
              </li>
            ))}
          </ul>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Extras</Typography>
          {Object.keys(extras).map((key) => (
            <FormControlLabel
              key={key}
              control={<Checkbox name={key} checked={extras[key]} onChange={handleExtraChange} />}
              label={key.replace(/([A-Z])/g, " $1").toLowerCase()}
            />
          ))}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Forma de Pago</Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={paymentMethod === "Efectivo"}
                onChange={() => setPaymentMethod("Efectivo")}
              />
            }
            label="Efectivo"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={paymentMethod === "Mercado Pago"}
                onChange={() => setPaymentMethod("Mercado Pago")}
              />
            }
            label="Mercado Pago"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={paymentMethod === "Cuenta DNI"}
                onChange={() => setPaymentMethod("Cuenta DNI")}
              />
            }
            label="Cuenta DNI"
          />
        </Grid>
        <Grid item xs={12}>
          <Button onClick={handleSubmit} variant="contained" color="secondary">
            Generar Ticket
          </Button>
        </Grid>
      </Grid>
      {ticketToShow && (
        <div style={{ marginTop: "20px", border: "1px solid black", padding: "10px" }}>
          <Typography variant="h5">Ticket Generado</Typography>
          <p><strong>Fecha:</strong> {ticketToShow.fecha}</p>
          <p><strong>Ticket Canasto:</strong> {ticketToShow.ticketNumber}</p>
          <p><strong>Cliente:</strong> {ticketToShow.cliente}</p>
          <p><strong>Teléfono:</strong> {ticketToShow.telefono}</p>
          <p><strong>Servicio:</strong> {ticketToShow.servicio}</p>
          <p><strong>Cantidad de Valet:</strong> {ticketToShow.valetCount}</p>
          <p><strong>Artículos:</strong></p>
          <ul>
            {Array.isArray(ticketToShow.selectedItems) && ticketToShow.selectedItems.map((item, index) => (
              <li key={index}>
                {item} - ${priceList[item]}
              </li>
            ))}
          </ul>
          <p><strong>Forma de Pago:</strong> {ticketToShow.metodoPago}</p>
          <p><strong>Costo Total:</strong> ${ticketToShow.totalCost}</p>
          <Typography variant="h6">Extras:</Typography>
          <ul>
            {ticketToShow.extras && Object.entries(ticketToShow.extras).map(([key, value]) => (
              <li key={key}>
                {key.replace(/([A-Z])/g, " $1").toLowerCase()}: {value ? "Sí" : "No"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
