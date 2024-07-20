public with sharing class OppManagerController {

    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getOpportunities(){
        return [SELECT Id, Name, StageName FROM Opportunity limit 20 ];
    }
}