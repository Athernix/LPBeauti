from django.shortcuts import render

# Create your views here.
def calendario(request):
    return render(request, 'clients/Calendario.html')

def pago(request):
    return render(request, 'clients/Pago.html')

