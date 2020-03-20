import time
import json

informal_words = []

def find_informal_words(text):
    text = text.lower()
    if informal_words == []:
        load_informal_words_set()
    indices = []
    for word in informal_words:
        index = text.find(word)
        if index != -1:
            print("word: ", word, " -> ", index)
            for i in range(len(word)):
                indices.append(index + i)

    indices = list( dict.fromkeys(indices) )
    print("Indices: ", indices)
    results = {"indices": indices}
    return results

def load_informal_words_set():
    file = open("informal_words.csv", "r+")
    contents = file.readlines()

    for line in contents:
        line = line.replace("\n", "").lower()
        informal_words.append(line)
    file.close()


if __name__=="__main__":
    file = open("test_text.txt", "r")
    contents = file.read()
    # print(contents)
    start_time = time.time()
    results = find_informal_words(contents)
    print("Total time: ", time.time() - start_time)
    print("Results: ", results)
