import java.util.*;
import java.io.*;

class rsa {
    
    static int mult(int x, int y, int n) {
        int k = 1;
        for (int j = 1; j <= y; j++) 
            k = (k * x) % n;
        return (int) k;
    }
    
    public static void main(String arg[]) throws Exception {
        Scanner s = new Scanner(System.in);
        InputStreamReader r = new InputStreamReader(System.in);
        BufferedReader br = new BufferedReader(r);
        
        String msg1;
        int pt[] = new int[100];
        int ct[] = new int[100];
        int a, b, n, d, e, Z, p, q, i;
        
        System.out.println("Enter prime numbers p and q:");
        p = s.nextInt();
        q = s.nextInt();
        
        n = p * q;
        Z = (p - 1) * (q - 1);
        
        System.out.println("\nSelect e value:");
        e = s.nextInt();
        
        System.out.print("Enter message: ");
        msg1 = br.readLine();
        char msg[] = msg1.toCharArray();
        
        for (i = 0; i < msg.length; i++)
            pt[i] = msg[i];
        
        for (d = 1; d < Z; ++d)
            if (((e * d) % Z) == 1)
                break;
        
        System.out.println("p = " + p + "\tq = " + q + "\tn = " + n + "\tz = " + Z + "\te = " + e + "\td = " + d);
        
        System.out.println("\nCipher Text = ");
        for (i = 0; i < msg.length; i++)
            ct[i] = mult(pt[i], e, n);
        
        for (i = 0; i < msg.length; i++)
            System.out.print("\t" + ct[i]);
        
        System.out.println("\nPlain Text = ");
        for (i = 0; i < msg.length; i++)
            pt[i] = mult(ct[i], d, n);
        
        for (i = 0; i < msg.length; i++)
            System.out.print((char) pt[i]);
    }
}
