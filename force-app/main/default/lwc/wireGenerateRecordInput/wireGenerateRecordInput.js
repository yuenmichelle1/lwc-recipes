import { LightningElement, api, wire } from 'lwc';
import {
    getRecordCreateDefaults,
    getRecordUi,
    generateRecordInputForCreate,
    generateRecordInputForUpdate
} from 'lightning/uiRecordApi';
import CONTACT_OBJECT from '@salesforce/schema/Contact';

export default class WireGenerateRecordInput extends LightningElement {
    @api recordId;

    @wire(getRecordUi, {
        recordIds: '$recordId',
        layoutTypes: 'Full',
        modes: 'Edit'
    })
    recordUi;

    get recordInputForUpdateJSON() {
        if (!this.recordUi.data) {
            return '';
        }

        const contactObjectInfo = this.recordUi.data.objectInfos[
            CONTACT_OBJECT.objectApiName
        ];
        const record = this.recordUi.data.records[this.recordId];
        const recordInput = generateRecordInputForUpdate(
            record,
            contactObjectInfo
        );
        return JSON.stringify(recordInput, null, 2);
    }

    @wire(getRecordCreateDefaults, { objectApiName: CONTACT_OBJECT })
    contactCreateDefauts;

    get recordInputForCreateJSON() {
        if (!this.contactCreateDefauts.data) {
            return '';
        }

        const contactObjectInfo = this.contactCreateDefauts.data.objectInfos[
            CONTACT_OBJECT.objectApiName
        ];
        const recordDefaults = this.contactCreateDefauts.data.record;
        const recordInput = generateRecordInputForCreate(
            recordDefaults,
            contactObjectInfo
        );
        return JSON.stringify(recordInput, null, 2);
    }

    get errors() {
        return [this.recordUi.error, this.contactCreateDefauts.error].filter(
            error => !!error
        );
    }
}
