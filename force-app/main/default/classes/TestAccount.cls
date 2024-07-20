public class TestAccount
{

	public TestAccount()
	{
		system.debug('test -->');
	}
    // System.debug('--> Test');

    public Account CreateAccount()
    {
    	Account a 	= new Account();
    	a.Name 	 	= 'Test Name';
    	insert a;
    	return null;
    	//system test
    }
     
}