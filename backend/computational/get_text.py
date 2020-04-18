import newspaper #pip3 install newspeper3k

# import nltk
# nltk.download('punkt')


#input url - (string), ex.'https://edition.cnn.com/2020/04/17/health/us-coronavirus-friday/index.html'
#output text - (string)
def gen_article(url, parse=True, nlp=False):
    article = newspaper.Article(url)
    article.download()
    if(parse):
        article.parse()
    if(nlp):
        article.nlp()
    return article



#PRZYKŁADOWE ATRYBUTY article

# >>> article.html
# '<!DOCTYPE HTML><html itemscope itemtype="http://...'

# >>> article.parse()
##"Wyciąga z html text, autorów, datę publikacji itd."

# >>> article.authors
# ['Leigh Ann Caldwell', 'John Honway']

# >>> article.publish_date
# datetime.datetime(2013, 12, 30, 0, 0)

# >>> article.text
# 'Washington (CNN) -- Not everyone subscribes to a New Year's resolution...'

# >>> article.top_image
# 'http://someCDN.com/blah/blah/blah/file.png'

# >>> article.movies
# ['http://youtube.com/path/to/link.com', ...]

# >>> article.nlp()
##Robi analizę słów, wyciąga kluczowe słowa, generuje krótkie podsumowanie (nie zawsze najlepszej jakości)
##wymaga
##import nltk
##nltk.download('punkt')

# >>> article.keywords
# ['New Years', 'resolution', ...]

# >>> article.summary
# 'The study shows that 93% of people ...'

