({
	GetContacts : function(component) {
        
        const TEST = '1234';
        
        this.GetDefaultValue(component);
        let y = component.get("v.defaultString");
        console.log('Y',y);
        let x = JSON.parse(JSON.stringify(component.get('v.DefaultMode')));
        console.dir(x);
        console.log(x);
        console.log('TEST 123456--> ', TEST);
        
        
        
        
        
		console.log('GetContacts Called');
		var action = component.get('c.GetListContacts');
		action.setCallback(this, function(response){

			var state = response.getState();
         	if(component.isValid() && state == "SUCCESS"){
				component.set('v.Contacts', response.getReturnValue());
			}
		});
		$A.enqueueAction(action);
		
	},

	GetOneContact : function(component, event) {
		var appEvent = $A.get("e:SearchContact");
		appEvent.setParams({"ContactId":"00361000003TWRGAA4"});
		appEvent.fire();
	},
    
    GetDefaultValue : function(cmp) { 
        const HOME = 'Home';
       
        var Default_Value  = { 
            DEFAUTL_MODEL : {
                request : null, 
                formData : [{
                    paymentCount : 1,
                    intervalType : 'Month' 
                },
                {
                    paymentCount : 2,
                    intervalType : 'Year' 
                }]
            }
        }
        
        cmp.set('v.DefaultMode', Default_Value );
	}
    
})


/*
         * { DEFAUTL_MODEL : { 
                                                           request : null, 
                                                           formData : { 
                                                           paymentCount : 1,
                                                           intervalType : 'Month' }
                                                           }
                                                           }
        */