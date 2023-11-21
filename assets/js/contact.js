//===============MODELO DE CONTATO QUE DEVEMOS IMPLEMENTAR=====================
// {
//     id: 1,
//     name: "Maria",
//     phone: "(88) 9 8888-4444",
//     email: "maria@gmail.com",
//     street: "Rua 01",
//     number: "40",
//     district: "Bairo teste",
//     city: "Nome da cidade",
//     state: "nome do estado"
// }
//=============================================================================

let contacts = []; //guarda a lista de contatos
let nextContactId = 1; //controla o ID do proximo contato a ser inserido


/**
 * Função para inserir um contato na lista de contatos
 * @param {*} contact 
 */
export function insert(contact){
    let nexContact = {id:nextContactId, ...contact};
    contacts.push(nexContact);
    nextContactId++;
}

/**
 * Função para retornar todos os contatos cadastrados
 */
export function findAll(){
    return contacts;
}


/**
 * Função para retornar o contato pelo ID 
 * @param {*} id 
 */
export function findById(id){
    console.log('testando buscar por id')
}

/**
 * Função que atualiza um registro na lista de objetos
 * @param {*} id 
 * @param {*} contact 
 */
export function update(id, contact){
    console.log('testando atualizar')
}

/**
 * Função que remove um contato da lista
 * @param {*} id 
 */
export function destroy(id){
    console.log('destando deletar objeto')
}
