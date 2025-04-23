from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai

# Configure Gemini API Key
GEN_API_KEY = "AIzaSyCCYFa0HYOaCrr0D3-iIUjz4cyRitDWMsY"  # Replace with your actual API key
genai.configure(api_key=GEN_API_KEY)

app = Flask(__name__)
CORS(app)  # Allow all origins for all routes

@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.get_json()
        if not data or "message" not in data:
            return jsonify({"response": "Invalid request, please send a message."}), 400

        user_message = data["message"]
        print(f"User Message: {user_message}")  # Debugging

        model = genai.get_model("gemini-pro")
        response = model.generate_text(prompt=user_message)
        bot_reply = response.result if response else "I’m not sure. Can you ask again?"

        return jsonify({"response": bot_reply})

    except Exception as e:
        print("Error:", e)
        return jsonify({"response": "Error processing request"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)  # Allow external access
