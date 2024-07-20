@isTest
public class PicklistFieldControllerTest {    
    static testMethod void getDependentOptionsImplTest(){
        
        PicklistFieldController controller = new PicklistFieldController();
        /*Map<String,List<String>> valueMap = controller.getDependentOptionsImpl('Account','ShippingCountryCode','ShippingStateCode');
        for(String contr : valueMap.keySet()){
            System.debug('CONTROLLING FIELD : ' + contr);
            System.debug('DEPENDENT VALUES ...  : ' + valueMap.get(contr));
        }*/
        
        Map<String,List<String>> valueMapOpp = controller.getDependentOptionsImpl('Account','Product_System_Area__c','Product_System_Area_Subcategory__c');
        for(String contr : valueMapOpp.keySet()){
            System.debug('CONTROLLING FIELD : ' + contr);
            System.debug('DEPENDENT VALUES ...  : ' + valueMapOpp.get(contr));
        }
    }

}