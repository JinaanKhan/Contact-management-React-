import React from "react";
import { Link } from "react-router-dom";
import ErSticker from "../images/ErSticker.jpg";


const ContactCard = (props) => {

  const { id, name, email } = props.contact;

  return (
    <div className="item" style={{ display: "flex", alignItems: "flex-start"}}>
      <img className="ui avatar image" src={ErSticker} alt="ErSticker" style={{ marginTop: "7px" }}></img>
      <div className="content" style={{ marginBottom: "5px", marginTop: "5px" }}>
        <Link to={{ pathname: `/contact/${id}`, state: { contact: props.contact } }}>
          <div className="header">{name}</div>
          <div style={{ color: "#2e92b0" }}>{email}</div>
        </Link>
      </div>

      <div style={{ marginLeft: "auto",display: "flex" ,gap:"5px"}}>
        <Link to={{ pathname: `/edit`, state: { contact: props.contact } }}>
          <i className="edit alternate outline icon"
            style={{ marginLeft: "auto", marginTop: "3vh", marginBottom: "auto", color: "blue" }}
          ></i>
        </Link>

        <i className="trash alternate outline icon"
          style={{ marginLeft: "auto", marginTop: "3vh", marginBottom: "auto", color: "red", marginLeft: "auto" }}
          onClick={() => props.clickHandler(id)}
        ></i>


      </div>


    </div>



  )

}

export default ContactCard;