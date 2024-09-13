// hello word two
let mensagem = 'Bem vindo ao App de Metas!'

const { select, input, checkbox } = require('@inquirer/prompts')

let metas = []

const cadastrarMeta = async () => {
    const meta = await input({message:'Digite sua nova meta: '})
    if (meta.length == 0) {
        mensagem = 'a meta não foi digitada!'
        return
    }
    
    metas.push({value: meta, checked: false})
}

const listarMetas = async () => {
    if(metas.length == 0) {
        mensagem = 'Não existem metas!'
        return
    }

    const respostas = await checkbox({
        message: "Use as setas para navegar entre as metas, o espaço para marcar/desmarcar e Enter para finalizar",
        choices: [...metas],
        instructions: false
    })
    
    metas.forEach((m) => {
        m.checked = false
    })

    if(respostas == 0){
        mensagem = 'Nenhuma meta selecionada!'
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })
        meta.checked = true
    })

    mensagem = 'Meta(s) concluída(s)'
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })
    if(realizadas.length == 0) {
        mensagem = 'Ainda não existem metas realizadas :('
        return
    }
    await select({
        message: realizadas.length + ': meta(s) realizada(s)!',
        choices: [...realizadas]
    })
}
const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return meta.checked != true
    })

    if(abertas.length == 0) {
        mensagem = 'Não existem metas abertas :)'
        return
    }
    await select({
        message: abertas.length + ': meta(s) em aberto!',
        choices: [...abertas]
    })
}

const deletarMetas = async () => {
    if(metas.length == 0) {
        mensagem = 'Não existem metas!'
        return
    }

    const metasDesmarcadas = metas.map((meta) => {
        return {value: meta.value, checked: false}
    })

    const itensADeletar = await checkbox({
        message: "Selecione o item para deletar",
        choices: [...metasDesmarcadas],
        instructions: false
    })
    if(itensADeletar.length == 0) {
        mensagem = 'Nenhum item para deletar!'
        return
    }

    itensADeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })
    mensagem = 'Meta(s) deletada(s) com sucesso!'
}

const mostrarMensagem = () =>{
    console.clear();

    if(mensagem != '') {
        console.log(mensagem)
        console.log('')
        mensagem = ''
    }
}

const start = async () => {

    while(true){
        mostrarMensagem()

        const opcao = await select({
            message: 'Menu >',
            choices: [
                {
                    name: 'Cadastrar meta',
                    value: 'cadastrar'
                },
                {
                    name: 'Listar metas',
                    value: 'listar'
                },
                {
                    name: 'Metas realizadas',
                    value: 'realizadas'
                },
                {
                    name: 'Metas abertas',
                    value: 'abertas'
                },
                {
                    name: 'Deletar metas',
                    value: 'deletar'
                },
                {
                    name: 'Sair',
                    value: 'sair'
                }
            ]
        })

        switch(opcao){
            case 'cadastrar':
                await cadastrarMeta()
                console.log(metas)
                break
            case 'listar':
                await listarMetas()
                break
            case 'realizadas':
                await metasRealizadas()
                break
            case 'abertas':
                await metasAbertas()
                break
            case 'deletar':
                await deletarMetas()
                break
            case 'sair':
                console.log('saindo...')
                return
        }
    }
}

start()