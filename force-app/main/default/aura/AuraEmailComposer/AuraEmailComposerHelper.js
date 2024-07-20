/**
 * Created by julioda on 11/1/19.
 */

({
    GetInitialInformation : function(cmp, event){
    console.log('ENTERED HELPER');
    let action = cmp.get("c.getEmailTemplates");
    action.setCallback(this, function(response){


        var state = response.getState();
        if(state === "SUCCESS"){
            let emailTemplates = response.getReturnValue();
            console.log('emailtemplates', emailTemplates);
            cmp.set("v.ecContacts");

        }else{
            console.log('Oooops something happened');
        }

        });

    $A.enqueueAction(action);

    },

    SendOutEmail : function (cmp, event) {

        //alert('Sending out email');

        let eBody = cmp.get("v.ecBody");
        let toAddress = 'jcds1982@gmail.com';
        let subject = 'test Email';
        let action = cmp.get("c.SendEmail");
        let ccAddresses = [];
        let bccAddresses = [];
        let att = []
        action.setParams({
            'attachment': att,
            'toAddresses': toAddress,
            'bccAddresses': bccAddresses,
            'ccAddresses': ccAddresses,
            'body' : eBody,
            'subject' : subject
        });
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                console.log('state ', state);
                //let storeResponse = response.getReturnValue();
                //console.log(storeResponse);
                // if state of server response is comes "SUCCESS",
                // display the success message box by set mailStatus attribute to true
                //component.set("v.mailStatus", true);
            }

        });
        $A.enqueueAction(action);
    },



});