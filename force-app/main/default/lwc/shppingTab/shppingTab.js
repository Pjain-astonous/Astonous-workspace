import { LightningElement ,api,wire} from 'lwc';
import CustomerContact from '@salesforce/apex/AllContacts.CustomerContact';
export default class ShppingTab extends LightningElement {
    Options;
    @api value='';
    @wire(CustomerContact) wiredobjects({error, data })
   {
   console.log(data);
    if(data) 
    {
        this.Options = data.map(value =>{
            return {
                label:value ,
                value:value
            }
        });
    }
    else if(error)
         {
            console.error('check error here', error);
         }
 
 }
 handleTypeChange(event)
 {
    this.value = event.detail.value; 
 }
}