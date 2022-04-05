from email import header
from nbformat import write
import requests, json, csv
from datetime import datetime, timedelta


BASE_URL = "http://rest.coinapi.io/v1/quotes/"
BASE_SANDBOX_URL = "http://rest-sandbox.coinapi.io/v1/quotes/"

btc_usd_coin_symbol = "BITSTAMP_SPOT_BTC_USD"
API_KEY = {'X-CoinAPI-Key' : '4C3DE064-C4ED-40D8-B61A-504E43C15FA3'}

class Coin:
    def __init__(self, coin, apiKey, sandbox=False):
        self.base_url = BASE_URL if sandbox == False else BASE_SANDBOX_URL

        url = self.base_url + coin + '/current'
        # print(url)
        headers = apiKey
        # response = requests.get(url, headers=headers)
        self.coin = coin
        self.apiKey = apiKey
        #print(response.json())
        # try:
        #     if response.json()['symbol_id'] == coin:
        #         """" 
        #         Validation
        #         """
        #         self.coin = coin
        #         self.apiKey = apiKey
        # except:
        #     print(response.ok)
        #     print(response.text)

    def get_current_info(self):
        response = requests.get(self.base_url + self.coin + '/current', headers=self.apiKey).json()
        
        info = {}
        info['ask_price'] = response['ask_price']
        info['bid_price'] = response['bid_price']

        return info

    def get_historical_info(self, span=1, start_time=0, end_time=0):
        """
        Need to provide time in ISO 8601 format

        start_time and end_time need to be a ISO 8601 format

        This request doesn't seem usefull for the purpose i intend to use. 
        I want intermittent infrequent requests at certain intervals to get a daily estimate.
        This has sometimes multiple requests per second and it's impossible to recieve any information over the course of a longer period
        Could be usefull for fetching specific data at specific times.
        """

        if start_time == 0 and end_time == 0:
            now = datetime.now()
            yesterday = now - timedelta(days=span)
        elif end_time != 0 and start_time != 0:
            now = start_time
            yesterday = end_time
        elif end_time != 0 and start_time == 0:
            print('Wrong format on end_time and start_time')
            raise ValueError

        url = self.base_url + f"{self.coin}/history?time_start={yesterday.isoformat()[0:-7]}&time_end={now.isoformat()[0:-7]}"
        response = requests.get(url, headers=self.apiKey).json()
        data = {}
        for i in response:
            time = i['time_exchange']
            data[time] = [i['ask_price'], i['bid_price']]
        
        
        # returns data frame with format:
        # time | [ask price, bid price] 
        
        return data

    def ohlvc(self, period="1HRS", include_empty=True):
        """
        valid periods: \n 
        Second:	1SEC, 2SEC, 3SEC, 4SEC, 5SEC, 6SEC, 10SEC, 15SEC, 20SEC, 30SEC \n
        Minute:	1MIN, 2MIN, 3MIN, 4MIN, 5MIN, 6MIN, 10MIN, 15MIN, 20MIN, 30MIN \n
        Hour:	1HRS, 2HRS, 3HRS, 4HRS, 6HRS, 8HRS, 12HRS \n 
        Day	    1DAY, 2DAY, 3DAY, 5DAY, 7DAY, 10DAY \n
        Month:	1MTH, 2MTH, 3MTH, 4MTH, 6MTH \n
        Year:	1YRS, 2YRS, 3YRS, 4YRS, 5YRS
        """
        url = self.base_url.removesuffix("/quotes/") + "/ohlcv/" + self.coin + "/latest?period_id="+ period #+ "&include_empty_items=" + str(include_empty)
        response = requests.get(url, headers=self.apiKey).json()
        
        all_data = []
        
        
        print(url)

        previous_closing_price = 0
        # filtering the response and returns the data we want
        for r in response:
            data = {}
            data['time_open'] = r['time_open']
            data['open'] = r['price_open']
            data['high'] = r['price_high']
            data['low'] = r['price_low']
            data['close'] = r['price_close']
            data['volume_traded'] = r['volume_traded']
            data['trades_count'] = r['trades_count']
            #data['change'] = (r['price_close'] - previous_closing_price) / previous_closing_price * 100
            all_data.append(data)
            #previous_closing_price = (lambda x: if r['price_close'] > 1)
        print(all_data)
        return all_data

    
    def write_to_csv(self):
        write_data_to_file(self.ohlvc())
    

def write_data_to_file(data):

    keys = data[0].keys()

    with open('data.csv', 'w', newline='') as output:
        dict_writer = csv.DictWriter(output, keys) 
        dict_writer.writeheader()
        dict_writer.writerows(data)

if __name__ == "__main__":
    btc = Coin("KRAKENFTS_PERP_BTC_USD", API_KEY)

    # print(btc.get_current_info())
    # print(btc.get_historical_info())
    print(btc.write_to_csv())

