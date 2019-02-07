import { LightningElement, track, wire } from 'lwc';
import { getRecordCreateDefaults } from 'lightning/uiRecordApi';
import CONTACT_OBJECT from '@salesforce/schema/Contact';

export default class LdsCreateRecord extends LightningElement {
    @track accountId;

    name = '';

    @track defaults = [];

    @wire(getRecordCreateDefaults, { objectApiName: CONTACT_OBJECT })
    contactCreateDefaults({ data, error }) {
        if (data) {
            const contactObjectInfo =
                data.objectInfos[CONTACT_OBJECT.objectApiName];
            this.defaults = Object.entries(data.record.fields)
                // filter to fields that have a default value
                .filter(field => field[1].value)
                // filter to non-relationship fields
                .filter(field => typeof field[1].value !== 'object')
                // build shape for template iteration
                .map(field => {
                    const fieldDef = contactObjectInfo.fields[field[0]];
                    return {
                        apiName: fieldDef.apiName,
                        label: fieldDef.label,
                        value: field[1].value
                    };
                });
        } else if (error) {
            this.error = error;
        }
    }

    handleNameChange(event) {
        this.accountId = undefined;
        this.name = event.target.value;
    }

    createContact() {
        /*
        const record =
        const fields = {};
        fields[NAME_FIELD.fieldApiName] = this.name;
        const recordInput = { apiName: CONTACT_OBJECT.objectApiName, fields };
        createRecord(recordInput)
            .then(account => {
                this.accountId = account.id;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Account created',
                        variant: 'success'
                    })
                );
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: reduceErrors(error).join(', '),
                        variant: 'error'
                    })
                );
            });
        */
    }
}
