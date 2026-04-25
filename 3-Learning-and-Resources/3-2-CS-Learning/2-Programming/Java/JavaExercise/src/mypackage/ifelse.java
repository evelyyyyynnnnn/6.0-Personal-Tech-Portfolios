package mypackage;

public class ifelse {
	public static void test(int x)
	{
		if (x>5) {
			System.out.println(x+" is >5");
		}else {
			System.out.println(x+" isn't >5");
		}//else if {}
	}
	public static void main(String[] arguments) {
		test(6);
		test(5);
		test(4);
	}
}

// && is and; || is or;
// String five=Integer.toString(5); 
// int foo= Integer.parseInt("18");
// int foo= (int)19.8


//Good Programming Style:
// (1) name: double b --is bad;string first name- is good;
// (2) Identation:锁进
// (3) Put whitespace in complicated expression
// (4) don't duplicate tests