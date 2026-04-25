package mypackage;


public class NewLine {
    
    // Method to print an empty line
    public static void newLine() {
        System.out.println("");
    }

    // Method to print three empty lines
    public static void threeLines() {
        newLine();
        newLine();
        newLine();
    }

    // Main method: Entry point
    public static void main(String[] arguments) {
        System.out.println("Line 1");
        threeLines();
        System.out.println("Line 2");
    }
}