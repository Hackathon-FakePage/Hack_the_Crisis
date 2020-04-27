import time
import os
import json

informal_words = []

def find_all_indices(input_str, search_str):
    word_indices = []
    length = len(input_str)
    index = 0
    while index < length:
        i = input_str.find(search_str, index)
        if i == -1:
            return word_indices
        previous_char = input_str[i-1]
        if previous_char == " " or previous_char == "-" or previous_char == "," or previous_char == "." or previous_char == "\n":
            word_indices.append(i)
        index = i + 1
    return word_indices

def find_informal_words(text):
    text = text.lower()
    if informal_words == []:
        load_informal_words_set()
    indices = []
    for word in informal_words:
        word_indices = []
        word_indices = find_all_indices(text, word)
        if word_indices != []:
            print("word: ", word, " -> ", word_indices)
            for word_index in word_indices:
                for i in range(len(word)):
                    indices.append(word_index + i)

    indices = list( dict.fromkeys(indices) )
    indices.sort()
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

# Testing
# test_file = open("test_text.txt", "r")
# test_text = test_file.read()
# find_informal_words(test_text)
# test_file.close()
