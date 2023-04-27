import React, { useRef } from "react";
import "../styles/contacts-list.css";
import Contact from "./Contact";

const ContactsList = ({
  users,
  addContact,
  updateContactList,
  deleteContact,
}) => {
  let name = useRef("");
  let phone = useRef("");
  let id = 0;
  let isAdding = false;

  const handleAddContact = (e) => {
    e.preventDefault();
    //alert(name.current.value);

    if (name.current.value === "") {
      alert("Please fill in the name");
      return;
    }

    if (phone.current.value === "") {
      alert("Please fill in the phone");
      return;
    }

    isAdding = true;
    addContact(name, phone);
    const input = document.getElementsByClassName("in");
    //console.log("input ", input);
    input[0].value = "";
    input[1].value = "";

    isAdding = false;
  };

  const updateContact = (name, phone, id) => {
    updateContactList(name, phone, id);
  };

  return (
    <>
      <h2>
        <img src="contact-book.png" alt="" />
        Contacts List
      </h2>

      <form className="form" action="submit">
        <input className="in" type="text" ref={name} placeholder="name" />
        <input className="in" type="text" ref={phone} placeholder="phone" />
        <button onClick={handleAddContact}>
          {isAdding ? "Adding" : "Add"} Contact
        </button>
      </form>

      <div className="contacts-list">
        {users.map((user) => {
          user.id = id;
          return (
            <Contact
              user={user}
              key={id++}
              updateContact={updateContact}
              deleteContact={deleteContact}
            ></Contact>
          );
        })}
      </div>
    </>
  );
};

export default ContactsList;
