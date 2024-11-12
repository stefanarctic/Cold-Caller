import { createSlice } from "@reduxjs/toolkit";
import { getDocs } from "firebase/firestore";
import { contactsCollection } from "../firebase/FirebaseSetup";

export const contactSlice = createSlice({
    name: 'contacts',
    initialState: {
        value: []
    },
    reducers: {
        setContacts: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const getContacts = async () => {
    const docsSnapshot = await getDocs(contactsCollection);
    const contacts = docsSnapshot.docs.map(doc => {
        const data = doc.data();
        data.date_assigned = data.date_assigned.toDate().getTime();
        data.id = doc.id;
        return data;
    });
    return contacts;
}

export const { setContacts } = contactSlice.actions;

export default contactSlice.reducer;