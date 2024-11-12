import { useEffect, useRef, useState } from "react";
import { AppRef } from "../App";
import { addDoc } from "firebase/firestore";
import { contactsCollection } from "../firebase/FirebaseSetup";

const dateToString = date => {
    const date_str = 
        date.getFullYear() + "-" + ("00" + date.getMonth() + 1).slice(-2) + "-" + ("00" + date.getDate()).slice(-2);
    return date_str;
}

const stringToDate = str => {
    const [year, month, date] = str.split('-');
    return new Date(year, month, date);
}

const CreateContact = () => {

    const [dialogOpen, setDialogOpen] = useState(false);
    const floatingPlusButton = useRef(null);
    const popup = useRef(null);
    let name = '', phone = '', called = false, website = '', date = new Date();
    const nameInput = useRef(null), phoneInput = useRef(null), calledInput = useRef(null), websiteInput = useRef(null), dateInput = useRef(null);
    const overlay = useRef(null);

    useEffect(() => {
        console.log(dateToString(date));
    }, [date]);

    const setCurrentDate = () => {
        date = new Date(Date.now());
        date.setMonth(date.getMonth() + 1);
        dateInput.current.value = dateToString(date);
        console.log(dateToString(date));
    }

    const openDialog = () => {
        setDialogOpen(true);
        console.log('opened popup');
        popup.current.style.display = 'flex';
        nameInput.current.focus();
        overlay.current.style.display = 'block';
    }

    const closeDialog = () => {
        setDialogOpen(false);
        console.log('closed popup');
        popup.current.style.display = 'none';
        overlay.current.style.display = 'none';
    }

    const onPopupClick = e => {
        // const popupContent = e.target.children[0];
        if(!popup.current.contains(e.target))
            closeDialog();
    }

    const insertCharAtIndex = (str, char, index) => {
        return str.slice(0, index) + char + str.slice(index);
    }
    
    /* 0725379458 */

    const beautifyPhone = () => {
        phone = phone.trim().replace('+4', '');
        phone = insertCharAtIndex(phone, ' ', 4);
        phone = insertCharAtIndex(phone, ' ', 8);
    }

    const formatForDatabase = () => {
        phone = phone.trim().split(' ').join('').replace('+4', '');
        if(!website.includes('https://'))
            website = 'https://' + website;
    }

    const addContact = () => {
        console.log(`Added contact ${name} ${phone} ${called} ${website} ${date}`);
        // formatData();
        // addDoc(contactsCollection, { name: name, phone: phone, called: called, date: })
    }
    
    useEffect(() => {
        if(AppRef)
            AppRef.addEventListener('click', onPopupClick);
    }, []);


    return (
        <div className="create-contact">
            <div className="overlay" ref={overlay}></div>
            <button className="floating-plus" ref={floatingPlusButton} onClick={openDialog}><span>+</span></button>
            <div className="create-contact-popup" ref={popup} >
                <div className="popup-content">
                    <h1>Create contact</h1>
                    <div className="data-input">
                        <div className="section">
                            <label htmlFor="nameInput">Name:</label>
                            <input type="text" id="nameInput" ref={nameInput} onChange={e => name = e.target.value} />
                            <label htmlFor="numberInput" >Phone number:</label>
                            <input type="number" id="numberInput" ref={phoneInput} onChange={e => phone = e.target.value} />
                            <label htmlFor="websiteInput">Website:</label>
                            <input type="text" id="websiteInput" ref={websiteInput} onChange={e => website = e.target.value} />
                        </div>
                        <div className="section">
                            <label htmlFor="calledCheckbox">Called:</label>
                            <input type="checkbox" id="calledCheckbox" ref={calledInput} onChange={e => called = e.target.checked} />
                            <label htmlFor="dateInput">Date:</label>
                                <div className="date-section">
                                    <input type="date" id="dateInput" ref={dateInput} onChange={e => date = new Date(stringToDate(e.target.value))} />
                                    <button id="set-current-date-button" onClick={setCurrentDate}>Current Date</button>
                                </div>
                            </div>
                    </div>
                    <button id="create-contact-btn" onClick={addContact}>Create Contact</button>
                    <button className="close-popup" onClick={closeDialog}>x</button>
                </div>
            </div>
        </div>
    );
}
 
export default CreateContact;