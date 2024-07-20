// /**
//  * Created by julioda on 11/7/18.
//  */
({
    allowDrop : function(event){
        event.preventDefault();
    },

    drag : function(component, event){
        //var evenFire = event.getSource().target.Id;
        //console.log("evenFire --> "+ evenFire );
        console.log("evenFire --> "+ event.getSource().getLocalId());

        var dragEv = event.target.dataset.dragId;
        component.set("v.dragId", event.target.dataset.dragId);
        console.log('dragEv --> ' + dragEv);

       //var e =  event.dataTransfer.setData("text", event.target.id);
       //console.log("e --> "+ event.dataTransfer.setData("text", event.target.id));

    },

    drop : function(event){
        //event.preventDefault();
        var dragId = component.get("v.dragid");
        var data = event.dataTransfer.getData("text");
        event.target.appendChild(document.getElementById(data));


        // var dragId = component.get("v.dragid"),
        //     values = component.get("v.values"),
        //     temp;
        // temp = values[dragId];
        // values[dragId] = values[event.target.dataset.dragId];
        // values[event.target.dataset.dragId] = temp;
        // component.set("v.values", values);
        // event.preventDefault();


    },
    cancel: function(component, event, helper) {
        event.preventDefault();
    }

})

// ({
//     doInit: function(component, event, helper) {
//         var values = "a b c d e".split(' ');
//         component.set("v.values", values);
//     },
//     dragstart: function(component, event, helper) {
//         var d = event.target.dataset.dragId;
//
//         component.set("v.dragid", event.target.dataset.dragId);
//         console.log("d --> " + d);
//     },
//     drop: function(component, event, helper) {
//         var dragId = component.get("v.dragid"),
//             values = component.get("v.values"),
//             temp;
//         temp = values[dragId];
//         values[dragId] = values[event.target.dataset.dragId];
//         values[event.target.dataset.dragId] = temp;
//         component.set("v.values", values);
//         event.preventDefault();
//     },
//     cancel: function(component, event, helper) {
//         event.preventDefault();
//     }
// })