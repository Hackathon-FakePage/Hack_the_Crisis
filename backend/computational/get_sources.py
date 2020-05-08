from newspaper import Article #pip3 install newspeper3k
from bs4 import BeautifulSoup
import re

##EXAMPLE OF USAGE
#art = gen_article("https://www.nature.com/articles/d41586-020-01315-7")
#links = get_links(art.html)
#external_links = get_external_links(art.source_url, links)
#print(external_links, links)
#get_scientific_sources(art.html)
#print(get_scientific_sources(art.html))
#print(art.text)


#input url - (string), ex.'https://edition.cnn.com/2020/04/17/health/us-coronavirus-friday/index.html'
#output Article object
def gen_article(url, parse=True, nlp=False):
    article = Article(url)
    article.download()
    if(parse):
        article.parse()
    if(nlp):
        article.nlp()
    return article

#get raw html page (ex. article.html) and returns list of links
def get_links(html_page):
    soup = BeautifulSoup(html_page)
    links = []
    for link in soup.findAll('a', attrs={'href': re.compile("^http://")}):
        links.append(link.get('href'))
    for link in soup.findAll('a', attrs={'href': re.compile("^https://")}):
        links.append(link.get('href'))
    return links

#get source_url (ex. article.source_url) and links (ex. get_links(article.html)) and returns list of external links
def get_external_links(source_url, links):
    external_links = []
    end_dot = source_url.rfind('.')
    begin_dot = source_url[:end_dot].rfind('.')
    mother_site = source_url[begin_dot+1:end_dot]
    for link in links:
        if not (mother_site in link):
            external_links.append(link)
    return external_links

#TODO: sources like 'Jacek Jakubowski, Rafa� Sztencel: Wst�p do teorii prawdopodobie�stwa. Warszawa: Script, 2004, s. 59. ISBN 83-89716-01-1.'
def get_scientific_sources(html_page):
    soup = BeautifulSoup(html_page)

    res_words = ["references","resource", "referencje", "źródła", "bibliografia"]
    stop_words = ["\n\n\n\n"]

    scientific_sources = "nie znaleziono"
    for word in res_words:
        i = soup.text.lower().find(word)
        if not (i == -1):
            for stop in stop_words:
                j = soup.text.lower().find(stop,i)
                if not (j == -1):
                    break
            scientific_sources = soup.text[i:j]
            print(scientific_sources)
            break
    return scientific_sources




