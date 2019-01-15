import { LightningElement, track, wire } from 'lwc';
import findContacts from '@salesforce/apex/ContactController.findContacts';

export default class ApexWireMethodWithParams extends LightningElement {
    @track searchKey = '';

    @wire(findContacts, { searchKey: '$searchKey' })
    contacts;

    handleSearch() {
        this.searchKey = this.template.querySelector('lightning-input').value;
    }
}
