({
	doInit : function(component, event, helper) {

		helper.getContactDetail(component, event);
	},

	writeMessage : function (cmp, ev, hlp){

		var id = ev.getParam("ContactId");

		cmp.set("v.ContactId", id);
		
		
		
		console.log('Event Fired ' + id);
		hlp.getContactDetail(cmp, ev);

	}
})