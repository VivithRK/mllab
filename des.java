import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.util.Base64;

class Main {

    Cipher ecipher;
    Cipher dcipher;

    Main(SecretKey key) throws Exception {
        ecipher = Cipher.getInstance("DES");
        dcipher = Cipher.getInstance("DES");
        ecipher.init(Cipher.ENCRYPT_MODE, key);
        dcipher.init(Cipher.DECRYPT_MODE, key);
    }

    public String encrypt(String str) throws Exception {
        // Encode the string into bytes using UTF-8
        byte[] utf8 = str.getBytes("UTF8");

        // Encrypt
        byte[] enc = ecipher.doFinal(utf8);

        // Encode bytes to base64 to get a string
        return Base64.getEncoder().encodeToString(enc);
    }

    public String decrypt(String str) throws Exception {
        // Decode base64 to get bytes
        byte[] dec = Base64.getDecoder().decode(str);

        // Decrypt
        byte[] utf8 = dcipher.doFinal(dec);

        // Decode using UTF-8
        return new String(utf8, "UTF8");
    }

    public static void main(String[] args) throws Exception {
        final String secretText = "www.reva.edu.in";
        System.out.println("SecretText: " + secretText);

        SecretKey key = KeyGenerator.getInstance("DES").generateKey();
        Main encrypter = new Main(key);

        String encrypted = encrypter.encrypt(secretText);
        System.out.println("Encrypted Value: " + encrypted);

        String decrypted = encrypter.decrypt(encrypted);
        System.out.println("Decrypted: " + decrypted);
    }
}
