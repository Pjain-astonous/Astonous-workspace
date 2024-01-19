@isTest
public class TestUpdateItemQuantity {
 @testSetup 
    public static void setup() {
     TestDataFactory.createItem(8,true);
     TestDataFactory.createItem(2,false);
 }
    @istest 
    public static void testQuantityIncreaaseWithPerameter()
    {
        Test.startTest();
       UpdateItemQuantity updatequantity = new UpdateItemQuantity(20);
         Id batchId = Database.executeBatch(updatequantity);
        Test.stopTest();
        Integer CountInventoryItem = [SELECT Count() FROM Item__c WHERE Quantity__c=30 ];
        system.assertEquals(10,CountInventoryItem);
        
    }
    @istest
    public static void testQuantityIncreaaseByDefault()
    {
        Test.startTest();
       UpdateItemQuantity updatequantity = new UpdateItemQuantity(0);
         Id batchId = Database.executeBatch(updatequantity);
        Test.stopTest();
        Integer CountInventoryItem = [SELECT Count() FROM Item__c WHERE Quantity__c=20 ];
        system.assertEquals(10,CountInventoryItem);
        
    }
    
}