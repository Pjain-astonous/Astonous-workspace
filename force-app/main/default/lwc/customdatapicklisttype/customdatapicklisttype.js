import { LightningElement,api } from 'lwc';
const cols=[
    { label: 'Name', type: 'Text',fieldName: 'Name'},
    {label: 'Quantity', type: 'picklist', fieldName: 'Quantity',
    typeAttributes: {
        label:{fieldName: 'Quantity'},
        options: [
            { label: 'Hot', value: 'Hot' },
            { label: 'Warm', value: 'Warm' },
            { label: 'Cold', value: 'Cold' },
        ] ,// list of all picklist options
        value:{fieldName: 'Quantity'}

      }
    
   },
   {label: 'Unit price',type: 'Currency', fieldName: 'UnitPrice'},
   { label: 'Type',type: 'Text', fieldName: 'Type'},
   { label: 'Total Price',type: 'Currency', fieldName: 'TotalPrice'}

];
const data=[{
    Name: 'Preeti',
    Quantity:'Hot',
    UnitPrice: '200',
    TotalPrice: '500'
    
}];

export default class Customdatapicklisttype extends LightningElement {
columns=cols;
data=data;



}