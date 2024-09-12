// hello word two

const { select, input, checkbox } = require('@inquirer/prompts')

let metas = []

const cadastrarMeta = async () => {
    const meta = await input({message:'Digite sua nova meta: '})
    if (meta.length == 0) {
        console.log('a meta não foi digitada!')
        return
    }
    
    metas.push({value: meta, checked: false})
}

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as setas para navegar entre as metas, o espaço para marcar/desmarcar e Enter para finalizar",
        choices: [...metas],
        instructions: false
    })
    if(respostas == 0){
        console.log('nenhuma meta selecionada!')
        return
    }

    metas.forEach((m) => {
        m.checked = false
    })
    
    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })
        meta.checked = true
    })

    console.log('Meta(s) concluída(s)')
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })
    console.log(realizadas)
}

const start = async () => {

    while(true){

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
            case 'sair':
                console.log('saindo...')
                return
        }
    }
}

start()