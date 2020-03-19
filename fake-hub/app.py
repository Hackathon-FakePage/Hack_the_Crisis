from flask import Flask, render_template, request
from werkzeug.datastructures import MultiDict, ImmutableMultiDict
app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template('index.html')

@app.route('/result', methods = ['POST', 'GET'])
def result():
   if request.method == 'POST':
      result = request.form
      parsed_form = []
      for key in result:
         parsed_form.append((key, result[key]))
      print("(1)")
      new_result = MultiDict()
      print("(2)")
      new_result.add("test_key", "test_value")
      print("(3)")
      print("new_result: ", new_result)
      return render_template("result.html",result = new_result)

app.run()
