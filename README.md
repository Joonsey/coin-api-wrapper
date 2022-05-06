## A crypto currency exchange API
Made using the https://docs.coinapi.io/. the intent of this wrapper is to work as a proxy to bypass network restriction on common network restrictions.

# Entirely front-end
I have pivoted to building it entirely in JS as oppose to make a local web-server to serve it, I have it render a HTML file on a display.

#### This fixed a number of issues.
I had an overengineered back-end that was doing way more than it's intended purpose. I was fetching and repurposing data for no reason other than parsing it, all of which can be done pretty easily in JS.
I don't need to serve any files or build any web-server / back-end.
No need for a database.
less performance issues or resource requirement on low-end device.

# How to run
open the index.html in any browser with JS enabled and it should automatically work.

# how it works
It will check if the time is appropriate, which is between 8-16. 
It will update it's data between these times. Every 20 minutes.

It will send request for each coin and parse the data i need into arrays and send it down the chain to be filtered and construct a graph per coin.
You can customize each coin by changing the coin symbol id in the COINS constant.

The graph check if the value is going up from the previous price or down, and dynamically change the color based on result.
