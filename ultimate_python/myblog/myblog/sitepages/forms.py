from django import forms
from datetimewidget.widgets import DateWidget

months = (
    ('Routers', 'Routers'),
    ('Phones', 'Phones'),
    ('Laptops', 'Laptops'),
    ('Watches', 'Watches'),)

days = (
    ('1', '1'),
    ('2', '2'),
    ('3', '3'),
    ('4', '4'),
    ('5', '5'),)

class MonthForm(forms.Form):
    date_field = forms.DateField(widget=SelectDateWidget)
