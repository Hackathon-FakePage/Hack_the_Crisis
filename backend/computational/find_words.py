import time
import os
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
    informal_words_filename = 'informal_words.csv'
    informal_words_path = os.path.join(os.path.dirname(__file__), informal_words_filename)
    file = open(informal_words_path, 'r+')
    contents = file.readlines()

    for line in contents:
        line = line.replace("\n", "").lower()
        informal_words.append(line)
    file.close()

