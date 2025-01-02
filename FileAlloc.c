#include<stdio.h>
#include <stdlib.h>
int main()
{
	int f[50],p,i,j,k,a,st,len,n,c;
	for(i=0; i<50; i++)
		f[i]=0;
	printf("Enter the blocks already allocated:\n");
	scanf("%d",&p);
	printf("\nEnter the block numbers:\n");
	for(i=0; i<p; i++)
	{
		scanf("%d",&a);
		f[a]=1;
	}

	do 
	{
		printf("Enter index starting block and length:\n");
		scanf("%d%d",&st,&len);
		k=len;
		if(f[st]==0)
		{
			for(j=st; j<(k+st); j++)
			{
				if(f[j]==0)
				{
					f[j]=1;
					printf("\n%d->%d",j,f[j]);
				}
				else
				{
					printf("\n %d->file is already allocated",j);
					k++;
				}
			}
		}
		printf("\nIf you want enter one more time (yes-1/no-0)");
		scanf("%d",&c);
	} while(c==1);
	return 0;

}