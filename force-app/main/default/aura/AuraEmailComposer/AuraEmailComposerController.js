/**
 * Created by julioda on 11/1/19.
 */

({
    init: function(cmp, event, helper) {
        helper.GetInitialInformation(cmp, event);
    },

    SendEmailFromComposer: function (cmp, event, helper) {
        console.log('Entered send out email');
        helper.SendOutEmail(cmp, event);
    },

    FlipCard: function (cmp, event, helper) {
        alert('Flipping Card');
    }

});