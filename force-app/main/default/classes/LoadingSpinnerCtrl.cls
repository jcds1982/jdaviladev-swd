/**
 * Created by JulioDavila on 3/21/18.
 */

public with sharing class LoadingSpinnerCtrl {

    public void spin() {
        long now = datetime.now().gettime();
        while(datetime.now().gettime()-now<500); // Busy loop for 5000 ms
    }

}