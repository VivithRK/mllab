#include <stdio.h>
#include <conio.h>
#include <string.h>

void main() {
    char pt[50], ct[50], dt[50];
    int key, len, i;
    
    printf("Enter message to be encrypted: ");
    scanf("%s", pt);
    
    len = strlen(pt);
    
    printf("\nEnter Key: ");
    scanf("%d", &key);
    
    if (key > 26) {
        printf("\nInvalid key. Please enter valid key.\n");
    }
    
    for (i = 0; i < len; i++) {
        ct[i] = pt[i] + key;
        if (ct[i] > 122)
            ct[i] = ct[i] - 26;
    }
    ct[i] = '\0';
    
    printf("\nEncrypted message is: %s", ct);
    
    for (i = 0; i < len; i++) {
        dt[i] = ct[i] - key;
        if (dt[i] < 97)
            dt[i] = dt[i] + 26;
    }
    dt[i] = '\0';
    
    printf("\n\nDecrypted message is: %s", dt);

}
