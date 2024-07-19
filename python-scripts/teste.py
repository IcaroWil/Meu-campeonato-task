from flask import Flask, jsonify
import random

app = Flask(__name__)

@app.route('/simularJogo')
def simular_jogo():
    gol_time1 = random.randrange(0, 8, 1)
    gol_time2 = random.randrange(0, 8, 1)
    return jsonify([gol_time1, gol_time2])

if __name__ == '__main__':
    app.run(port=5000)