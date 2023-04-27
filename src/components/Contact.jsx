import React, { useState } from "react";
import "../styles/contact.css";

const Contact = ({ user, updateContact, deleteContact }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);

  const handleOnupdate = (e) => {
    if (!name || !phone) {
      alert("name and phone cannot be empty.");
      return;
    }
    e.preventDefault();
    setIsDisabled(true);
    updateContact(name, phone, user.id);
  };

  const handleOnDelete = (e) => {
    e.preventDefault();
    deleteContact(user.id);
  };

  return (
    <div className="contact">
      {isDisabled && (
        <>
          <div className="contact-details">
            {/* <div className="id">{user.id}</div> */}
            <div className="name">{user.name}</div>
            <div className="phone">{user.phone}</div>
          </div>
          <div className="actions">
            <img src="bin.png" alt="" onClick={handleOnDelete} />
            <img src="edit.png" alt="" onClick={() => setIsDisabled(false)} />
          </div>
        </>
      )}
      {!isDisabled && (
        <>
          <div className="contact-details">
            <div className="name">
              <input
                className="edit"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="phone">
              <input
                className="edit"
                type="text"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="actions">
            <button className="btn" onClick={handleOnupdate}>
              Update
            </button>
            <button className="btn" onClick={() => setIsDisabled(true)}>
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Contact;
