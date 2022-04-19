const INTERVALS_IN_MINUTES = 20
var charts_exist = false
TEST_MODE = false
const coins = [
    'BTC',
    'ETH',
    'ADA',
    'XRP'
]

// const svg_object = [
//     '<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><path fill="#ffc107" d="M44,24c0,11.044-8.956,20-20,20S4,35.044,4,24S12.956,4,24,4S44,12.956,44,24z"/><path fill="#fff8e1" d="M17,34V14h8.199c2.41,0,4.234,0.465,5.48,1.395s1.867,2.293,1.867,4.086c0,0.98-0.25,1.844-0.746,2.59c-0.5,0.746-1.195,1.293-2.086,1.641c1.016,0.258,1.816,0.773,2.402,1.555C32.703,26.043,33,26.992,33,28.121c0,1.922-0.609,3.379-1.828,4.367S28.219,33.98,25.965,34H17z M21,22h4.363c2.063-0.035,3.098-0.824,3.098-2.445c0-0.906-0.262-1.559-0.785-1.957S26.328,17,25.199,17H21V22z M21,25v6h4.844C26.805,31,29,30.531,29,28.391S27.883,25.027,26,25H21z"/><path fill="#fff8e1" d="M20 11h3v5h-3V11zM25 11h3v5h-3V11zM20 32h3v5h-3V32zM25 32h3v5h-3V32z"/></svg>',
//     '<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><path fill="#9fa8da" d="M11 24L25 2 39 24 25 32z"/><path fill="#7986cb" d="M25 2L39 24 25 32z"/><path fill="#9fa8da" d="M11 27L25 35 39 27 25 46z"/><path fill="#7986cb" d="M25 35L39 27 25 46zM11 24L25 18 39 24 25 32z"/><path fill="#5c6bc0" d="M25 18L39 24 25 32z"/></svg>',
//     '<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><linearGradient id="poJZVVZccPEkB34rORM4na" x1="10.502" x2="43.609" y1="-7.648" y2="24.267" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0077d2"/><stop offset="1" stop-color="#0b59a2"/></linearGradient><circle cx="24" cy="5.364" r="1.364" fill="url(#poJZVVZccPEkB34rORM4na)"/><linearGradient id="poJZVVZccPEkB34rORM4nb" x1="5.203" x2="38.309" y1="-2.151" y2="29.764" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0077d2"/><stop offset="1" stop-color="#0b59a2"/></linearGradient><circle cx="13.545" cy="5.891" r=".909" fill="url(#poJZVVZccPEkB34rORM4nb)"/><linearGradient id="poJZVVZccPEkB34rORM4nc" x1="15.275" x2="48.381" y1="-12.599" y2="19.316" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0077d2"/><stop offset="1" stop-color="#0b59a2"/></linearGradient><circle cx="34.455" cy="5.891" r=".909" fill="url(#poJZVVZccPEkB34rORM4nc)"/><linearGradient id="poJZVVZccPEkB34rORM4nd" x1="4.069" x2="37.175" y1="-.974" y2="30.941" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0077d2"/><stop offset="1" stop-color="#0b59a2"/></linearGradient><path fill="url(#poJZVVZccPEkB34rORM4nd)" d="M16.5,9.646c-0.753,0-1.364,0.611-1.364,1.364v0c0,0.753,0.611,1.364,1.364,1.364 c0.753,0,1.364-0.611,1.364-1.364S17.253,9.646,16.5,9.646L16.5,9.646z"/><linearGradient id="poJZVVZccPEkB34rORM4ne" x1="11.294" x2="44.4" y1="-8.469" y2="23.446" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0077d2"/><stop offset="1" stop-color="#0b59a2"/></linearGradient><path fill="url(#poJZVVZccPEkB34rORM4ne)" d="M31.5,9.646c-0.753,0-1.364,0.611-1.364,1.364v0c0,0.753,0.611,1.364,1.364,1.364 c0.753,0,1.364-0.611,1.364-1.364S32.253,9.646,31.5,9.646L31.5,9.646z"/><linearGradient id="poJZVVZccPEkB34rORM4nf" x1="7.096" x2="40.202" y1="-4.114" y2="27.801" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0077d2"/><stop offset="1" stop-color="#0b59a2"/></linearGradient><circle cx="24" cy="12.182" r="1.818" fill="url(#poJZVVZccPEkB34rORM4nf)"/><linearGradient id="poJZVVZccPEkB34rORM4ng" x1="-1.928" x2="31.178" y1="5.246" y2="37.161" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0077d2"/><stop offset="1" stop-color="#0b59a2"/></linearGradient><circle cx="7.86" cy="14.682" r="1.364" fill="url(#poJZVVZccPEkB34rORM4ng)"/><linearGradient id="poJZVVZccPEkB34rORM4nh" x1="13.621" x2="46.727" y1="-10.883" y2="21.032" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0077d2"/><stop offset="1" stop-color="#0b59a2"/></linearGradient><circle cx="40.14" cy="14.682" r="1.364" fill="url(#poJZVVZccPEkB34rORM4nh)"/><linearGradient id="poJZVVZccPEkB34rORM4ni" x1="2.619" x2="35.725" y1=".53" y2="32.445" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0077d2"/><stop offset="1" stop-color="#0b59a2"/></linearGradient><circle cx="20.364" cy="17.636" r="2.727" fill="url(#poJZVVZccPEkB34rORM4ni)"/><linearGradient id="poJZVVZccPEkB34rORM4nj" x1="6.122" x2="39.228" y1="-3.104" y2="28.811" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0077d2"/><stop offset="1" stop-color="#0b59a2"/></linearGradient><circle cx="27.636" cy="17.636" r="2.727" fill="url(#poJZVVZccPEkB34rORM4nj)"/><linearGradient id="poJZVVZccPEkB34rORM4nk" x1="-.787" x2="32.32" y1="4.062" y2="35.977" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0077d2"/><stop offset="1" stop-color="#0b59a2"/></linearGradient><circle cx="13.766" cy="18.091" r="1.818" fill="url(#poJZVVZccPEkB34rORM4nk)"/><linearGradient id="poJZVVZccPEkB34rORM4nl" x1="9.073" x2="42.179" y1="-6.165" y2="25.75" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0077d2"/><stop offset="1" stop-color="#0b59a2"/></linearGradient><circle cx="34.234" cy="18.091" r="1.818" fill="url(#poJZVVZccPEkB34rORM4nl)"/><linearGradient id="poJZVVZccPEkB34rORM4nm" x1="-2.313" x2="30.794" y1="5.645" y2="37.56" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0077d2"/><stop offset="1" stop-color="#0b59a2"/></linearGradient><circle cx="16.727" cy="24" r="2.727" fill="url(#poJZVVZccPEkB34rORM4nm)"/><linearGradient id="poJZVVZccPEkB34rORM4nn" x1="4.694" x2="37.8" y1="-1.623" y2="30.292" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0077d2"/><stop offset="1" stop-color="#0b59a2"/></linearGradient><circle cx="31.273" cy="24" r="2.727" fill="url(#poJZVVZccPEkB34rORM4nn)"/><linearGradient id="poJZVVZccPEkB34rORM4no" x1="-6.035" x2="27.072" y1="9.506" y2="41.421" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0077d2"/><stop offset="1" stop-color="#0b59a2"/></linearGradient><circle cx="9" cy="24" r="1.364" fill="url(#poJZVVZccPEkB34rORM4no)"/><linearGradient id="poJZVVZccPEkB34rORM4np" x1="8.416" x2="41.522" y1="-5.484" y2="26.431" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0077d2"/><stop offset="1" stop-color="#0b59a2"/></linearGradient><circle cx="39" cy="24" r="1.364" fill="url(#poJZVVZccPEkB34rORM4np)"/><linearGradient id="poJZVVZccPEkB34rORM4nq" x1="-8.881" x2="24.225" y1="12.459" y2="44.374" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0077d2"/><stop offset="1" stop-color="#0b59a2"/></linearGradient><circle cx="3.091" cy="24" r=".909" fill="url(#poJZVVZccPEkB34rORM4nq)"/><linearGradient id="poJZVVZccPEkB34rORM4nr" x1="11.262" x2="44.368" y1="-8.436" y2="23.479" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0077d2"/><stop offset="1" stop-color="#0b59a2"/></linearGradient><circle cx="44.909" cy="24" r=".909" fill="url(#poJZVVZccPEkB34rORM4nr)"/><linearGradient id="poJZVVZccPEkB34rORM4ns" x1="-3.741" x2="29.366" y1="7.127" y2="39.042" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0077d2"/><stop offset="1" stop-color="#0b59a2"/></linearGradient><circle cx="20.364" cy="30.364" r="2.727" fill="url(#poJZVVZccPEkB34rORM4ns)"/><linearGradient id="poJZVVZccPEkB34rORM4nt" x1="-.238" x2="32.869" y1="3.493" y2="35.408" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0077d2"/><stop offset="1" stop-color="#0b59a2"/></linearGradient><circle cx="27.636" cy="30.364" r="2.727" fill="url(#poJZVVZccPEkB34rORM4nt)"/><linearGradient id="poJZVVZccPEkB34rORM4nu" x1="-6.692" x2="26.415" y1="10.188" y2="42.103" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0077d2"/><stop offset="1" stop-color="#0b59a2"/></linearGradient><circle cx="13.766" cy="29.909" r="1.818" fill="url(#poJZVVZccPEkB34rORM4nu)"/><linearGradient id="poJZVVZccPEkB34rORM4nv" x1="3.168" x2="36.274" y1="-.04" y2="31.875" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0077d2"/><stop offset="1" stop-color="#0b59a2"/></linearGradient><circle cx="34.234" cy="29.909" r="1.818" fill="url(#poJZVVZccPEkB34rORM4nv)"/><linearGradient id="poJZVVZccPEkB34rORM4nw" x1="-11.24" x2="21.867" y1="14.906" y2="46.821" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0077d2"/><stop offset="1" stop-color="#0b59a2"/></linearGradient><circle cx="7.86" cy="33.318" r="1.364" fill="url(#poJZVVZccPEkB34rORM4nw)"/><linearGradient id="poJZVVZccPEkB34rORM4nx" x1="4.309" x2="37.415" y1="-1.223" y2="30.692" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0077d2"/><stop offset="1" stop-color="#0b59a2"/></linearGradient><circle cx="40.14" cy="33.318" r="1.364" fill="url(#poJZVVZccPEkB34rORM4nx)"/><linearGradient id="poJZVVZccPEkB34rORM4ny" x1="-4.715" x2="28.392" y1="8.137" y2="40.052" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0077d2"/><stop offset="1" stop-color="#0b59a2"/></linearGradient><circle cx="24" cy="35.818" r="1.818" fill="url(#poJZVVZccPEkB34rORM4ny)"/><linearGradient id="poJZVVZccPEkB34rORM4nz" x1="-8.913" x2="24.194" y1="12.492" y2="44.407" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0077d2"/><stop offset="1" stop-color="#0b59a2"/></linearGradient><circle cx="16.5" cy="36.99" r="1.364" fill="url(#poJZVVZccPEkB34rORM4nz)"/><linearGradient id="poJZVVZccPEkB34rORM4nA" x1="-1.688" x2="31.419" y1="4.997" y2="36.912" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0077d2"/><stop offset="1" stop-color="#0b59a2"/></linearGradient><circle cx="31.5" cy="36.99" r="1.364" fill="url(#poJZVVZccPEkB34rORM4nA)"/><linearGradient id="poJZVVZccPEkB34rORM4nB" x1="-12.894" x2="20.213" y1="16.621" y2="48.536" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0077d2"/><stop offset="1" stop-color="#0b59a2"/></linearGradient><circle cx="13.545" cy="42.109" r=".909" fill="url(#poJZVVZccPEkB34rORM4nB)"/><linearGradient id="poJZVVZccPEkB34rORM4nC" x1="-2.822" x2="30.284" y1="6.174" y2="38.089" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0077d2"/><stop offset="1" stop-color="#0b59a2"/></linearGradient><circle cx="34.455" cy="42.109" r=".909" fill="url(#poJZVVZccPEkB34rORM4nC)"/><linearGradient id="poJZVVZccPEkB34rORM4nD" x1="-8.121" x2="24.985" y1="11.671" y2="43.586" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0077d2"/><stop offset="1" stop-color="#0b59a2"/></linearGradient><circle cx="24" cy="42.636" r="1.364" fill="url(#poJZVVZccPEkB34rORM4nD)"/></svg>',
//     '<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><path fill="#263238" d="M38.193,7H44L31.92,18.98c-2.111,2.079-4.956,3.245-7.92,3.245s-5.808-1.166-7.92-3.245L4,7h5.807	l9.179,9.084c1.338,1.319,3.14,2.059,5.019,2.059c1.879,0,3.681-0.74,5.019-2.059L38.193,7z"/><path fill="#263238" d="M29.024,31.916c-1.338-1.319-3.14-2.059-5.019-2.059c-1.879,0-3.681,0.74-5.019,2.059L9.807,41H4	l12.08-11.98c2.111-2.079,4.956-3.245,7.92-3.245s5.808,1.166,7.92,3.245L44,41h-5.807L29.024,31.916z"/></svg>'
// ]


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
async function update_data(test_mode=false){
    coins.forEach((coin) => {
        request_coins(coin).then((x) => {
            if (x['error'] != undefined || test_mode == true) {
                for (let i = 0; i < 100; i++) {
                    coin_data.push(Math.floor(Math.random()*100000))
                    volume.push(Math.floor(Math.random()*100))
                }
                
                all_coin_data[coin] = coin_data
                all_volume_traded[coin] = volume
                
                volume = []
                coin_data = []
            }
                else {
                    for (let i = 0; i < x.length; i++) {
                        coin_data.push(x[i]['price_close'])
                        volume.push(x[i]['volume_traded'])
                    }
                    all_coin_data[coin] = coin_data
                    all_volume_traded[coin] = volume
                    
                    volume = []
                    coin_data = []
                    sleep(1000)
                }
        }
        )
    })
    setTimeout(main, 1000)
}


const time_labels = []


update_data(TEST_MODE)

function reload_website(){
    
    var now = new Date()
    var time = now.getHours()
    if (time > 8 < 16) {
        console.log('attempting to reload...')
        location.reload()
    }    
}

setInterval(reload_website, INTERVALS_IN_MINUTES*60*1000);

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
    
        // const change = ((most_recent_price - previous_price) / previous_price * 100)
        const min_max = [Math.max(...all_coin_price), Math.min(...all_coin_price)]
        const four_day_avg = (all_coin_price.reduce((a,b)=>a+b)) / all_coin_price.length
        const one_day_avg = (all_coin_price.slice(all_coin_price.length-24, -1).reduce((a,b) => a+b) / 24)
    
        stats = []
        stats.push(most_recent_volume_trade)
        stats.push(min_max)
        stats.push(one_day_avg.toFixed(3))
        stats.push(four_day_avg.toFixed(3))
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
        text_container_template.childNodes[3].innerHTML += "<p class='stat'id=+"+coin+"> " + stats[1][0] + " / " + stats[1][1] + "</p>"
        text_container_template.childNodes[5].innerHTML += "<p class='stat'id=+"+coin+"> " + stats[2] + "</p>"
        text_container_template.childNodes[7].innerHTML += "<p class='stat'id=+"+coin+"> " + stats[3] + "</p>"

        
        graph_container.appendChild(text_container_template)
        container.appendChild(graph_container)
    
        

        

        data = {
            labels: fake_label,
            datasets: [make_dataset(coin, all_coin_data[coin])]
        }
        
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