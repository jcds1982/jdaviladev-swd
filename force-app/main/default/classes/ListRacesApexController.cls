public with sharing class ListRacesApexController {
    
    @AuraEnabled
    public static List<Race__c> getRacesDB()
    {
        return [SELECT Id, Name, Type__c, DateTime__c, Attended__c, Results__c FROM Race__c];
    }

}