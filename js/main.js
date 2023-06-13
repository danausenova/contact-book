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

let contactList = JSON.parse(localStorage.getItem("contact")) || [];
render();

function render() {
  contactBook.innerHTML = "";
  contactList.forEach((item) => {
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

addForm.addEventListener("submit", (e) => {
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
    id: Date.now(),
    name: nameInp.value,
    surname: surnameInp.value,
    phone: phoneInp.value,
    image: imageInp.value,
  };
  contactList.push(contact);
  localStorage.setItem("contact", JSON.stringify(contactList));
  nameInp.value = "";
  surnameInp.value = "";
  phoneInp.value = "";
  imageInp.value = "";
  render();
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    contactList = contactList.filter((item) => item.id != e.target.id);
    localStorage.setItem("contact", JSON.stringify(contactList));
    render();
  }
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-btn")) {
    editModal.style.visibility = "visible";
    const contactToEdit = contactList.find((item) => item.id == e.target.id);

    editName.value = contactToEdit.name;
    editSurname.value = contactToEdit.surname;
    editPhone.value = contactToEdit.phone;
    editImg.value = contactToEdit.image;
    editSubmit.id = e.target.id;
  }
});

editCancel.addEventListener("click", () => {
  editModal.style.visibility = "hidden";
});

editSubmit.addEventListener("click", (e) => {
  if (
    !editName.value.trim() ||
    !editSurname.value.trim() ||
    !editPhone.value.trim() ||
    !editImg.value.trim()
  ) {
    return;
  }
  contactList = contactList.map((item) => {
    if (item.id == editSubmit.id) {
      item.name = editName.value;
      item.surname = editSurname.value;
      item.phone = editPhone.value;
      item.image = editImg.value;
    }
    return item;
  });
  localStorage.setItem("contact", JSON.stringify(contactList));
  render();
  editCancel.click();
});
