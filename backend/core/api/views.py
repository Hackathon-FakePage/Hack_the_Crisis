
import os

from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response

from computational import find_words


class MainView(APIView):
    # queryset = None

    def get(self, request, *args, **kwargs):
        print(request, request.data, args, kwargs)
        test_filename = 'test_text.txt'
        test_path = os.path.join(os.path.dirname(find_words.__file__), test_filename)
        file = open(test_path, 'r')
        contents = file.read()
        results = find_words.find_informal_words(contents)

        return Response(results)

    def post(self, request, *args, **kwargs):
        contents = request.data.get('input')
        results = find_words.find_informal_words(contents)

        return Response(results)

    def options(self, request, *args, **kwargs):
        response = Response(status=200)
        response['Access-Control-Allow-Origin'] = '*'
        response['Access-Control-Allow-Headers'] = 'content-type'
        return response
