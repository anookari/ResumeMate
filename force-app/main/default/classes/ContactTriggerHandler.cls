public class ContactTriggerHandler {
    public static void updatePhone(List<Contact> newList){
        List<Contact> contactList = new List<Contact>();
        Contact c1 = new Contact();
        for(Contact c: newList){
            c1 = new Contact();
            c1.Id= c.Id;
            if(c.HomePhone != null){
                c1.Phone = c.HomePhone;
                contactList.add(c1);
            }
        }
        update contactList;
    }
}