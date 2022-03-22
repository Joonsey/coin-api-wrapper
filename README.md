## A crypto currency exchange API
Made using the https://docs.coinapi.io/. the intent of this wrapper is to work as a proxy to bypass network restriction on common network restrictions.

> look the main.py source file for documentation and code description

### Potential solutions

Ground up server network connection technology using TCP
Basic apache webserver with rest api for data transmission

### App checklist

Works for client and server, OOP-based wrapper.
logs?
ci/cd?


# Api wrapper

api-wrapper.py contains the Coin class that will act as an event handler object for the API.
It will be the primary tool for requests and data handling between the client and API source.

intension is to use this wrapper to redestribute data from source to my own database and connect it with a webserver. All computations should be done before entering data to database.

> current estimates is dividing the 100 daily requests on 4(?) crypto currencies to track. 

I think more than 4 will be difficult to make a intuitive visualization. Especially because I want it to be informative and comprehensive without being overwhelming.

### note
The Coin class sends a request upon initialization, this is for validation purposes. This might need to be bypasses initially, especially if we are tracking more coins than anticipated.

Time format that's being sendt to the server for specific in the ```python get_historical_data``` function is a bit weird, it's ISO 8601 but it's without the last decimal numbers. I fix this solution by removing the 7 last characters as its seems to be consistently 7 characters.

I am opting to use the [OHLCV](https://docs.coinapi.io/?python#ohlcv) (open, high, low, close, volume) primarily. This is because it covers the information and format I need to make a good visualization. In theory if I had unlimited key usage I believe the [Quotes](https://docs.coinapi.io/?python#quotes) might be the superior options to get close to real-time updates.

Network restrictions where observed when using the sandbox endpoint which results in:

<html>
<style>
        body {
            background-color: #e8ebeb;
            font-family: Lato, 'Helvetica Neue', Helvetica, Arial, sans-serif;
            font-size: 16px;
            margin: 0;
            color: #070808;
        }

        a:link {
            color: #0ba4e8;
        }

        b,
        strong {
            font-weight: 500;
        }

        p {
            line-height: 1.2em;
        }

        button {
            overflow: visible;
        }

        button, input, optgroup, select, textarea {
            color: inherit;
            font: inherit;
            margin: 0;
        }

        .center {
            text-align: center;
            margin-left: auto;
            margin-right: auto;
        }

        #dError,
        .msg {
            color: #d94949;
            margin: 20px 0;
        }

        fieldset .msg {
            margin: 0;
        }

        #content {
            padding-top: 100px;
        }

        #content img {
            display: block;
            margin: auto;
        }

        #content h1 {
            font-style: normal;
            font-weight: normal;
            font-size: 36px;
            line-height: 43px;
            text-align: center;
            letter-spacing: 0.1px;
            color: #070808;
            margin: 10px auto 8px;
        }

        #content > p {
            text-align: center;
            margin-left: auto;
            margin-right: auto;
            width: 640px;
            font-size: 14px;
            line-height: 20px;
        }

        .response {
            background-color: #fff;
            color: #5a636b;
            margin: 24px auto 0;
            padding: 20px;
            font-size: 16px;
            width: 800px;
            border: 1px solid #c8cbce;
            box-sizing: border-box;
            border-radius: 8px;
        }

        .response p {
            margin: 0 0 1em;
        }

        .response p:last-child {
            margin: 0;
        }

        .response b {
            color: #070808;
        }

        .response .msg b {
            color: #d94949;
        }

        .response form td,
        .response form input {
            font-size: 1.1em;
            font-weight: bold;
        }

        .loading {
            margin: 2em auto 1em;
        }
</style>
<h1>Web Page Blocked</h1>
    <p>The web page you are trying to visit has been blocked in accordance with company policy. Please contact your system administrator if you believe this is an error.</p>
    <div class="response">
        <p><b>User:</b> ORG\USER</p>
        <p><b>URL:</b> rest-sandbox.coinapi.io/v1/quotes/BITSTAMP_SPOT_BTC_USD/current</p>
        <p><b>Category:</b> cryptocurrency</p>
    </div>
</html>
# database 
