/**
 * Created by julioda on 10/30/19.
 */

public with sharing class JuliusRichText_Controller {

    public string emailTemplate {set;get;}

    public JuliusRichText_Controller(){
    }

    public PageReference GetEmailInformation(){

        for(emailTemplate tempET : [SELECT Id, Name, Body, HtmlValue FROM EmailTemplate WHERE Name = 'test html 2']){

            emailTemplate = tempET.HtmlValue;
        }

        system.debug('emailTemplate ' + emailTemplate);

        return null;
    }

}