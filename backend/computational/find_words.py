import time
import os
import json

informal_words = []
allowed_chars = [' ', '-', ',', '.', ';', ':', '?', '!', '/', '+', '=', '(', ')', '{', '}', '[', ']', '"', '*', '^', '$', '#', '@', '`', '\n']

def find_all_indices(input_str, search_str):
    word_indices = []
    length = len(input_str)
    index = 0
    while index < length:
        i = input_str.find(search_str, index)
        if i == -1:
            return word_indices
        elif i > 0:
            preceeding_char = input_str[i-1]
            following_char = input_str[i + len(search_str)]
            if preceeding_char in allowed_chars and following_char in allowed_chars:
                word_indices.append(i)
        else: # case of first word in text
            following_char = input_str[i + len(search_str)]
            if following_char in allowed_chars:
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

################################################
# WARNING: Above methods should not be used anymore.
# Below are given the proper ones, that at the same time compute the formality score.
################################################

"""
import time
import os
import json

class TextAnalyzer:

    def __init__(self, text):
        self.allowed_chars = [' ', '-', ',', '.', ';', ':', '?', '!', '/', '+', '=', '(', ')', '{', '}', '[', ']', '"', '*', '^', '$', '#', '@', '`', '\n']
        self.disallowed_chars = [] # Used only in computing the formality score
        self.disallowed_chars = self.allowed_chars # We are abusing allowed_chars a little bit here
        self.disallowed_chars += ['0','1','2','3','4','5','6','7','8','9']
        self.informal_words = []
        self.text = text
        self.informal_words_counter = 0
        self.indices = {} # Note, that here we will store the indices as json {"indices": []}.
        self.formality_score = 0.0

    def analyze_text(self):
        self.find_informal_words(self.text) # Here we are at the same time counting the informal words
        self.calculate_formality_score()

    def get_indices(self):
        return self.indices

    def get_formality_score(self):
        return self.formality_score

    def find_all_indices(self, input_str, search_str):
        word_indices = []
        length = len(input_str)
        index = 0
        while index < length:
            i = input_str.find(search_str, index)
            if i == -1:
                return word_indices
            elif i > 0:
                preceeding_char = input_str[i-1]
                following_char = input_str[i + len(search_str)]
                if preceeding_char in self.allowed_chars and following_char in self.allowed_chars:
                    word_indices.append(i)
            else: # case of first word in text
                following_char = input_str[i + len(search_str)]
                if following_char in allowed_chars:
                    word_indices.append(i)
            index = i + 1
            self.informal_words_counter += 1
        return word_indices

    def find_informal_words(self, text):
        text = text.lower()
        if self.informal_words == []:
            self.load_informal_words_set()
        indices = []
        for word in self.informal_words:
            word_indices = []
            word_indices = self.find_all_indices(text, word)
            if word_indices != []:
                # print("word: ", word, " -> ", word_indices)
                for word_index in word_indices:
                    for i in range(len(word)):
                        indices.append(word_index + i)

        indices = list( dict.fromkeys(indices) )
        indices.sort()
        self.indices = {"indices": indices}

    def load_informal_words_set(self):
        informal_words_filename = 'informal_words.csv'
        informal_words_path = os.path.join(os.path.dirname(__file__), informal_words_filename)
        file = open(informal_words_path, 'r+')
        contents = file.readlines()

        for line in contents:
            line = line.replace("\n", "").lower()
            self.informal_words.append(line)
        file.close()

    # Calculates the formality score IN PERCENTS
    def calculate_formality_score(self):
        clean_text = self.text
        clean_text = clean_text.lower()
        # Clean the text by removing unnecessary characters.
        for char in self.disallowed_chars: # We are abusing here allowed chars.
            # print("char: ", char)
            clean_text = clean_text.replace(char, ' ')
        splitted_text = clean_text.split()
        self.formality_score = (self.informal_words_counter / len(splitted_text)) * 100

# Example usage
test_file = open("test_text.txt", "r")
test_text = test_file.read()
text_analyzer = TextAnalyzer(test_text)
text_analyzer.analyze_text()
indices = text_analyzer.get_indices()
formality_score = text_analyzer.get_formality_score()
print("Indices: ", indices)
print("Formality score: ", formality_score)
test_file.close()
"""
