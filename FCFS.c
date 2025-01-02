#include<stdio.h>

int main() 
{ 
    int b[10], t[10], w[10]; 
    int n, i; 
    float avgw = 0, avgt = 0; 
    printf("Enter the number of processes:\t"); 
    scanf("%d", &n); 
    for(i = 0; i < n; i++) 
    { 
        printf("\n Enter the burst time of process %d:\t", i); 
        scanf("%d", &b[i]); 
    } 
    w[0] = 0; 
    for(i = 1; i < n; i++) 
    { 
        w[i] = w[i - 1] + b[i - 1]; 
    } 
    for(i = 0; i < n; i++) 
    { 
        t[i] = w[i] + b[i]; 
    } 
    for(i = 0; i < n; i++) 
    { 
        avgw += w[i]; 
        avgt += t[i]; 
    } 
    printf("Total waiting time = %f\n", avgw);
    avgw /= n; 
    printf("Average waiting time = %f\n", avgw);
    printf("Total turnaround time = %f\n", avgt);
    avgt /= n;
    printf("Average turnaround time = %f\n", avgt);
}
