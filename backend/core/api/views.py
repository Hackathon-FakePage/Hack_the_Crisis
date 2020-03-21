
import os

from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response

from computational import find_words


class MainView(APIView):
    # queryset = None

    def get(self, request, *args, **kwargs):

        test_filename = 'test_text.txt'
        test_path = os.path.join(os.path.dirname(find_words.__file__), test_filename)
        file = open(test_path, 'r')
        contents = file.read()
        results = find_words.find_informal_words(contents)

        return Response(results)
