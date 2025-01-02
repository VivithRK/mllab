#include<stdio.h>
#include<unistd.h>
int main()
{
    int x, ch;
    char cmd[20];
    int pid = fork();
    if(pid == 0)
    {
         printf("\n Child process");
         do
         {
            printf("\n Enter the command:");
            scanf("%s", &cmd);
            system(cmd);
            printf("\n Enter 1 to continue or 0 to exit:");
            scanf("%d", &ch);
         }
         while(ch != 0);
     }
     else
        wait();
}
