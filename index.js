(async () => {
    const bd = require("./bd")

    let codigo = await bd.insertEndereco({cep: '32323232', bairro: 'Jardim São Paulo', rua:'Amoreiras', numero: 999})
    

    await bd.insertCliente({nome: 'Jessica', idade: '20'}, codigo)
    var clientes = await bd.selectCliente()
    console.log('------------- Tabela Cliente: ------------- \n', clientes)


    await bd.updateCliente({nome: 'Fernanda', idade: '18'}, 1)
    await bd.updateEndereco({cep: '12345678', bairro: 'Jutapinga', rua: '32 de fevereiro', numero: 99}, 1)
    var clientes = await bd.selectCliente()
    console.log('------------- Cliente atualizado: ------------- \n', clientes)


    await bd.deleteCliente(1)
    var clientes = await bd.selectCliente()
    console.log('Cliente apagado')
    console.log('-------------- Tabela Cliente ------------ \n', clientes)
})()
