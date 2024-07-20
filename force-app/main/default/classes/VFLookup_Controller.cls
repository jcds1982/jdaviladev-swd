public with sharing class VFLookup_Controller {

    public List<Contact> conts {get;set;}
    public Contact cont1 {get;set;}

    public VFLookup_Controller() {
        conts = new List<Contact>();
        cont1 = new Contact();
        conts.addAll(GetContacts('a'));
    }

    public Pagereference UpdateContactList(){
        conts = new List<Contact>();
        String contName = Apexpages.currentPage().getParameters().get('contName');
        List<Contact> Contacts = GetContacts(contName);
        conts = new List<Contact>();
        conts.addAll(Contacts);
        return null;
    }

    public List<Contact> GetContacts(String contName){
        contName = '%' + contName + '%';
        return [SELECT Id, FirstName, LastName, Account.Name FROM Contact WHERE Name like :contName ORDER BY FirstName asc limit 40 ];
    }
}