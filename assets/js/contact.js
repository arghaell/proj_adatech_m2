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
export function insert(contact) {
  let nexContact = { id: nextContactId, ...contact };
  contacts.push(nexContact);
  nextContactId++;
}

/**
 * Função para retornar todos os contatos cadastrados
 */
export function findAll() {
  return contacts;
}

/**
 * Função para retornar o contato pelo ID
 * @param {*} id
 */
export function findById(id) {
  let contact = contacts.find((contact) => contact.id === parseInt(id));
  return contact ? [contact] : [];
}

/**
 * Função que atualiza um registro na lista de objetos
 * @param {*} id
 * @param {*} contact
 */

export function update(id, contact) {
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].id === parseInt(id)) {
      contacts[i] = { id: parseInt(id), ...contact };
    }
  }
}

/**
 * Função que remove um contato da lista
 * @param {*} id
 */
export function destroy(id) {
  let newArr = contacts.filter((contact) => contact.id != id);
  contacts = newArr;
  console.log(newArr);
}
