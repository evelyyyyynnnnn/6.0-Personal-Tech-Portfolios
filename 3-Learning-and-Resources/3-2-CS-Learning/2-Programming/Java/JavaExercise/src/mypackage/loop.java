package mypackage;

public class loop {
	public static void main(String[] arguments) {
//		int i=0;
//		while (i<3) {
//			System.out.println("Rule #"+ i);
//			i+=1;
		for (int i=0;i<3;i++) {
			if (i==2) {
				break;
//              continue;
			}
			System.out.println("Rule #" +i);
		}
	}

}
