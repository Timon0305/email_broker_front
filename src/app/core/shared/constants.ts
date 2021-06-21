import {FormField} from './models';

export enum FieldNames {
    'ITEM_NAME' = 'itemName',
    'DESCRIPTION' = 'description',
    'QUANTITY' = 'quantity',
    'UNIT' = 'unit'
}

export const FormConfig: FormField[] = [
    {
        type: 'text',
        label: 'Item Name',
        name: FieldNames.ITEM_NAME,
        value: '',
        class: 'pl-1'
    },
    {
        type: 'text',
        label: 'Description',
        name: FieldNames.DESCRIPTION,
        value: '',
        class: '-md-1'
    },
    {
        type: 'text',
        label: 'Quantity',
        name: FieldNames.QUANTITY,
        value: '',
        class: '-md-1',
    },
    {
        type: 'text',
        label: 'Unit',
        name: FieldNames.UNIT,
        value: '',
        class: '-md-1'
    }
]
