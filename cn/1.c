#include <stdio.h>
#include <string.h>
#include <stdlib.h>

char data[100], concatdata[117], src_crc[17], dest_crc[17], frame[120], divident[18];
char divisor[18];
char res[17] = "0000000000000000";

void crc_cal(int node) {
    int i, j;
    for (j = 17; j <= strlen(concatdata); j++) {
        if (divident[0] == '1') {
            for (i = 1; i <= 16; i++)
                divident[i - 1] = (divident[i] != divisor[i]) ? '1' : '0';
        } else {
            for (i = 1; i <= 16; i++)
                divident[i - 1] = divident[i];
        }
        divident[i - 1] = (node == 0) ? concatdata[j] : frame[j];
    }
    divident[i] = '\0';
    printf("\nCRC is %s\n", divident);
    if (node == 0) {
        strcpy(src_crc, divident);
    } else {
        strcpy(dest_crc, divident);
    }
}

int main() {
    int i;
    printf("Enter the generator bits: ");
    gets(divisor);
    if (strlen(divisor) != 17) {
        printf("Please enter the generator length of exactly 17 bits.\n");
        exit(0);
    }
    printf("\nAt Source Node:\nEnter the message to be sent: ");
    gets(data);
    strcpy(concatdata, data);
    strcat(concatdata, "0000000000000000");
    for (i = 0; i <= 16; i++)
        divident[i] = concatdata[i];
    divident[i] = '\0';
    crc_cal(0);
    printf("\nData is: ");
    puts(data);
    printf("\nThe frame transmitted is:\n%s%s", data, src_crc);
    printf("\n\t\tSource node transmitted the frame---->");

    printf("\n\n\nAt Destination Node\nEnter the received frame: ");
    gets(frame);
    for (i = 0; i <= 16; i++)
        divident[i] = frame[i];
    divident[i] = '\0';
    crc_cal(1);
    if (strcmp(dest_crc, res) == 0) {
        printf("\nReceived frame is error-free.\n");
    } else {
        printf("\nReceived frame contains one or more errors.\n");
    }
    return 0;
}
