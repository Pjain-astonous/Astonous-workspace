import { LightningElement ,wire} from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import HEADERCOMP_CHANNEL from '@salesforce/messageChannel/Header_Comp__c';
export default class Headercontrols extends LightningElement {

    @wire(MessageContext)
     messageContext;
    contactselect(event)
    {
        const payload = { 
                   contactId:event.detail.value
                  
                 };
                 publish(this.messageContext,HEADERCOMP_CHANNEL, payload);
    }
    search(event)
    {
         const payload = { 
       contactId:event.detail.value,
         search:event.detail.searchkey,
         offset:event.detail.offset
        
      };
       publish(this.messageContext,HEADERCOMP_CHANNEL, payload);
    }
}