import React,{useRef} from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";


const ContactList = (props) => {

    const inputEl = useRef("");

    const deleteContactHandler = (id) => {
        props.getContactId(id);
    }
    // const contacts = [
    //     {
    //         id: "1",
    //         name: "ji",
    //         email: "ji@gmail.com",
    //     },
    // ]

    const renderContactList = props.contacts.map((contact) => {
        return (
            <ContactCard contact={contact} clickHandler={deleteContactHandler} key={contact.id} />
        )
    })

    const getSearchTerm = ()=>{
       props.searchKeyword(inputEl.current.value);
    }
     

    return (
         
        <div className="main" style={{
                // display: "flex",
                justifyContent: "space-between",
                alignItems: "center",

            }}>
                <div style={{display:"flex",justifyContent: "space-between", marginTop:"12vh"}}>

                     <h2> Contact List </h2>
                <Link to="/add">
                   <button className="ui button blue right" style={{padding: "8px 15px" }} >Add Contact</button>
                </Link>

                </div>
           
               
           

          <div className="ui search" >
            <div className="ui icon input" style={{ width: "100%"}}  >
               <input ref={inputEl} type="text" placeholder="Search contacts" className="prompt" value={props.term} onChange={getSearchTerm}></input>
               <i className="search icon"></i>
            </div>
          </div> 

           

            <div className="ui celled list" style={{ marginTop: "10px", paddingTop: "0" }}>{renderContactList.length > 0 ? renderContactList : "No Contacts available"}</div> 

        </div>
    )

}

export default ContactList;