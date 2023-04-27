import { useEffect, useState } from "react";
import ContactsList from "./ContactsList";
import "../styles/App.css";

function App() {
  const [users, setUsers] = useState([]);
  //  var maxId = 11;

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch("https://jsonplaceholder.typicode.com/users", { signal })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setUsers(json);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("request cancelled!");
        } else {
          console.error("Error! : ", err);
        }
      });

    //Clean up function
    return () => {
      controller.abort();
    };
  }, []);

  const addContact = (name, phone) => {
    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify({
        name: name.current.value,
        phone: phone.current.value,
      }),

      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        const newUsers = [...users, json];
        setUsers(newUsers);
        alert("Contact added successfully");
      })
      .catch((err) => {
        alert("Unable to add contact at the moment. Please try again later");
        console.error("Error! ", err);
      });
  };

  const updateContactList = (name, phone, id) => {
    fetch("https://jsonplaceholder.typicode.com/users/1", {
      method: "PUT",
      body: JSON.stringify({
        id,
        name,
        phone,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        let newUsers = [...users];
        newUsers.forEach((user, index) => {
          if (user.id === id) {
            newUsers[index] = { name, phone, id };
          }
        });
        setUsers(newUsers);
        alert("Contact updated successfully");
      })
      .catch((err) => {
        alert("Unable to update contact at the moment. Please try again later");
        console.error("Error! ", err);
      });
  };

  const deleteContact = (id) => {
    fetch("https://jsonplaceholder.typicode.com/users/1", {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((json) => {
        let newUsers = [];
        users.splice(id, 1);
        newUsers = [...users];
        setUsers(newUsers);
        alert("Contact deleted successfully");
      })
      .catch((err) => {
        alert("Unable to delete contact at the moment. Please try again later");
        console.error("Error! ", err);
      });
  };
  return (
    <div className="App">
      <ContactsList
        users={users}
        addContact={addContact}
        updateContactList={updateContactList}
        deleteContact={deleteContact}
      ></ContactsList>
    </div>
  );
}

export default App;
