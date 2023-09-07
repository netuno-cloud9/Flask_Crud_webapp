from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_mysqldb import MySQL

app = Flask(__name__)

# Configurações do banco de dados
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''  
app.config['MYSQL_DB'] = 'jm_veiculos'

mysql = MySQL(app)

# Rota para a página inicial
@app.route('/')
def index():
    return render_template('index.html')

# Rota para listar os veículos cadastrados
@app.route('/veiculos', methods=['GET'])
def listar_veiculos():
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM veiculo")
    veiculos = cursor.fetchall()
    cursor.close()

    veiculos_json = []

    for veiculo in veiculos:
        veiculo_dict = {
            'id': veiculo[0],
            'tipo': veiculo[1],
            'cor': veiculo[2],
            'marca': veiculo[3],
            'modelo': veiculo[4],
            'ano_fabricacao': veiculo[5],
            'estado': veiculo[6],
            'km_rodados': veiculo[7],
            'passagem_leilao': veiculo[8],
            'formas_pagamento': veiculo[9]
        }
        veiculos_json.append(veiculo_dict)

    return jsonify(veiculos_json)
@app.route('/veiculos/editar', methods=['POST'])
def editar_veiculo():
    try:
        # Retrieve and process form data from request
        veiculo_id = request.form.get('veiculo_id')
        tipo = request.form.get('tipo')
        cor = request.form.get('cor')
        marca = request.form.get('marca')
        modelo = request.form.get('modelo')
        ano_fabricacao = request.form.get('ano_fabricacao')
        estado = request.form.get('estado')
        km_rodados = request.form.get('km_rodados')
        passagem_leilao = 1 if 'passagem_leilao' in request.form else 0
        formas_pagamento = request.form.get('formas_pagamento')

        # Update the vehicle information in your database or data source
        cursor = mysql.connection.cursor()
        cursor.execute(
            "UPDATE veiculo SET tipo = %s, cor = %s, marca = %s, modelo = %s, ano_fabricacao = %s, estado = %s, km_rodados = %s, passagem_leilao = %s, formas_pagamento = %s WHERE id = %s",
            (tipo, cor, marca, modelo, ano_fabricacao, estado, km_rodados, passagem_leilao, formas_pagamento, veiculo_id)
        )
        mysql.connection.commit()
        cursor.close()
        
        return redirect(url_for('listar_veiculos'))

    except Exception as e:
        # Handle any exceptions or errors that occur during the update
        error_message = str(e)
        response_data = {'error': error_message}
        return jsonify(response_data), 500



# Rota para adicionar um novo veículo
@app.route('/veiculos', methods=['POST'])
def adicionar_veiculo():
    dados = request.form
    tipo = dados['tipo']
    cor = dados['cor']
    marca = dados['marca']
    modelo = dados['modelo']
    ano_fabricacao = dados['ano_fabricacao']
    estado = dados['estado']
    km_rodados = dados['km_rodados']
    passagem_leilao = 1 if 'leilao' in dados else 0
    formas_pagamento = dados['formas_pagamento']

    cursor = mysql.connection.cursor()
    cursor.execute(
        "INSERT INTO veiculo (tipo, cor, marca, modelo, ano_fabricacao, estado, km_rodados, passagem_leilao, formas_pagamento) "
        "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)",
        (tipo, cor, marca, modelo, ano_fabricacao, estado, km_rodados, passagem_leilao, formas_pagamento)
    )
    mysql.connection.commit()
    cursor.close()

    return redirect(url_for('listar_veiculos'))


# Rota para excluir um veículo
@app.route('/veiculos/excluir/<int:veiculo_id>', methods=['DELETE'])
def excluir_veiculo(veiculo_id):
    cursor = mysql.connection.cursor()
    cursor.execute("DELETE FROM veiculo WHERE id = %s", (veiculo_id,))
    mysql.connection.commit()
    cursor.close()

    return jsonify({'message': 'Veículo excluído com sucesso'})

# Rota para atualizar os dados de um veículo
@app.route('/veiculos/atualizar/<int:veiculo_id>', methods=['POST'])
def atualizar_veiculo(veiculo_id):
    dados = request.form
    cor = dados['cor']
    km_rodados = dados['km_rodados']
    formas_pagamento = dados['formas_pagamento']

    cursor = mysql.connection.cursor()
    cursor.execute(
        "UPDATE veiculo SET cor = %s, km_rodados = %s, formas_pagamento = %s WHERE id = %s",
        (cor, km_rodados, formas_pagamento, veiculo_id)
    )
    mysql.connection.commit()
    cursor.close()

    return redirect(url_for('listar_veiculos'))

if __name__ == '__main__':
    app.run(debug=True)