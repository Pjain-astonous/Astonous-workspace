public class twoSome {
    public static list<integer> twoSum(list<integer> nums, integer target) {
        Integer i;
        Integer j;
        list<integer> returnList = new  list<integer>();
        if(nums.size()>0)
        {
            
            
            for(j=0;j<nums.size();j++)
            {
                for(i =1 ; i<nums.size();i++)
                { 
                    
                    if(nums[j]+ nums[i]!=target)
                    {
                        
                         system.debug('i= '+i+'nums[i] ='+nums[i]);
                        system.debug('j= '+j+ 'nums[j] ='+nums[j]);
                        
                            
                            }  
                    
                    else
                    {
                      if(j==i)
                      {
                          system.debug('please process next');
                      }
                      else
                      {
                          returnList.add(j);
                          returnList.add(i);
                      }
                        
                    }
                    
                }
            }
        } 
        system.debug(returnList);
       
          return returnList;
        
        
    }
    
}