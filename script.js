const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
];

const coins = [
    'BTC',
    'ETH',
    'ADA',
    'XRP'
]

async function request_coins(coin){
    const response = await fetch("http://rest.coinapi.io/v1/ohlcv/BITSTAMP_SPOT_"+coin+"_USD/latest?period_id=1HRS",
    {headers: {'X-CoinAPI-Key' : '4C3DE064-C4ED-40D8-B61A-504E43C15FA3'}}
    )
        return response.json()
    }

coin_data = []

// async function parse_data(){

//     for (let coin = 0; coin < coins.length; coin++) {
//         request_coins(coins[coin]).then((x) => {
//             for (let i = 0; i < x.length; i++) {
//                 data.push(x[i]['price_close'])
//                 time_labels.push(x[i]['time_period_end'].slice(0,10))}
//             })
//         }
//     }
// parse_data().then(main)

let all_coin_data = []

async function update_data(){
    coins.forEach((coin) => {
        request_coins(coin).then((x) => {
            for (let i = 0; i < x.length; i++) {
                coin_data.push(x[i]['price_close'])
            }
            all_coin_data[coin] = coin_data
            coin_data = []
        })
    })
    setTimeout(main, 1000)
}


const time_labels = []


// update_data().then(() => {main()})

update_data()

setInterval(() => {
    update_data()
}, 30*60*1000);


function main(){
    console.log('Main was called succesfully...')
    // sliced_btc_data = actual_btc_coin_data.slice(0,6)
    // var daily_coin_price_data = [
    //     actual_btc_coin_data        
    // ]
    
    // A function to easily make a dataset based on data
    function make_dataset(coin, coin_price) {
        let dataset = {}
        dataset['label'] = coin
        dataset['backgroundColor'] = (coin == "BTC" ? 'rgb(20,123,123)' : 'rgb(0, 99, 132)')
        dataset['borderColor'] = (coin == "BTC" ? 'rgb(20,123,123)' : 'rgb(0, 99, 132)')
        dataset['data'] = coin_price
        return dataset
    }
    
    
    var daily_coin_data = []
    
    // !!!
    // Tried to use this cool arrow function to construct a complete dataframe with the dataset.
    // Sadly arrow functions don't return a value and I didn't care to fuck around with it just to make it cool.
    // NOTE in retrospect I could have used a callback function instead, but I still don't care enough to change it just so it looks cool.
    // dataset = coins.forEach(coin => {return make_dataset(coin)})

    for (let i = 0; i < coins.length; i++) {
        // daily_coin_data.push(make_dataset(coins[i], coin_data.splice(i,i+100)))
        daily_coin_data.push(make_dataset(coins[i], all_coin_data[coins[i]]))
    }

    fake_label = [...Array(100).keys()]

    console.log(daily_coin_data)
    const data = {
        labels: fake_label,
        datasets: daily_coin_data};
        
    const config = {
        type: 'line',
        data: data,
        options: {}
    };
        
    const myChart = new Chart(
        document.getElementById('chart'),
        config
        );
        
        
        
}