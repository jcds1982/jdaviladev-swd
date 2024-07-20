import { LightningElement, track, wire } from 'lwc';
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity';
import OppName from '@salesforce/schema/Opportunity.Name';
import OppStage from '@salesforce/schema/Opportunity.StageName';
import OppCloseDate from '@salesforce/schema/Opportunity.CloseDate';
import getOpportunities from '@salesforce/apex/OppManagerController.getOpportunities';


export default class OppManagerCEForm extends LightningElement {

    //@track
    inputValue = 'Test Julio';

    //@track 
    opps;
    @wire(getOpportunities) Opportunities;
    opportunityObject = OPPORTUNITY_OBJECT;
    opportunityFields = [OppName, OppStage, OppCloseDate];

    OpportunityCreated(opportunityObject){
        alert('Opportunity was created ', opportunityObject);
    }

    promptMessage(event){
        console.log('Input value is ', this.inputValue);
        alert('Input value ' + this.inputValue);
    }

    updateValue(e){
        let iValue = e.target.value;
        this.inputValue = iValue;
    }

    GetOpportunitiesFromApex(){
        getOpportunities().then( result => {
            this.opps = result;

            this.inputValue = 'Julio changed the value when he clicked the button';

            // eslint-disable-next-line no-console
            console.log('InputValue --> ', this.inputValue);

            // ! This is a test and needs to be remove after the testing

           
        }).catch( error => {
            this.error = error;
        })
    }

}