from newspaper import Article

#url = "https://zapytajfizyka.fuw.edu.pl/wyklady/krzysztof-turzynski/"

def getTitle(url):
    article = Article(url)
    article.download()
    article.html
    article.parse()
    return article.title

def getText(url):
    article = Article(url)
    article.download()
    article.html
    article.parse()
    return article.text