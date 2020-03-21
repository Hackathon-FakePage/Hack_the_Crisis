
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response


class MainView(APIView):
    # queryset = None

    def get(self, request, *args, **kwargs):
        return Response({'aaaa':'bbbb'})
