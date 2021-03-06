const INTERVALS_IN_MINUTES = 60
var charts_exist = false
const coins = [
    'BTC',
    'ETH',
    'ADA',
    'XRP'
]

coin_data = []
volume = []
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


let all_coin_data = []
let all_volume_traded = []
function update_data(){
    coins.forEach((coin) => {
        for (let i = 0; i < 100; i++) {
            coin_data.push(Math.floor(Math.random()*100000))
            volume.push(Math.floor(Math.random()*100))
        }
        
        all_coin_data[coin] = coin_data
        all_volume_traded[coin] = volume
        
        volume = []
        coin_data = []
    })
}


const time_labels = []



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
        previous_price = all_coin_price.slice(-2, -1)
    
        const change = Math.floor((most_recent_price - previous_price) / previous_price * 100)
        const four_day_avg = (all_coin_price.reduce((a,b)=>a+b)) / all_coin_price.length
        const one_day_avg = Math.floor((all_coin_price.slice(all_coin_price.length-24, -1).reduce((a,b) => a+b) / 24))
    
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
    

    // all values are empty except every 24th value is the day
    // TODO
    fake_label = [...Array(100).keys()]

    const container = document.querySelector('.display-container')
    const text_container = document.querySelector('.text-container')
    

    coins.forEach(coin => {

        canvas = document.createElement("canvas")
        line_container = document.createElement('div')
        graph_container = document.createElement('div')
        graph_container.classList += 'graph-container'
        line_container.classList += 'line-container'
        canvas.id += coin
        line_container.appendChild(canvas)
        graph_container.appendChild(line_container)
        var text_container_template = text_container.cloneNode(true)

        stats = calculate_stats(coin)

        text_container_template.childNodes[1].innerHTML += "<p class='stat'id=+"+coin+"> " + stats[0] + "</p>"
        text_container_template.childNodes[3].innerHTML += "<p class='stat'id=+"+coin+"> " + stats[1] + "%</p>"
        text_container_template.childNodes[5].innerHTML += "<p class='stat'id=+"+coin+"> " + stats[2] + "</p>"
        text_container_template.childNodes[7].innerHTML += "<p class='stat'id=+"+coin+"> " + stats[3] + "</p>"

        
        graph_container.appendChild(text_container_template)
        container.appendChild(graph_container)
    
        

        

        data = {
            labels: fake_label,
            datasets: [make_dataset(coin, all_coin_data[coin])]}

        
        config = {
            type: 'line',
            data: data,
            options: {
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        text: coin,
                        display: true,
                        color: "rgb(255,255,255)",
                        fullsize: true,
                        font: {
                            size: "27px"
                        }
                    }
                },
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
    
    
    charts_exist = true 
}


update_data()
main()