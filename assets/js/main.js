import { destroy, findAll, findById, insert, update } from "./contact.js";

const table = document.querySelector(".table tbody");
const formContact = document.querySelector("#form");
const formSearch = document.querySelector("#form-search");
let idContactEdit;
let isRegister = true;
const actionTypes = {
    register: "register",
    edit: "edit",
    destroy: "destroy",
};

/**
 * Retorna um objeto com os dados do formulário
 * @returns
 */
const getDataForm = () => {
    return {
        name: document.querySelector('#form input[name="name"]').value,
        phone: document.querySelector('#form input[name="phone"]').value,
        email: document.querySelector('#form input[name="email"]').value,
        street: document.querySelector('#form input[name="street"]').value,
        number: document.querySelector('#form input[name="number"]').value,
        district: document.querySelector('#form input[name="district"]').value,
        city: document.querySelector('#form input[name="city"]').value,
        state: document.querySelector('#form input[name="state"]').value,
    };
};

/**
 * Abre a modal de cadastrar e editar
 * @param {*} register
 */
const openRegisterModal = (register) => {
    isRegister = register;

    if (isRegister) {
        document.querySelector("#title-modal-register").innerHTML = "Novo Contato";
        document.querySelector("#btn-modal-register").innerHTML = "Cadastrar";
    } else {
        document.querySelector("#title-modal-register").innerHTML =
            "Editar Contato";
        document.querySelector("#btn-modal-register").innerHTML = "Salvar";
    }

    var modalContact = new bootstrap.Modal(document.querySelector("#contact"));
    modalContact.show();
};

/**
 * Insere um contato
 */
const saveContact = () => {
    const contact = getDataForm();

    if (isRegister) {
        insert(contact);
        alert("Contato cadastrado com sucesso");
    } else {
        update(idContactEdit, contact);
        alert("Contato alterado com sucesso");
    }

    renderTable(findAll());
    bootstrap.Modal.getInstance(document.querySelector("#contact")).hide();
};

/**
 * Adiciona os eventos nos botões excluir da tabela
 */
const addEventToButtonsDestroy = () => {
    const buttons = document.getElementsByClassName("btn-destroy");

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function () {
            let contactId = this.getAttribute("id-contact");
            alert(`Contato excluído com sucesso.`);
            destroy(contactId);
            renderTable(findAll());
        });
    }
};

/**
 * Adiciona os eventos nos botões editar da tabela
 */
const addEventToButtonsEdit = () => {
    const buttons = document.querySelectorAll(".btn-edit");

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function () {
            idContactEdit = this.getAttribute("id-contact");
            let contact = findById(idContactEdit)[0];

            for (const key in contact) {
                if (key != "id") {
                    document.querySelector(`#form input[name="${key}"]`).value =
                        contact[key];
                }
            }
            openRegisterModal(false);
        });
    }
};

/**
 * Monta a tabela depois que alguma alteração ocorrer na lista de contatos
 */
const renderTable = (contacts) => {
    let html = "";

    if (contacts.length === 0) {
        html = `
        <tr>
            <td class="text-center " colspan="6">Nenhum Contato adicionado</td>
        </tr>
        `;
    } else {
        contacts.forEach((contact) => {
            html += `
                <tr>
                    <td>${contact.id}</td>
                    <td>${contact.name}</td>
                    <td>${contact.phone}</td>
                    <td>${contact.email}</td>
                    <td>${contact.street}, ${contact.number}, ${contact.district}, ${contact.city} - ${contact.state}</td>
                    <td>
                        <button class="btn btn-primary btn-edit" id-contact="${contact.id}" action="${actionTypes.edit}"><i class="bi bi-pencil"></i></button>
                        <button class="btn btn-danger btn-destroy" id-contact="${contact.id}" action="${actionTypes.destroy}"><i class="bi bi-trash3"></i></button>
                    </td>
                </tr>
            `;
        });
    }

    table.innerHTML = html;
    addEventToButtonsDestroy();
    addEventToButtonsEdit();
};

/**
 * Adiciona o evento de submit no formulario de cadastrar e editar contato
 */
formContact.addEventListener("submit", (event) => {
    event.preventDefault();
    formSearch.reset();
    saveContact();
});

formSearch.addEventListener("submit", (event) => {
    event.preventDefault();
    let id = document.querySelector("#search").value;
    let result = findById(id);

    bootstrap.Modal.getInstance(document.querySelector("#find-contact")).hide();

    if (result.length > 0) {
        renderTable(result);
    } else {
        alert("Contato não encontrado");
        renderTable(findAll());
    }
});

document.querySelector("#see-all").addEventListener('click', e => {
    renderTable(findAll());
})

/**
 * Adiciona o evento para abrir modal no modo cadastrar contato
 */
document
    .querySelector(".btn-open-register-modal")
    .addEventListener("click", (e) => {
        formContact.reset();
        openRegisterModal(true);
    });

renderTable(findAll());
