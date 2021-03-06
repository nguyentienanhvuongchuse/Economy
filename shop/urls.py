from django.urls import path, include
from rest_framework import routers
from .views import *

route = routers.DefaultRouter()
route.register("categori", CategoryView, basename="CategoryView")
route.register("cart", MyCart, basename="MyCart")
route.register("orders", OldOrders, basename="OldOrder")

urlpatterns = [
	path("", include(route.urls)),
	path("product/",ProductView.as_view(),name="product"),
	path("product/<int:id>/",ProductView.as_view(),name="product-detail"),
	path("profile/",ProfileView.as_view(),name="profile"),
	path("updateprofile/", UserProfile.as_view(), name="update_profile"),
	path("updateimg/", UpdateImage.as_view(), name="update_img"),
	path("addtocart/", AddToCart.as_view(), name="add_cart"),
	path("upincart/",UpInCart.as_view(), name="up"),
	path("downincart/",DownInCart.as_view(), name="down"),
	path("deleteincart/", DeleteInCart.as_view(), name="delete"),
	path("deletefullcart/", DeleteFullCart.as_view(),name="deletefullcart"),

]
