import React, {useState,useEffect} from "react";
import "../../styles/Ticketdetails.css";
import Faq from "../Faq_section";
import { faqDat , tickets} from "../../data";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../ProgressBar"
import { useParams } from 'react-router-dom';

function TicketDetails(){
    const navigate = useNavigate();
    const { id } = useParams();

let event = tickets[id - 1];
    const [userDetails, setUserDetails] = useState({
        ticket_type : "",
        selling_price : "",
        face_value : "",
        ticket_format : "",
        quantity : "",
        transferiability: "",
    })
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';
    const handleChange = (e)=>{
        const {name,value} = e.target;
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    }

    const [name, setname] = useState(null);
    useEffect(()=>{
        const fetchname = async ()=>{
            const response = await fetch(`${API_BASE_URL}/event/event_name`,{
                method:'POST',
            })

            const result = await response.json();

            if (result.success){
                setname(result.names);
            }
        }
        fetchname();
    },[]);

    if (!name){
        return<div>Add event First</div>;
    }
    
    const handlesubmit = async (e)=>{
        e.preventDefault();
        const ticket_type = userDetails.ticket_type;
        const selling_price = userDetails.selling_price;
        const face_value = userDetails.face_value;
        const ticket_format = userDetails.ticket_format;
        const quantity = userDetails.quantity;
        const transferability = userDetails.transferability;
        const response = await fetch('/listing2',{
            method : 'POST',
            headers : { 'Content-Type': 'application/json' },
            body : JSON.stringify({ticket_type, selling_price, face_value, ticket_format, quantity, transferability})
        })

        const result = await response.json();

        if (result.success){
            alert("Submitted");
            navigate('/listing');
        }else{
            alert(result.message);
        }
    }
    



    return (
        <div className="align_centre_column">
            <div className="event-card2" >
      <img src={event.photo} alt={event.eventName} className="event-image" />
      <div className="event-details2">
        <h3 className="event-name2">{event.eventName}</h3>
        <p className="event-location2">📍 {event.eventLocation}</p>
        <p className="event-date2">📅 {event.eventDateTime}</p>
      </div>
    </div>
            
            <form className="categorycontainer3" onSubmit={handlesubmit}>
                <h1 id="h1">Ticket Details</h1>
                    <div className="typess">
                        <label htmlFor="Event Name">Event Name</label>
                        <select id="texting"  required >
                        <option value="" disabled selected>Select Event Name</option>
                        {name.map((names, index) => (
                            <option key={index} value={names.event_name}>{names.event_name}</option>
                        ))}
                        </select>
                        <p style={{ color: "red", fontWeight: "bold", fontSize: "16px", textAlign: "center" }}>If event does not exist kindly add event first</p>
                    </div>
                    <div className="typess">
                        <label htmlFor="Ticket Type">Ticket Type</label>
                        <select id="Ticket_Type" name="ticket_type" value={userDetails.ticket_type} onChange={handleChange} required>
                            <option value="" disabled selected>Select Ticket Type</option>
                            <option value="VIP" name="vip">VIP Tickets</option>
                            <option value="E-Tickets" name="eticket">E-Tickets</option>
                        </select>
                    </div>
                    <div className="typess">
                        <label htmlFor="Quantity">Number of Tickets</label>
                        <input type="number" id="quantity" min= '1' max='10' name="quantity" placeholder="0" value={userDetails.quantity} onChange={handleChange} required />
                    </div>
                    <div className="typess">
                        <label htmlFor="Ticket Information">Ticket Format</label>
                        <input type="text" id="information" name="ticket_format" value={userDetails.ticket_format} onChange={handleChange} placeholder="Enter Ticket Information" required/>
                    </div>
                    <div className="typess">
                        <label htmlFor="Transferbiality">Mode of Transfer</label>
                        <select id="moreinfo" name="transferability" placeholder="Online/Physical Delivery" value={userDetails.transferability} onChange={handleChange} required >
                            <option value="" disabled selected>Select your option</option>
                            <option value="Online" name="online" >Online</option>
                            <option value="Physical Delivery" name="delivery" >Physical Delivery</option>
                        </select>
                    </div>
                    <div className="typess">
                        <label htmlFor="Face Value">Face Value</label>
                        <input type="number" id="face_value" name="face_value" placeholder="800/-" value={userDetails.face_value} onChange={handleChange} required/>
                    </div>
                    <div className="typess">
                        <label htmlFor="Selling Price">Selling Price</label>
                        <input type="number" id="selling_price" name="selling_price" placeholder="1000/-" value={userDetails.selling_price} onChange={handleChange} required/>
                    </div>
                    <div className="typess">
                        <input type="submit" id="submit" value="Add Ticket" required/>
                    </div>
            </form>
            <div>
                <Faq faqData={faqDat}/>
            </div>
        </div>
    );
};

export default TicketDetails;
