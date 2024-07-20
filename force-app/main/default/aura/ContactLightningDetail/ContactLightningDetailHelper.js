({
	getContactDetail : function(component, event) {

		var action = component.get('c.GetContactDetail');

		//Set Parameters
		action.setParams({"Id": component.get("v.ContactId")});

		action.setCallback(this, function(response){
			var state = response.getState();

			if(component.isValid() && state === "SUCCESS")
				component.set('v.Contact', response.getReturnValue());
			
		});
		$A.enqueueAction(action);
	}
})