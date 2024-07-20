({
	getTodayDay : function(component) {
        
        /*
        var d = new Date();
        alert(d.getDate());
        component.set("v.DayOfTheWeek", d.getDate());
		*/
        var todayDay = $A.get("$Locale.labelForToday");
        alert("today is " + todayDay);
        
		//return d.getDate();
	}
})