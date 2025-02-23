/**
* @File Name : ContactUsController.cls
* @Description :
* @Author :
* @Last Modified By :
* @Last Modified On : February 5, 2025
* @Modification Log :
*==============================================================================
* Ver | Date | Author | Modification
*==============================================================================
* 1.0 | February 5, 2025 |   | Initial Version
**/

public class ContactUsController {
	@AuraEnabled
	public static Map<String, Object> submitContactUs(String firstName, String lastName, String email, String companyName, String mobilePhone, String phone, String subject, String message){
		Map<String, Object> result = new Map<String, Object>();
        // Debugging: Check input values
        System.debug('firstName: ' + firstName);
        System.debug('lastName: ' + lastName);
        System.debug('email: ' + email);
        System.debug('companyName: ' + companyName);
        System.debug('mobilePhone: ' + mobilePhone);
        System.debug('phone: ' + phone);
        System.debug('subject: ' + subject);
        System.debug('message: ' + message);
        try {
            // Create a new Lead
            Lead newLead = new Lead(
                FirstName = firstName,
                LastName = lastName,
                Email = email,
                Company = companyName,
				MobilePhone = mobilePhone,
                Phone = phone,
                Status = 'Open', 
                Description = message
            );

            insert newLead;
            
            // Create a Task associated with the Lead
            Task newTask = new Task(
                Subject = subject,
				Description = message,
                WhoId = newLead.Id, 
                ActivityDate = System.today().addDays(1), 
                Status = 'Not Started',
                Priority = 'Normal' 
            );

            insert newTask;

            result.put('success', true);
            result.put('errorMessage', null);
        } catch (Exception e) {
            result.put('success', false);
            result.put('errorMessage', 'Error while processing the request: ' + e.getMessage());
        }
        
        return result;
	}
}