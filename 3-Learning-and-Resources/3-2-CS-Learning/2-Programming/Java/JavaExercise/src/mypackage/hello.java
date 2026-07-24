package mypackage;

public class hello {
	public static void main(String[]arguments) { //void means no return value
		System.out.println("Hello World");//data type:boolean;int;double;String
		System.out.println("Hello World2");
		System.out.println("Number of arguments: " + arguments.length);
		// Check if any arguments are passed
        if (arguments.length == 0) {
            System.out.println("No arguments provided.");
        } else {
            System.out.println("Number of arguments: " + arguments.length);
            
            // Loop through the arguments array and print each argument
            for (int i = 0; i < arguments.length; i++) {
                System.out.println("Argument " + i + ": " + arguments[i]);
            }
        }
	}
}


