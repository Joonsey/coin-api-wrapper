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
volume = []
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


let all_coin_data = []
let all_volume_traded = []
async function update_data(){
    coins.forEach((coin) => {
        request_coins(coin).then((x) => {
            for (let i = 0; i < x.length; i++) {
                coin_data.push(x[i]['price_close'])
                volume.push(x[i]['volume_traded'])
            }
            all_coin_data[coin] = coin_data
            all_volume_traded[coin] = volume

            volume = []
            coin_data = []
            sleep(500)
        })
    })
    setTimeout(main, 1000)
}


const time_labels = []


// update_data().then(() => {main()})

update_data()

setInterval(() => {
    update_data()
}, 60*60*1000);

function calculate_border_color(coin_price) {
    let background_colors = []
    for (let index = 0; index < coin_price.length; index++) {
        let element = coin_price[index];
        if (index == 0) {
            color = 'rgb(0,255,0)'
        } else {
            if (element > coin_price[index-1]) {
                color = 'rgb(0,255,0)'
            }else {
                color = 'rgb(255,0,0)'
            }
        }

        background_colors.push(color)
    }
    
    return background_colors
}

const up = (ctx, value) => ctx.p0.parsed.y < ctx.p1.parsed.y ? value : undefined
const down = (ctx, value) => ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined


function calculate_stats(coin) {
    try {
        const all_volume = all_volume_traded[coin]
        const all_coin_price = all_coin_data[coin]
        // const sum_of_volume = all_volume.reduce((partialSum, a) => partialSum + a, 0);
        
        most_recent_volume_trade = all_volume.slice(-1)
        most_recent_price = all_coin_price.slice(-1)
        previous_price = all_coin_price.slice(-2)
    
        const change = (most_recent_price - previous_price) / previous_price * 100
        const four_day_avg = (all_coin_price.reduce((a,b)=>a+b)) / all_coin_price.length
        const one_day_avg = all_coin_price.slice(all_coin_price.length-24, 0)
    
        stats = []
        stats.push(most_recent_volume_trade)
        stats.push(change)
        stats.push(one_day_avg)
        stats.push(four_day_avg)
    } catch {
        stats = [0,0,0,0]
    }
    return stats
}



function main(){
    console.log('Main was called succesfully...')
    // sliced_btc_data = actual_btc_coin_data.slice(0,6)
    // var daily_coin_price_data = [
    //     actual_btc_coin_data        
    // ]
    
    // A function to easily make a dataset based on data


    function make_dataset(coin, coin_price) {
        let dataset = {}
        border_color = calculate_border_color(coin_price)
        bg_color = 'rgb(200,200,200)'
        dataset['label'] = coin
        dataset['backgroundColor'] = border_color
        dataset['borderColor'] = border_color
        dataset['data'] = coin_price
        dataset['borderJoinStyle'] = 'round'
        dataset['borderWidth'] = 1.5
        dataset['segment'] = {
            borderColor: ctx => up(ctx, 'rgb(0,255,0)') || down(ctx, 'rgb(255,0,0)')
        }
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

    // all values are empty except every 24th value is the day
    // TODO
    fake_label = [...Array(100).keys()]

    console.log(daily_coin_data)
    var data = {
        labels: fake_label,
        datasets: daily_coin_data};
        
    var config = {
        type: 'line',
        data: data,
        options: {
            scales: {
                y: {
                    ticks: {color: 'rgb(255,255,255)'}
                },
                x: {display: 0}
            }
        }
    }
        
    // const myChart = new Chart(
    //     document.getElementById('chart'),
    //     config
    //     );

    const container = document.querySelector('.display-container')
    const text_container = document.querySelector('.text-container')
     
    coins.forEach(coin => {
        canvas = document.createElement("canvas")
        line_container = document.createElement('div')
        graph_container = document.createElement('div')
        graph_container.classList += 'graph-container'
        line_container.classList += 'line-container'
        var text_container_template = text_container.cloneNode(true)
        
        stats = calculate_stats(coin)

        text_container_template.childNodes[1].innerHTML += "<p class='stat'> " + stats[0] + "</p>"
        text_container_template.childNodes[3].innerHTML += "<p class='stat'> " + stats[1] + "</p>"
        text_container_template.childNodes[5].innerHTML += "<p class='stat'> " + stats[2] + "</p>"
        text_container_template.childNodes[7].innerHTML += "<p class='stat'> " + stats[3] + "</p>"

        
        canvas.id += coin
        line_container.appendChild(canvas)
        graph_container.appendChild(line_container)
        graph_container.appendChild(text_container_template)

        container.appendChild(graph_container)
        

        data = {
            labels: fake_label,
            datasets: daily_coin_data[coin]};

        
        config = {
            type: 'line',
            data: data,
            options: {
                scales: {
                    y: {
                        ticks: {color: 'rgb(255,255,255)'}
                    },
                    x: {display: 0}
                }
            }
        }
        new Chart(canvas, config)
        text_container.remove()   
    });
        
        
}