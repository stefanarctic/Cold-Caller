import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getContacts, setContacts } from "../features/contacts";
import { useDispatch } from "react-redux";

const Contacts = () => {

    const contacts = useSelector(state => state.contacts.value);
    const dispatch = useDispatch();

    const updateContacts = async () => {
        const contacts = await getContacts();
        dispatch(setContacts(contacts));
    }

    useEffect(() => {
        updateContacts();
    }, []);

    return (
        <div className="contacts">
            {
                contacts && contacts.map((contact, index) => (
                    <div className="contact" key={index}>
                        <p id="name">{contact.name}</p>
                        <p id="phone-number"><a href={`https://call.ctrlq.org/+4${contact.phone_number.replace(' ', '%20')}`} target="_blank">{contact.phone_number}</a></p>
                        <p id="website"><a href={contact.website} target="_blank">{contact.website}</a></p>
                        <p id="called">{contact.called ? '✅' : '❌'}</p>
                        <p id="date">{`${contact.date_assigned.toLocaleString('default', {day: '2-digit'})} ${contact.date_assigned.toLocaleString('default', {month: 'long'})}`}</p>
                    </div>
                ))
            }
        </div>
    );
}

export default Contacts;