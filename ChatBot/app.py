

# from flask import Flask, render_template, request, jsonify
# from chat import get_response

# app = Flask(__name__)


# @app.get("/")
# def index_get():
#     return render_template("base.html")

# @app.post("/predict")
# def predict():
#     text = request.get_json().get("message")
#     response = get_response(text)
#     message = {"answer": response}
#     return jsonify(message)

# if __name__ == "__main__":
    
 
#     # app.run()
#     app.run(debug=True)

    
from flask import Flask, request, jsonify
from chat import get_response
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_input = data.get('message')
    response = get_response(user_input)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)
