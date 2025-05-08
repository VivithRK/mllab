import multiprocessing
from collections import defaultdict

# Mapper: counts word frequencies in a text chunk
def map_task(chunk, results, progress, total_chunks):
    word_counts = defaultdict(int)
    for line in chunk:
        for word in line.strip().split():
            word_counts[word] += 1
    results.append(word_counts)
    progress['completed'] += 1
    print_progress(progress['completed'], total_chunks)

# Print progress percentage
def print_progress(completed, total):
    percent = (completed / total) * 100
    print(f"\rProgress: {percent:.2f}%", end="")

# Reducer: aggregates counts from all mappers
def reduce_task(results):
    final_counts = defaultdict(int)
    for result in results:
        for word, count in result.items():
            final_counts[word] += count
    print("\n\nFinal Word Counts:")
    for word, count in final_counts.items():
        print(f"{word}: {count}")

# Read file content
def read_file(file_path):
    with open(file_path, 'r') as file:
        return file.readlines()

# Main driver function
def main():
    file_path = 'sample_text.txt'  # Update path if needed
    input_text = read_file(file_path)

    num_chunks = 2
    chunk_size = len(input_text) // num_chunks
    chunks = [input_text[i:i + chunk_size] for i in range(0, len(input_text), chunk_size)]

    with multiprocessing.Manager() as manager:
        results = manager.list()
        progress = manager.dict(completed=0)
        total_chunks = len(chunks)

        with multiprocessing.Pool(processes=2) as pool:
            pool.starmap(map_task, [(chunk, results, progress, total_chunks) for chunk in chunks])

        reduce_task(results)

if __name__ == "__main__":
    main()
