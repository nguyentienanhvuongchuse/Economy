from rest_framework import views,viewsets,generics,mixins
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth.models import User

from .models import *
from .serializers import *
# Create your views here.

class ProductView(generics.GenericAPIView,mixins.ListModelMixin,mixins.RetrieveModelMixin):
    queryset = Product.objects.all().order_by("-id")
    serializer_class=ProductSerializers
    lookup_field = "id"

    def get(self,request,id=None):
        if id:
            return self.retrieve(request)
        else:
            return self.list(request)

class CategoryView(viewsets.ViewSet):
    def list(self, request):
        query = Category.objects.all()
        serializers = CategorySerializers(query, many=True)
        return Response(serializers.data)

    def retrieve(self, request, pk=None):
        query = Category.objects.get(id=pk)
        serializers = CategorySerializers(query)
        data_data = serializers.data
        all_data = []
        category_product = Product.objects.filter(category_id = data_data['id'])
        category_product_serializers = ProductSerializers(category_product, many=True)
        data_data['category_product'] = category_product_serializers.data
        all_data.append(data_data)
        return Response(all_data)

class ProfileView(views.APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, ]
    def get(self, request):
        try:
            query = Profile.objects.get(prouser=request.user)
            serializers = ProfileSeralizers(query)
            response_msg = {"error":False, "data":serializers.data}
        except:
            response_msg = {"error":True, "message":"Something is wrong"}
        return Response(response_msg)

class UserProfile(views.APIView):
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]
    def post(self, request):
        try:
            user = request.user
            data = request.data
            user_obj = User.objects.get(username=user)
            user_obj.first_name = data["first_name"]
            user_obj.last_name = data["last_name"]
            user_obj.email = data["email"]
            user_obj.save()
            response_msg = {"error":False, "message":"Updated"}
        except:
            response_msg = {"error":True, "message":"Try again !!"}
        return Response(response_msg)

class UpdateImage(views.APIView):
    authentication_classes = [TokenAuthentication,]
    permission_classes = [IsAuthenticated, ]
    def post(self, request):
        try:
            user = request.user
            query = Profile.objects.get(prouser=user)
            data = request.data
            serializers = ProfileSeralizers(query, data=data, context = {"request":request})
            serializers.is_valid(raise_exception=True)
            serializers.save()
            response_msg = {"message":"Updated"}
        except:
            response_msg = {"message":"Try again !!"}
        return Response(response_msg)

class MyCart(viewsets.ViewSet):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]
    def list(self, request):
        query = Cart.objects.filter(customer=request.user.profile)
        serializers = CartSerializers(query, many=True)
        all_data = []
        for cart in serializers.data:
            cart_product = CartProduct.objects.filter(cart=cart["id"])
            cart_product_serializers = CartProductSerializers(cart_product, many=True)
            cart["cartproduct"] = cart_product_serializers.data
            all_data.append(cart)
        return Response(all_data)

class OldOrders(viewsets.ViewSet):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]
    def list(self, request):
        query = Order.objects.filter(cart__customer=request.user.profile)
        serializers = OrderSerializers(query, many=True)
        all_data = []
        for order in serializers.data:
            cart_product = CartProduct.objects.filter(cart_id = order["cart"]["id"])
            cart_product_serialzers = CartProductSerializers(cart_product, many=True)
            order["cartproduct"] = cart_product_serialzers.data
            all_data.append(order)
        return Response(all_data)

    def retrieve(self, request, pk=None):
        try:
            query = Order.objects.get(id=pk)
            serializers = OrderSerializers(query)
            data = serializers.data
            all_data = []
            cart_product = CartProduct.objects.filter(cart_id = data["cart"]["id"])
            cart_product_serializer = CartProductSerializers(cart_product, many=True)
            data["cartproduct"] = cart_product_serializer.data
            all_data.append(data)
            response_msg = {"error": False, "data": all_data}
        except:
            response_msg = {"error": True, "message":"Fail"}
        return Response(response_msg)

    def create(self, request):
        try:
            data = request.data
            cart_id = data["cartid"]
            address = data["address"]
            email = data["email"]
            mobile = data["mobile"]
            cart = Cart.objects.get(id=cart_id)
            cart.complit = True
            cart.save()
            Order.objects.create(
                cart = cart,
                address = address,
                mobile = mobile,
                email = email,
                total = cart.total,
                discount = 3
            )
            response_msg = {"error": False, "data": "success"}
        except:
            response_msg = {"error": True, "data": "fail"}
        return Response(response_msg)

    def delete(self, request, pk=None):
        try:
            order = Order.objects.get(id=pk)
            cart = Cart.objects.get(id=order.cart.id)
            order.delete()
            cart.delete()
            response_msg = {"error": False, "data": "success"}
        except:
            response_msg = {"error": True, "data": "fail"}
        return Response(response_msg)


class AddToCart(views.APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]
    def post(self, request):
        product_id = request.data["id"]
        product_obj = Product.objects.get(id=product_id)
        cart = Cart.objects.filter(customer=request.user.profile).filter(complit=False).first()
        cart_product = CartProduct.objects.filter(product__id=product_id).first()
        try:
            if cart:
                this_product_in_cart = cart.cartproduct_set.filter(product = product_id)
                if this_product_in_cart.exists():
                    cart_product_uct = CartProduct.objects.filter(product=product_obj).filter(cart__complit=False).first()
                    cart_product_uct.quantity += 1
                    cart_product_uct.subtotal += product_obj.selling_price
                    cart_product_uct.save()
                    cart.total += product_obj.selling_price
                    cart.save()
                else:
                    cart_product_new = CartProduct.objects.create(
                        cart = cart,
                        price = product_obj.selling_price,
                        quantity = 1,
                        subtotal = product_obj.selling_price
                    )
                    cart_product_new.product.add(product_obj)
                    cart.total += product_obj.selling_price
                    cart_product.save()
            else:
                Cart.objects.create(customer=request.user.profile, total=0)
                new_cart = Cart.objects.filter(customer=request.user.profile).filter(complit=False).first()
                cart_product_new = CartProduct.objects.create(
                    cart = new_cart,
                    price = product_obj.selling_price,
                    quantity = 1,
                    subtotal = product_obj.selling_price
                )
                cart_product_new.product.add(product_obj)
                new_cart.total += product_obj.selling_price
                new_cart.save()
            response_msg = {"error": False, "data": "success"}
        except:
            response_msg = {"error": True, "data": "fail"}
        return Response(response_msg)

class UpInCart(views.APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]
    def post(self, request):
        cart_product_id = request.data["id"]
        cart_product = CartProduct.objects.get(id=cart_product_id)
        cart_obj = cart_product.cart

        cart_product.quantity += 1
        cart_product.subtotal += cart_product.price
        cart_product.save()

        cart_obj.total += cart_product.price
        cart_obj.save()
        return Response({"message":"success"})

class DownInCart(views.APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]
    def post(self, request):
        cart_product_id = request.data["id"]
        cart_product = CartProduct.objects.get(id=cart_product_id)
        cart_obj = cart_product.cart

        if(cart_product.quantity > 0):
            cart_product.quantity -= 1
            cart_product.subtotal -= cart_product.price
            cart_product.save()

            cart_obj.total -= cart_product.price
            cart_obj.save()

        return Response({"message":"success"})

class DeleteInCart(views.APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]
    def post(self, request):
        cart_product_id = request.data["id"]
        cart_product = CartProduct.objects.get(id=cart_product_id)
        cart_product.delete()
        return Response({"message":"success"})

class DeleteFullCart(views.APIView):
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [TokenAuthentication, ]
    def post(self, request):
        try:
            cart_id = request.data["id"]
            cart_obj = Cart.objects.get(id=cart_id)
            cart_obj.delete()
            response_msg = {"error": False, "data": "success"}
        except:
            response_msg = {"error": True, "data": "Fail"}
        return Response(response_msg)
