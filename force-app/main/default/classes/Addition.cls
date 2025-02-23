public class Addition {
    public Integer a{get;set;}
    public Integer b{get;set;}
    public Integer result;
    public String operator{get;set;}
    
    public Addition(Integer a1, Integer b1) {
        this.a = a1;
        this.b = b1;
    }
    
    public Addition(){}
    
    public void add() {
        result = a+b;
        System.debug('Sum of integers is ' +result);
    }
    public void sub(){
        result = a-b;
        System.debug('Difference of two Integers is ' +result);
    }
    public void multiply() {
        result = a*b;
        System.debug('product of integers is ' +result);
    }
    public void division(){
        result = a/b;
        System.debug('Division of two Integers is ' +result);
    }
    
    
    
}