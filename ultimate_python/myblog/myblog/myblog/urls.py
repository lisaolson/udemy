"""myblog URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
import posts.views
import sitepages.views
import data.views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', posts.views.home, name="home"),
    url(r'^posts/(?P<post_id>[0-9]+)/$', posts.views.post_details, name="post_detail"),
    url(r'^about/', sitepages.views.about, name="about"),
    url(r'^success/', sitepages.views.success, name="success"),
    url(r'^test/', posts.views.test, name="test"),
    url(r'^wshoes/', posts.views.wshoes, name="wshoes"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
