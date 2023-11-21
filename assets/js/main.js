import { destroy, findAll, findById, insert, update } from './contact.js';

const table = document.querySelector('.table tbody');
const formContact = document.querySelector('#form');


/**
 * Monta a tabela depois que alguma alteração ocorrer na lista de contatos
 */
const renderTable = () => {

    let contacts = findAll();
    let html = '';

    if (contacts.length === 0) {
        html = `
        <tr>
            <td class="text-center " colspan="6">Nenhum Contato adicionado</td>
        </tr>
        `;
    } else {

        contacts.forEach(contact => {
            html += `
                <tr>
                    <td>${contact.id}</td>
                    <td>${contact.name}</td>
                    <td>${contact.phone}</td>
                    <td>${contact.email}</td>
                    <td>${contact.street}, ${contact.number}, ${contact.district}, ${contact.city} - ${contact.state}</td>
                    <td>
                        <button class="btn btn-primary btn-options" id-contact="${contact.id}" action="edit"><i class="bi bi-pencil"></i></button>
                        <button class="btn btn-danger btn-options" id-contact="${contact.id}" action="destroy"><i class="bi bi-trash3"></i></button>
                    </td>
                </tr>
            `;
        })

    }

    table.innerHTML = html;
    addEventToButton();
}


/**
 * Adiciona os eventos nos botões da tabela
 */
const addEventToButton = () => {
    const buttons = document.querySelectorAll('.btn-options');

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            let contactId = button.getAttribute('id-contact');
            let action = button.getAttribute('action');

            if (action === 'destroy') {
                const confirmDeletion = confirm("Deseja realmente excluir este contato?");

                if (confirmDeletion) {
                    deleteContact(contactId);
                }
            } else {
                openEditModal();
            }

        })
    })
}

/**
 * Insere um contato
 */
const insertContact = () => {
    const contact = {
        name: document.querySelector('#form input[name="username"]').value,
        phone: document.querySelector('#form input[name="phone"]').value,
        email: document.querySelector('#form input[name="email"]').value,
        street: document.querySelector('#form input[name="street"]').value,
        number: document.querySelector('#form input[name="number"]').value,
        district: document.querySelector('#form input[name="district"]').value,
        city: document.querySelector('#form input[name="city"]').value,
        state: document.querySelector('#form input[name="state"]').value
    }
    insert(contact);
    renderTable();
    bootstrap.Modal.getInstance(document.querySelector('#contact')).hide();
    alert("Contato cadastrado com sucesso");
}

/**
 * Adiciona o evento de submit no formulario de cadastrar e editar contato
 */
formContact.addEventListener('submit', (event) => {
    event.preventDefault();
    insertContact();
})


renderTable();
