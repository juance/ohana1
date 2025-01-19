from django.db import models

class Cliente(models.Model):
    nombre = models.CharField(max_length=100)
    telefono = models.CharField(max_length=15, unique=True)
    direccion = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nombre

class Proveedor(models.Model):
    nombre = models.CharField(max_length=100)
    rubro = models.CharField(max_length=100)
    telefono = models.CharField(max_length=15)

    def __str__(self):
        return self.nombre

class Articulo(models.Model):
    nombre = models.CharField(max_length=100)
    inventario = models.PositiveIntegerField()

    def __str__(self):
        return self.nombre

class Servicio(models.Model):
    TIPO_SERVICIO = [
        ('Lavandería', 'Lavandería'),
        ('Tintorería', 'Tintorería'),
    ]
    tipo = models.CharField(max_length=50, choices=TIPO_SERVICIO)
    opciones = models.TextField()  # Extras como separar colores
    precio = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return f"{self.tipo} - ${self.precio}"
    
    from gestion.models import Servicio

# Crear servicios
Servicio.objects.create(tipo="Lavado Básico", precio=500)
Servicio.objects.create(tipo="Tintorería", precio=1000)
Servicio.objects.create(tipo="Plancha", precio=300)

# Verificar que se hayan agregado
print(Servicio.objects.all())

class Ticket(models.Model):
    numero = models.CharField(max_length=7, unique=True)
    fecha = models.DateTimeField(auto_now_add=True)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    servicios = models.ManyToManyField(Servicio)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    forma_de_pago = models.CharField(max_length=50)

    def __str__(self):
        return f"Ticket #{self.numero} - {self.cliente.nombre}"
