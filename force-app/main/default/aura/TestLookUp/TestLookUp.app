<!--
 - Created by julioda on 5/24/18.
 -->

<aura:application extends="force:slds">
    <!-- Create attribute to store lookup value as a sObject-->
    <aura:attribute name="selectedLookUpRecord" type="sObject" default="{}"/>
    
    
    <div class="slds-grid slds-gutters">
        <div class="slds-size_1-of-4 slds-text-align_left slds-p-left_small slds-p-top_small">
    		<c:customLookup objectAPIName="Opportunity" IconName="" selectedRecord="{!v.selectedLookUpRecord}" label=""/>
        </div>
    </div>
    <!-- here c: is org. namespace prefix-->
</aura:application>