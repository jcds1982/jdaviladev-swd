/**
 * Created by julioda on 2/5/19.
 */
({
    ChangeStage : function(cmp, event){

        var MoveNext = (event.getSource().get("v.value") == 'Next');
        var currentStage  = cmp.get('v.currentStep');

        if(MoveNext)
            currentStage = Number(currentStage)+1;
        else
            currentStage = Number(currentStage)-1;

        currentStage = currentStage.toString();
        cmp.set('v.currentStep', currentStage);
    },

    doSomething : function (cmp) {
        alert('Execute Method --> Do Something here!');
    }
})