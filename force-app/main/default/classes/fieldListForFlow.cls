public with sharing class fieldListForFlow {
  @AuraEnabled(cacheable=true)
  public static List<String> getFields() {
    String SobjectApiName = 'Account';
    List<String> fields = new List<String>();
    Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
    Map<String, Schema.SObjectField> fieldMap = schemaMap.get(SobjectApiName)
      .getDescribe()
      .fields.getMap();
    for (SObjectField field : fieldMap.values()) {
      DescribeFieldresult fieldDesc = field.getDescribe();
      ObjectFields ofs = new ObjectFields(
        fieldDesc.getLabel(),
        fieldDesc.getName()
      );
      fields.add(JSON.serialize(ofs));
    }
    return fields;
  }

  public class ObjectFields {
    public String label { get; set; }
    public String apiName { get; set; }

    public ObjectFields(string label, string apiName) {
      this.label = label;
      this.apiName = apiName;
    }
  }
}