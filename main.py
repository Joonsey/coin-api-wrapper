import requests, json

# COINAPI documentation "https://docs.coinapi.io/?python"
# QUERY LIMIT 100 / Day

# makes the request and handles the response.
def make_request(self):

    btc_usd_coin_symbol = "BITSTAMP_SPOT_BTC_USD"
    url = 'https://rest.coinapi.io/v1/quotes/' + btc_usd_coin_symbol + '/current'
    headers = {'X-CoinAPI-Key' : '4C3DE064-C4ED-40D8-B61A-504E43C15FA3'}
    response = requests.get(url, headers=headers)

    # converts the response to parsed json format.
    response_json = response.json()

    # json.dumps prettifies the json document.
    print(json.dumps(response_json, indent=4, sort_keys=True))

def time_format():

    from datetime import datetime, timedelta
    today = datetime.now()
    yesterday = today - timedelta(days=1)
    return today, yesterday

# print(time_format())

def change():
    prev = 100
    new = 110
    print((new-prev) / prev * 100)


def fetchTime():
    time = "2017-08-09T14:30:05.0000000Z"
    t = time[0:13]
    if t[-3] != 'T':
        print('not T')
    print(time[0:13])


fetchTime()

#TODO make a API wrapper for this api.
# make sure the qury limit is not being overused.
# test if proxy is required for API functionality
# make a simple web-server with graphs and cool things. :=)