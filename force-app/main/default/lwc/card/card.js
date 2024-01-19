import { LightningElement, api, track } from 'lwc'
//import itemRecMethod from '@salesforce/apex/ActiveItem.itemRecMethod';
import orderItemRecMethod from '@salesforce/apex/ActiveItem.orderItemRecMethod'
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import { NavigationMixin } from 'lightning/navigation'

const actions = [{ label: 'Add', name: 'add' }]
const columns = [
  { label: 'Name', fieldName: 'Name' },

  { label: 'Unit Price', fieldName: 'UnitPrice__c' },
  { label: 'Total Price', fieldName: 'totalPrice' },
  {
    label: 'Quantity',
    type: 'picklist',
    typeAttributes: {
      placeholder: 'Choose rating',
      options: [
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 }
      ],
      value: { fieldName: 'Quantity__c' },
      recordId: { fieldName: 'Item__c' }
    },
    wrapText: true
  },
  {
    type: 'action',
    typeAttributes: {
      rowActions: actions,
      disabled: { fieldName: 'typeButton_disabled' }
    }
  }
]
export default class card extends NavigationMixin(LightningElement) {
  columns = columns
  @api isLoading = false
  @api additem
  @api totalprice
  @api itemlist
  @api value
  recordId = ''
  Buttontrue = false
  oldtotalprice = 0
  prevQuantity = 0

  connectedCallback () {
    this.itemlist = JSON.parse(JSON.stringify(this.itemlist))
    console.log('itemlistup...', this.itemlist)
    console.log('itemlistup...', this.itemlist.length)
  }
  picklistChanged (event) {
    console.log(event.detail.value)

    this.recordId = event.detail.recordId
    console.log(JSON.parse(JSON.stringify(this.itemlist)))
    let copydata = JSON.parse(JSON.stringify(this.itemlist))
    copydata.forEach(item => {
      if (item.Item__c === event.detail.recordId) {
        item.Quantity__c = Number(event.detail.value)
        item.totalPrice = item.Quantity__c * item.UnitPrice__c
        // console.log(copydata);
      }
    })
    this.itemlist = [...copydata]
    console.log(this.itemlist)
    console.log('withoutadd', this.itemlistupdated)
    //console.log(this.ItemList);
  }
  handleRowAction (event) {
    //   console.log('.......' + this.cartpicklistvalue);
    const row = event.detail.row
    let copydata = [...this.itemlist]
    this.oldtotalprice = 0
    this.prevQuantity = 0
    copydata.forEach(item => {
      this.oldtotalprice = this.oldtotalprice + item.totalPrice
      this.prevQuantity = this.prevQuantity + item.Quantity__c
      this.additem = this.prevQuantity
      this.totalprice = this.oldtotalprice
    })
    this.itemlist = [...copydata]
    this.itemlist = getUniqueListBy(this.itemlist, 'Item__c')
    function getUniqueListBy (arr, key) {
      return [...new Map(arr.map(item => [item[key], item])).values()]
    }
  }

  OnConfirmation () {
    this.isLoading = true
    this.itemlist = this.itemlist.map(item => {
      return {
        id: item.Item__c,
        name: item.Name,
        quantity: item.Quantity__c,
        unitPrice: item.UnitPrice__c,
        totalPrice: item.totalPrice
      }
    })
    console.log('itemlistup...', this.itemlist)
    console.log('itemlistup...', this.itemlist.length)

    // let Itemrec = { 'sobjectType': 'Order__c' };
    // Itemrec.Order_Date__c = new Date().toISOString();;
    // Itemrec.Customer__c = this.value;
    // console.log(Itemrec);
    // console.log('itemrec', typeof (Itemrec));
    // itemRecMethod({ CustomerId: this.value})
    //   .then(response => {
    //     console.log('respone', response.Id);
    //     this.isLoading = false;
    //     this.dispatchEvent(
    //       new ShowToastEvent({
    //         title: 'success',
    //         message: 'Order created successfully',
    //         variant: 'success',
    //       }),
    //     )

    orderItemRecMethod({
      orderRec: this.itemlist,
      CustomerId: this.value
    }).then(result => {
      console.log(JSON.stringify(result))
      this.dispatchEvent(
        new ShowToastEvent({
          title: 'success',
          message: 'Order created successfully',
          variant: 'success'
        })
      )
      // })//.catch(error => {
      //   console.log(error);
      //   this.error = error;
      // });
      // this.CreateItemRecord(response.Id);
      this[NavigationMixin.Navigate]({
        type: 'standard__recordPage',
        attributes: {
          recordId: result.Id,
          objectApiName: 'Order__c', // objectApiName is optional
          actionName: 'view'
        }
      })
  
    }).catch(error => {
      console.log(error);
      this.error = error;
    });
  }
}