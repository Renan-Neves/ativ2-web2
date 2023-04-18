const mysql = require('mysql2/promise')

async function conectar(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection


const connection = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1234',
    database: 'crud'
})

console.log('conectado)')
global.connection = connection
return global.connection
}


async function selectTabela(tabela){
    const conn = await conectar()
    let [consulta] = await conn.query(`SELECT * FROM ${tabela}`)
    return consulta
}

async function Codigo(valor, tabela, coluna, condicao) {
    const conn = await conectar()
    let [consulta] = await conn.query(`SELECT ${valor} FROM ${tabela} WHERE ${coluna} = ${condicao}`)
    let linha = consulta[0]
    return linha[valor]
}


async function selectCliente(){
    const conn = await conectar()
    let [cliente] = await conn.query(`SELECT c.cli_id, c.cli_nome, c.cli_idade, e.end_cep, e.end_bairro, e.end_rua, e.end_numero FROM cliente c, endereco e`)
    return cliente
}

async function insertCliente(cliente, endereco){
    const conn = await conectar()
    return await conn.query('INSERT INTO cliente(cli_nome, cli_idade) VALUES(?, ?)', [cliente.nome, cliente.idade])
}

async function updateCliente(novos_dados, id) {
    const conn = await conectar()
    return conn.query(`UPDATE cliente SET cli_nome=?, cli_idade=? WHERE cli_id =?`, [novos_dados.nome, novos_dados.idade, id])
}

async function deleteCliente(id) {
    const conn = await conectar()
    const sql = 'DELETE FROM cliente WHERE cli_id =?;'
    return await conn.query(sql, [id])
}


async function insertEndereco(endereco){
    const conn = await conectar()
    await conn.query('INSERT INTO endereco(end_cep, end_bairro, end_rua, end_numero) VALUES(?, ?, ?, ?) ', [endereco.cep, endereco.bairro, endereco.rua, endereco.numero])
    let codigo = await Codigo('end_cod', 'endereco', 'end_cep', endereco.cep)
    return codigo
}

async function updateEndereco(novos_dados, id) {
    const conn = await conectar()
    return conn.query(`UPDATE endereco SET end_cep=?, end_bairro=?, end_rua=?, end_numero=? WHERE end_cod =?`, [novos_dados.cep, novos_dados.bairro, novos_dados.rua, novos_dados.numero, id])
}

module.exports = {selectCliente, insertEndereco, insertCliente, updateCliente, updateEndereco, deleteCliente}