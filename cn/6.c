#include <stdio.h>
#include <limits.h>

#define MAX 10

int bestCost = INT_MAX;
int bestPath[MAX + 1];

void tsp(int graph[][MAX], int pos, int visited[], int currCost, int start, int V, int currPath[], int level) {
	if (level == V) {
		int totalCost = currCost + graph[pos][start];
		if (totalCost < bestCost) {
			bestCost = totalCost;
			for (int i = 0; i < V; i++) {
				bestPath[i] = currPath[i];
			}
			bestPath[V] = start;
		}
		return;
	}

	for (int city = 0; city < V; city++) {
		if (!visited[city]) {
			visited[city] = 1;
			currPath[level] = city;
			tsp(graph, city, visited, currCost + graph[pos][city], start, V, currPath, level + 1);
			visited[city] = 0;
		}
	}
}

int main() {
	int V;
	printf("Enter the number of cities: ");
	scanf("%d", &V);

	if (V > MAX) {
		printf("Number of cities exceeds the maximum limit of %d\n", MAX);
		return 1;
	}

	int graph[MAX][MAX];

	printf("Enter the distances between the cities in matrix form:\n");
	for (int i = 0; i < V; i++) {
		for (int j = 0; j < V; j++) {
			printf("Distance from city %d to city %d: ", i + 1, j + 1);
			scanf("%d", &graph[i][j]);
		}
	}

	int start = 0;
	int visited[MAX] = {0};
	visited[start] = 1;

	int currPath[MAX + 1];
	currPath[0] = start;

	tsp(graph, start, visited, 0, start, V, currPath, 1);

	printf("\nThe minimum cost of the TSP is: %d\n", bestCost);
	printf("The path taken is: ");
	for (int i = 0; i <= V; i++) {
		printf("%d ", bestPath[i] + 1);
	}
	printf("\n");

	return 0;
}
