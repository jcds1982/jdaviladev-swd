public with sharing class DynComp_Controller {

	public string name 		{get;set;}

//

	public DynComp_Controller(ApexPages.StandardController controller) {

		system.debug('Init');
		name = 'test';
	}

	public Component.Apex.Pageblock getCreateDynCmp()
	{
		/** PageBlock **/
		Component.Apex.PageBlock pgBlk  = new Component.Apex.PageBlock();

		/* PageBlock Section*/ //
		Component.Apex.PageBlockSection pbBlkSctn = new Component.Apex.PageBlockSection(title='Dyname Section');

		/*PageBlock Section Item*/
		Component.Apex.PageblockSectionItem pbBlkSctItem = new Component.Apex.PageblockSectionItem();

		/** Input field **/
		Component.Apex.InputText inptFld = new Component.Apex.InputText();
		//inptFld.expressions.id='{!$User.FirstName}';
		inptFld.expressions.value = '{!name}';
		//inptFld.expressions.label = 'Test field';

		/** Assign Input field to pageblocksectionItem **/
		pbBlkSctItem.childComponents.add(inptFld);
		/*Assign PageBlock Section Item to PageBlock Section*/
		pbBlkSctn.childComponents.add(pbBlkSctItem);

		/* Assign Pageblock Section to Pageblock */
		pgBlk.childComponents.add(pbBlkSctn);

		return pgBlk;
	}
}