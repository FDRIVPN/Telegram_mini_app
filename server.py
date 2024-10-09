from flask import Flask, send_from_directory
import os

app = Flask(__name__)

# مسیر به پوشه‌ای که بازی و تصاویر را نگهداری می‌کند
GAME_DIRECTORY = os.path.join(os.path.dirname(__file__))

@app.route('/')
def index():
    return send_from_directory(GAME_DIRECTORY, 'index.html')

@app.route('/game')
def game():
    # اینجا کد شما برای بازی اجرا خواهد شد
    os.system('python game.py')
    return "بازی در حال اجرا است"

@app.route('/<path:filename>')
def send_file(filename):
    return send_from_directory(GAME_DIRECTORY, filename)

if __name__ == '__main__':
    app.run(debug=True)
