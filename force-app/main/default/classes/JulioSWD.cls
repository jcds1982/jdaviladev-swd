public with sharing class JulioSWD {
	public JulioSWD() {

		Account rd_acc = [select id, name From Account limit 1];

		System.debug('Account Name ' + rd_acc.Name);



	}
}