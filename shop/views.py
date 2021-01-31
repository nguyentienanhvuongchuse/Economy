from rest_framework import views,viewsets,generics,mixins
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

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
