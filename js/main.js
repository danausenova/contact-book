const addForm = document.querySelector(".addForm");
const nameInp = document.querySelector(".nameInp");
const surnameInp = document.querySelector(".surnameInp");
const phoneInp = document.querySelector(".phoneInp");
const imageInp = document.querySelector(".imageInp");
const contactBook = document.querySelector(".contacts-book");

const editModal = document.querySelector("#edit-modal");
const editName = document.querySelector("#edit-input-name");
const editSurname = document.querySelector("#edit-input-surname");
const editPhone = document.querySelector("#edit-input-phone");
const editImg = document.querySelector("#edit-input-img");
const editCancel = document.querySelector("#edit-cancel");
const editSubmit = document.querySelector(".edit-submit");

const API = "http://localhost:8000/contacts";

async function getContacts() {
  const res = await fetch(API);
  const data = await res.json();
  return data;
}

async function addContact(contact) {
  const res = await fetch(API, {
    method: "POST",
    body: JSON.stringify(contact),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

render();

async function render() {
  const contacts = await getContacts();
  contactBook.innerHTML = "";
  contacts.forEach((item) => {
    contactBook.innerHTML += `<div class="newContact">
        <img src="${item.image}" alt="">
        <span>${item.name}</span>
        <span>${item.surname}</span>
        <span>${item.phone}</span>
        <div class="btnNewContact">
            <button id="${item.id}" class="edit-btn">Edit</button>
            <button id="${item.id}" class="delete-btn">Delete</button>
        </div>
        </div> `;
  });
}

addForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (
    !nameInp.value.trim() ||
    !surnameInp.value.trim() ||
    !phoneInp.value.trim() ||
    !imageInp.value.trim()
  ) {
    return;
  }
  const contact = {
    name: nameInp.value,
    surname: surnameInp.value,
    phone: phoneInp.value,
    image: imageInp.value,
  };
  await addContact(contact);
  nameInp.value = "";
  surnameInp.value = "";
  phoneInp.value = "";
  imageInp.value = "";
  render();
});

async function deleteContact(id) {
  console.log(id);
  await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
}

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete-btn")) {
    console.log(e.target.id);
    await deleteContact(e.target.id);
    render();
  }
});

async function getOneTodo(id) {
  const res = await fetch(`${API}/${id}`);
  const data = await res.json();
  return data;
}
let id = null;
document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("edit-btn")) {
    editModal.style.visibility = "visible";

    const todo = await getOneTodo(e.target.id);

    id = e.target.id;
    editName.value = todo.name;
    editSurname.value = todo.surname;
    editPhone.value = todo.phone;
    editImg.value = todo.image;
  }
});

editCancel.addEventListener("click", () => {
  editModal.style.visibility = "hidden";
});

async function editContact(newData, id) {
  await fetch(`${API}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(newData),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

editSubmit.addEventListener("click", async (e) => {
  if (
    !editName.value.trim() ||
    !editSurname.value.trim() ||
    !editPhone.value.trim() ||
    !editImg.value.trim()
  ) {
    return;
  }
  const newContact = {
    name: editName.value,
    surname: editSurname.value,
    phone: editPhone.value,
    image: editImg.value,
  };
  await editContact(newContact, id);

  render();
  editCancel.click();
});
