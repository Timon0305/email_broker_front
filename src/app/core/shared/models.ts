export class FormField {
    type: string;
    label?: string;
    name: string;
    text?: string;
    class?: string;
    value?: string;
    hideField?: boolean;

    constructor() {
        this.class = '';
        this.value = '';
    }
}

export enum FORM_FIELD_ACTION_TYPES {
    UPDATE ='update',
    DELETE = 'delete',
    ADD = 'add',
    SELECT = 'select'
}

export class FormRow {
    formFields: Array<FormField>;
    id?: any;
    action?: FORM_FIELD_ACTION_TYPES;
    index?: number;
}
