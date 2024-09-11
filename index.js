// hello word two

function start() {
    while (true){
        let opcao = "listar"
        switch(opcao){
            case 'cadastrar':
                console.log('vamos cadastrar')
                break
            case 'listar':
                console.log('listando')
                break
            case 'sair':
                console.log('saindo...')
                return

        }
    }
}


start()