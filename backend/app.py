from flask import Flask, request, jsonify
from flask_cors import CORS
from bs4 import BeautifulSoup
import requests
import market_database as db
from dotenv import load_dotenv
load_dotenv()
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('USER_TOKEN_SECRET')
# allows availability to/from all sources
CORS(app)

@app.route('/', methods = ['POST', 'GET'])
def visiter():

    print("\nNew visiter\n")
    db.updateVisiter()

    headers = {'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15'}

    usd_url = 'https://finance.yahoo.com/quote/DX=F'
    euro_url = 'https://finance.yahoo.com/quote/GE=F'
    yuan_url = 'https://finance.yahoo.com/quote/CNY=X'
    bitcoin_url = 'https://finance.yahoo.com/quote/BTC-USD'
    ethereum_url = 'https://finance.yahoo.com/quote/ETH-USD'
    gold_url = 'https://finance.yahoo.com/quote/GC=F'
    silver_url = 'https://finance.yahoo.com/quote/SI=F'

    #dollar
    r = requests.get(usd_url)
    currency = BeautifulSoup(r.text, 'html.parser')
    usd = currency.find('div',{'D(ib) Mend(20px)'}).find_all('span')
    dollar_price = usd[0].text
    dollar_change = usd[1].text
    # euro
    r = requests.get(euro_url)
    currency = BeautifulSoup(r.text, 'html.parser')
    euro = currency.find('div',{'D(ib) Mend(20px)'}).find_all('span')
    euro_price = euro[0].text
    euro_change = euro[1].text
    #yuan
    r = requests.get(yuan_url)
    currency = BeautifulSoup(r.text, 'html.parser')
    yuan = currency.find('div',{'D(ib) Mend(20px)'}).find_all('span')
    yuan_price = yuan[0].text
    yuan_change = yuan[1].text
    #bitcoin
    r = requests.get(bitcoin_url)
    currency = BeautifulSoup(r.text, 'html.parser')
    bitcoin = currency.find('div',{'D(ib) Mend(20px)'}).find_all('span')
    bitcoin_price = bitcoin[0].text
    bitcoin_change = bitcoin[1].text
    #ethereum
    r = requests.get(ethereum_url)
    currency = BeautifulSoup(r.text, 'html.parser')
    ethereum = currency.find('div',{'D(ib) Mend(20px)'}).find_all('span')
    ethereum_price = ethereum[0].text
    ethereum_change = ethereum[1].text
    #gold
    r = requests.get(gold_url)
    currency = BeautifulSoup(r.text, 'html.parser')
    gold = currency.find('div',{'D(ib) Mend(20px)'}).find_all('span')
    gold_price = gold[0].text
    gold_change = gold[1].text
    #silver
    r = requests.get(silver_url)
    currency = BeautifulSoup(r.text, 'html.parser')
    silver = currency.find('div',{'D(ib) Mend(20px)'}).find_all('span')
    silver_price = silver[0].text
    silver_change = silver[1].text
    

    currencies = {
        "dollar" : dollar_price,
        "euro" : euro_price,
        "yuan" : yuan_price,
        "bitcoin" : bitcoin_price,
        "ethereum" : ethereum_price,
        "gold" : gold_price,
        "silver" : silver_price
    }

    return jsonify({ "currencies" : currencies, "status" : 200})


# if __name__ == "__main__" :
#     app.run(host='0.0.0.0',debug=True,port='5000')
#     app.run(host='0.0.0.0')
# return app