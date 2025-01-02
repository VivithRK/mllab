#include<stdio.h>

int main() 
{ 
    int p[10], b[10], w[10], t[10], i, n, j, temp, temp1; 
    float awt = 0, att = 0; 
    
    printf("Enter the number of processes:\t"); 
    scanf("%d", &n); 
    
    for(i = 0; i < n; i++) 
    { 
        printf("Enter the burst time of process %d:\t", i); 
        scanf("%d", &b[i]); 
        p[i] = i;
    }
    
    for(i = 0; i < n; i++) 
    { 
        for(j = i + 1; j < n; j++) 
        { 
            if(b[i] > b[j]) 
            { 
                temp = b[i]; 
                temp1 = p[i]; 
                b[i] = b[j]; 
                p[i] = p[j]; 
                b[j] = temp; 
                p[j] = temp1; 
            } 
        } 
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
        awt += w[i]; 
        att += t[i]; 
    }
    
    printf("\n\t Processes \t Waiting Time \t Turnaround Time\n"); 
    for(i = 0; i < n; i++) 
    { 
        printf("\t P%d \t\t %d \t\t\t %d\n", p[i], w[i], t[i]); 
    } 
    
    printf("Total waiting time = %f\n", awt);
    awt /= n; 
    printf("Average waiting time = %f\n", awt);
    
    printf("Total turnaround time = %f\n", att);
    att /= n;
    printf("Average turnaround time = %f\n", att);
}
