#include <stdio.h>

int power(int a, int b, int P) {
    int result = 1;
    for (int i = 0; i < b; i++) {
        result = (result * a) % P;
    }
    return result;
}

int main() {
    int P, G, x, a, y, b, ka, kb;

    P = 23;
    printf("The value of P (a prime number): %d\n", P);

    G = 9;
    printf("The value of G: %d\n", G);

    a = 4;
    printf("The private key a for Alice: %d\n", a);

    x = power(G, a, P);

    b = 3;
    printf("The private key b for Bob: %d\n", b);

    y = power(G, b, P);

    ka = power(y, a, P);
    kb = power(x, b, P);

    printf("Secret key for the Alice is: %d\n", ka);
    printf("Secret key for the Bob is: %d\n", kb);

    return 0;
}
