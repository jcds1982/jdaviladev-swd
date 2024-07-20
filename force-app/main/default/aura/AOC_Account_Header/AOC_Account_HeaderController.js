/**
 * Created by julioda on 3/20/18.
 */
({

    getAlert: function(cmp, event, helper){
        var textEntered = cmp.get("v.Opp.AccountId")

        var action = cmp.get("c.GetAccounts")

        action.setParams({nameP : textEntered });




        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS")
                console.log(response.getReturnValue());
                //alert('This is the response ' + response.getReturnValue() );
                //alert('This is the response ' + JSON.stringify(response.getReturnValue()) );
            else
                alert(response.getError());

        });

        $A.enqueueAction(action);



    }



})