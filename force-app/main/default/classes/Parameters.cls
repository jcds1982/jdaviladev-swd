public class Parameters {
    public Integer X { get; set; }
    public Integer X2 { get; set; }
    public string txt {get;set;}
    public String name {get; set;}
    
    public Parameters() {
        X = 0;
        X2 = 0;
    }
    public PageReference TestX() {
        String strX = ApexPages.currentPage().getParameters().get('X');
        if (strX != null) {
            X = Integer.ValueOf(strX);
            txt = String.ValueOf(X);
        }
        return null;
    }
    public PageReference TestX2() {
        return null;
    }
    
    public void collectName(){
        system.debug('Name --> ' + name);
    }
}