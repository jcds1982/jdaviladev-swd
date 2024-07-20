public with sharing class CustomComboBoxController {
  @AuraEnabled(cacheable=true)
  public static List<picklistValues> getAccountStatuses() {
    List<picklistValues> picklistValues = new List<picklistValues>();
    Schema.DescribeFieldResult accountStatusPicklist = Account.Status__c.getDescribe();
    for (
      Schema.PicklistEntry status : accountStatusPicklist.getPicklistValues()
    ) {
      picklistValues currentValues = new picklistValues(
        status.getLabel(),
        status.getValue()
      );
      picklistValues.add(currentValues);
    }
    return picklistValues;
  }

  public class picklistValues {
    @AuraEnabled
    public String label;
    @AuraEnabled
    public String value;

    public picklistValues(String newLabel, String newValue) {
      this.label = newLabel;
      this.value = newValue;
    }
  }
}