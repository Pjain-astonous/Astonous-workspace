import { LightningElement, wire } from 'lwc'
import customerContact from '@salesforce/apex/ActiveItem.customerContact'
import { publish, subscribe, MessageContext } from 'lightning/messageService'
import HEADER_COMP_CHANNEL from '@salesforce/messageChannel/Header_Comp__c'

export default class Headercomp extends LightningElement {
  Options
  value = ''
  searchValue = ''
  showPage = true
  connectedCallback () {
    this.subscribeToMessageChannel()
  }
  @wire(MessageContext)
  messageContext

  subscribeToMessageChannel () {
    this.subscription = subscribe(
      this.messageContext,
      HEADER_COMP_CHANNEL,
      message => this.handleMessage(message)
    )
  }
  handleMessage (message) {
    if (message.showPage == false) {
      this.showPage = message.showPage
      console.log(message)
    }
  }
  //For Get Contacts value from 'CustomerContact' Apex Method
  @wire(customerContact) wiredobjects ({ error, data }) {
    if (data) {
      this.Options = data.map(value => {
        console.log(value)
        return {
          label: value.Name,
          value: value.Id
        }
      })
    } else if (error) {
      console.log('Error', error)
    }
  }
  //Contact Picklist Onchnage handle
  handleTypeChange (event) {
    this.value = event.detail.value
    console.log(this.value)
    const payload = {
      contactId: this.value
    }
    publish(this.messageContext, HEADER_COMP_CHANNEL, payload)
  }
  handleChange (event) {
    this.searchValue = event.detail.value
  }
  handleClick () {
    this.searchKey = this.searchValue
    console.log('sesarchkey', this.searchKey)

    //this.OldSearch = this.searchValue.length;
    console.log(this.searchValue)
    const payload = {
      contactId: this.value,
      search: this.searchKey
    }
    publish(this.messageContext, HEADER_COMP_CHANNEL, payload)
    //return refreshApex(this.wiredActivities);
  }
}