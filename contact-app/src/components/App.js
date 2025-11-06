import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import api from "../api/contacts";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import EditContact from "./EditContact";


function App() {

  // const contacts = [
  //   {
  //     id:"1",
  //     name:"jinaan",
  //     email:"ji@gmail.com",
  //   },
  //   {
  //     id:"2",
  //     name:"abc",
  //     email:"abc@gmail.com",
  //   },
  // ]

  const LOCAL_STORAGE_KEY = "contacts";
   

  const [contacts, setContacts] = useState([]);
  const [searchTerm,setSearchTerm] = useState("");
  const [searchResult,setSearchResult] = useState([]);


  //RetrieveContacts
  const retrievedContacts=async() => {
    const response = await api.get("http://localhost:3006/contacts");
    return response.data;
  }


  const addContactHandler = async(contact) => {
    // setContacts([...contacts,contact])
    const request={
      id: uuid() , ...contact
    }

    const response=await api.post("/contacts",request)

    setContacts([...contacts, response.data]);
  }

  const updateContactHandler=async(contact)=>{

    const response = await api.put(`/contacts/${contact.id}`,contact);
    const {id,name,email}=response.data;
    setContacts(
      contacts.map((contact)=>{
        return contact.id===id? {...response.data} : contact;
      })
    );

  }


  const removeContactHandler = async(id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    })
    setContacts(newContactList);
  }

  const searchHandler = (searchTerm)=>{
    setSearchTerm(searchTerm);
    if(searchTerm !== ""){
      const newContactList = contacts.filter((contact)=>{
        return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
      });
      setSearchResult(newContactList);
    }else{
      setSearchResult(contacts);
    }

  }


  useEffect(() => {
    // const retrievedContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retrievedContacts && retrievedContacts.length > 0) setContacts(retrievedContacts);
    const getallContacts = async () => {
      const allContacts = await retrievedContacts();
      if (allContacts) setContacts(allContacts);
    };
    getallContacts();
  }, []);

  useEffect(() => {
    // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);



  return (
    <div className="ui container">
      <Router>
       
        <Header />
          <Switch>
       
        {/* <Routes> */}
           
                    {/* <Route path="/"  Component={()=><ContactList  contacts={contacts} getContactId={removeContactHandler} />} /> */}
                   <Route 
                      path="/" exact
                      render={(props)=>(
                        <ContactList
                         {...props}
                        //  contacts = {contacts}
                         contacts={searchTerm.length < 1 ? contacts : searchResult}
                         getContactId={removeContactHandler}
                         term={searchTerm}
                         searchKeyword = {searchHandler}
                         />
                      )} 
                      
                    />
                    {/* <Route path="/add" Component={()=><AddContact addContactHandler={addContactHandler}/>} /> */}
                  <Route
                   path="/add"
                   render={(props)=>(
                     <AddContact
                     {...props}
                     addContactHandler={addContactHandler}
                     />
                   )}
                    />

                    <Route
                     path="/contact/:id"
                     component={ContactDetail}
                    />

                     <Route
                   path="/edit"
                   render={(props)=>(
                     <EditContact
                     {...props}
                     updateContactHandler={updateContactHandler}
                     />
                   )}
                    />


                    </Switch>

        {/* </Routes> */}
        {/* <AddContact addContactHandler={addContactHandler}/> */}
        {/* <ContactList contacts={contacts} getContactId={removeContactHandler} /> */}
      </Router>

    </div>
  );

}

export default App;
