from rest_framework import serializers
from expense_tracker_app.models import Expense

class ExpenseSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Expense
        # fields = "__all__"
        fields = ["id", "title", "amount", "category", "expense_date"]

