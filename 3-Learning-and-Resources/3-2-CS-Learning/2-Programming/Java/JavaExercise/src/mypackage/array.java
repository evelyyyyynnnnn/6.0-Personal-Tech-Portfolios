package mypackage;

import java.util.Arrays;

public class array {
	public static void main(String[] arguments) {// arguments是命令行参数，arguments[0],arguments[1]
	int[] values= {1,2,3,4,5};
	//System.out.println(values); 直接打印会输出其内存地址-哈希码
	System.out.println(Arrays.toString(values));
	
	int[] value3 = new int[5]; //长度为5，全是0
	int size=value3.length;
	System.out.println(Arrays.toString(value3));
	System.out.println(size);
	
	int [][] value= {{1,2,3},{4,5,6}};
	System.out.println(Arrays.deepToString(value));
	}
}

