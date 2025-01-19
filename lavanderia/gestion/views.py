from django.shortcuts import render

from django.shortcuts import render, redirect
from .models import Ticket, Cliente, Servicio
from twilio.rest import Client

def crear_ticket(request):
    if request.method == 'POST':
        cliente_id = request.POST['cliente']
        servicios_ids = request.POST.getlist('servicios')
        forma_de_pago = request.POST['forma_de_pago']

        cliente = Cliente.objects.get(id=cliente_id)
        servicios = Servicio.objects.filter(id__in=servicios_ids)
        total = sum(servicio.precio for servicio in servicios)

        ticket = Ticket.objects.create(
            numero=str(Ticket.objects.count() + 1).zfill(7),
            cliente=cliente,
            total=total,
            forma_de_pago=forma_de_pago
        )
        ticket.servicios.set(servicios)

        # Enviar ticket por WhatsApp
        account_sid = 'tu_sid'
        auth_token = 'tu_token'
        client = Client(account_sid, auth_token)

        mensaje = f"""
        Ticket #{ticket.numero}
        Cliente: {cliente.nombre}
        Servicios: {", ".join(servicio.tipo for servicio in servicios)}
        Total: ${total}
        Forma de pago: {forma_de_pago}
        """
        client.messages.create(
            body=mensaje,
            from_='whatsapp:+14155238886',
            to=f'whatsapp:{cliente.telefono}'
        )

        return redirect('ticket_exitoso')
    return render(request, 'crear_ticket.html', {
        'clientes': Cliente.objects.all(),
        'servicios': Servicio.objects.all()
    })
