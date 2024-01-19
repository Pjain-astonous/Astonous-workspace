public class removeDuplicatesArray {
    public static integer removeDuplicates(list<integer> nums) {
        integer i = 0;
        integer index=1; 
        for(i = 1; i<nums.size();i++)
        {
            if(nums[i]!=nums[i-1])
            {
                nums[index]=nums[i];
               
                index++;
                system.debug(nums);
            }
            
        }
        System.debug(index);
        system.debug(nums.size());
         return index;
        
    }

}