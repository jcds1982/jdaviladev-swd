({
    
	doInit : function(component, event, helper) {
        helper.GetDefaultValue(component);

		helper.GetContacts(component);
	},

	showMessage : function(component, event){
		var selectedItem = event.currentTarget;
		var email = selectedItem.dataset.email;
		console.log(email);
		//alert(email);
	},

	showOtherMessage : function(component, event){
		var target = event.getSource(); 
		var txtVal = target.get("v.title");
		console.log(txtVal);
		//alert(email);
	},

	// getContactInfo : function(component, event, helper){
	// 	helper.GetOneContact(component, event);
	// },

	getContactInfo : function(component, event) {


		var selectedItem = event.currentTarget;
		var id = selectedItem.dataset.contacid;

		var appEvent = $A.get("e.c:SearchContact");
		
		console.log(id);

		//var id = event.getSource().get("v.class");
		//var gloId = event.getSource().getGlobalId();
		//id = id.get("v.value");
		//id = id.getLocalId();
		//gloId = "00361000003TWRGAA4"

		appEvent.setParam("ContactId", id ); //"00361000003TWRGAA4");
		appEvent.fire();
		document.getElementById("newClientSectionId").style.display = "flex";
        //showToastMessage();
        
        
    },
    
    showModal : function(component, event, helper) {
    
        document.getElementById("newClientSectionId").style.display = "flex";
    
    },
    
    hideModal : function(component,event, helper){
    
       document.getElementById("newClientSectionId").style.display = "none" ;
   },
    
    showToastMessage : function (component, event){
        
        var toastEvent = $A.get("e.force:showToast");
    	toastEvent.setParams({
        mode: 'sticky',
        message: 'This is a required message',
        messageTemplate: 'Record {0} created! See it {1}!',
        messageTemplateData: ['Salesforce', {
            url: 'http://www.salesforce.com/',
            label: 'here',
            }
        ]
    });
        console.log(toastEvent);
    toastEvent.fire();
        
    }


})