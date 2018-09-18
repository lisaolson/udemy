from django.shortcuts import render
from .forms import MonthForm


# Create your views here.
def about(request):
    if request.method == 'POST':
            monthform = MonthForm(request.POST)
            request.session['month'] = monthform.cleaned_data['month']
    else:
            monthform = MonthForm()
    return render(request, 'sitepages/about.html', {'monthform': monthform})

def success(request):
    month = request.session.get('month')
    return render(request, 'sitepages/success.html', {'month', month})
