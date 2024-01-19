import { LightningElement ,track} from 'lwc';

const columns = [
    { label: 'Name', fieldName: 'Name',},
    { label: 'Account Number', fieldName: 'AccountNumber', },
    { label: 'Phone', fieldName: 'phone', type: 'phone',  },
    {
        label: 'Rating', fieldName: 'Rating', type: 'picklist', typeAttributes: {
            placeholder: 'Choose rating', options:[
                { label: 'New', value: 'new' },
                { label: 'In Progress', value: 'inProgress' },
                { label: 'Finished', value: 'finished' },
                { label: 'New', value: 'new' },
                { label: 'In Progress', value: 'inProgress' },
                { label: 'Finished', value: 'finished' },
            ]
            //[
            //     { label: 'New', value: 'new' },
            //     { label: 'In Progress', value: 'inProgress' },
            //     { label: 'Finished', value: 'finished' },
            // ]
            , value: { fieldName: 'Rating'},
            
             // default value for picklist
         // binding account Id with context variable to be returned back
        },
        wrapText: true
    }
];

export default class CustomDatatableDemo extends LightningElement{
    
   
    @track data =  [{'Name': 'Acme', 'AccountNumber': 'CD355119-A', 'Rating':'new', phone: 12537 }, { 'Name': 'Mace', 'AccountNumber': 'CD355120-A', 'Rating': 'new', phone: 1978234 },{ 'Name': 'Mace', 'AccountNumber': 'CD355120-A', 'Rating': 'new', phone: 1978234 },{ 'Name': 'Mace', 'AccountNumber': 'CD355120-A', 'Rating': 'new', phone: 1978234 },{ 'Name': 'Mace', 'AccountNumber': 'CD355120-A', 'Rating': 'new', phone: 1978234 },{ 'Name': 'Mace', 'AccountNumber': 'CD355120-A', 'Rating': 'new', phone: 1978234 }];
    columns=columns;
   
    // pickliListChanged(event)
    // {
    //     // this.data.Rating=event.detail.value;
    //     console.log(error);
    //     event.stopPropagation();
    // }
    
    
}