#include <stdio.h>

#define BUCKET_SIZE 10
#define OUTPUT_RATE 4

int main() {
    int n, i;
    int bucket_content = 0;

    printf("Enter the number of packets: ");
    scanf("%d", &n);

    int input_packets[n];
    for (i = 0; i < n; i++) {
        printf("Enter the size of packet %d: ", i + 1);
        scanf("%d", &input_packets[i]);
    }

    for (i = 0; i < n; i++) {
        printf("\nPacket %d with size %d arrived.\n", i + 1, input_packets[i]);

        if (input_packets[i] <= (BUCKET_SIZE - bucket_content)) {
            bucket_content += input_packets[i];
            printf("Bucket content: %d out of %d\n", bucket_content, BUCKET_SIZE);
        } else {
            printf("Bucket overflow! Packet %d of size %d is discarded.\n", i + 1, input_packets[i]);
        }

        if (bucket_content > OUTPUT_RATE) {
            bucket_content -= OUTPUT_RATE;
        } else {
            bucket_content = 0;
        }
        printf("After sending packets, bucket content: %d out of %d\n", bucket_content, BUCKET_SIZE);
    }

    while (bucket_content > 0) {
        printf("\nSending remaining packets...\n");
        if (bucket_content > OUTPUT_RATE) {
            bucket_content -= OUTPUT_RATE;
        } else {
            bucket_content = 0;
        }
        printf("Bucket content: %d out of %d\n", bucket_content, BUCKET_SIZE);
    }

    return 0;
}
