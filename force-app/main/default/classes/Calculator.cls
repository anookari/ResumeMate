public class Calculator {
    public static void calculate(Integer a, Integer b, String operator){
        if(operator == '+'){
            add(a, b);
        }
        else if(operator == '-'){
            sub(a,b);
        }
        else if(operator == '*'){
            multiply(a,b);
        }
        else if(operator == '/'){
            divide(a,b);
        }
    }
    
    public static void add(Integer a, Integer b){
        System.debug('The sum of numbers is '+ (a+b) );
    }
    public static void sub(Integer a, Integer b){
        System.debug('The difference between numbers is '+ (a-b) );
    }
    public static void multiply(Integer a, Integer b){
        System.debug('The product of numbers is '+ (a*b) );
    }
    public static void divide(Integer a, Integer b){
        System.debug('The division of numbers is '+ (a/b) );
    }
    
    public static void testing(){
        Addition adder = new Addition(20,30);
        adder.add();
        adder.sub();
        adder.multiply();
        adder.division();
    }
}