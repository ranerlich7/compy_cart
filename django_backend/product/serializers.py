from rest_framework import serializers
from .models import Category, Product,Cart,CartItem
from django.contrib.auth.models import User

class CategorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Category
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = Product
        fields = '__all__' 
     



class CartItemSerializer(serializers.ModelSerializer):
  
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        source='product',
        write_only=True,
        required=False,
    )

    product = ProductSerializer(required=False, read_only=True)

    class Meta:
        model = CartItem
        fields = '__all__'




class CartSerializer(serializers.ModelSerializer):
  
    items = CartItemSerializer(many=True, read_only=True)
    

    class Meta:
        model = Cart
        fields = '__all__'

   



class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email', 'first_name', 'last_name')
        extra_kwargs = {'password': {'write_only': True}
                        }

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], password=validated_data['password'], email=validated_data['email'],
                                        first_name=validated_data['first_name'], last_name=validated_data['last_name'])
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
