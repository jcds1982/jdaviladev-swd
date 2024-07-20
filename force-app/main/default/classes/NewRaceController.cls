public with sharing class NewRaceController {
    
    @AuraEnabled
    public Static Race__c newRaceDB(Race__c race) {
        insert race;
        return race;
    }

}