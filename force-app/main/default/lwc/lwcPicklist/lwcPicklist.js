import { LightningElement } from 'lwc';
import lightningCombo from './lightningCombo.html';
export default class LwcPicklist extends LightningElement {

    static customTypes = {
        picklist: {
            template:lightningCombo,
            standardCellLayout: true,
            typeAttributes: ['label','value','options'],
            
        }
        
    }
    
}