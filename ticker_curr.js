module.exports = (ticker_curr, app, mongo_data,axios)=>{
    app.get("/find_data",(req, res)=>{
        axios.get("https://api.nomics.com/v1/currencies/ticker?key=f18f5cd0afd42cbfd6f6359510d62ebc")
        .then((data)=>{
             var C_data = new mongo_data({'data':data.data})
             C_data.save((err,data)=>{
                 if (err) {
                     console.log(err)
                 }else{
                     console.log(data)
                 }
             })
            res.send({'status':"data saved"});
        })
        .catch((err)=>{
            res.send("some thing is going error !")
        })
    
    })

    app.get("/get_data",(req, res)=>{
        mongo_data.find({},function(err, data){
            if(err){
                console.log(err)
            }else{
                let currency_data = []
                for(var dict_data of data[0].data){
                    // console.log(dict_data)
                    // break
                    currency_data.push({"currency":dict_data.currency,
                    "symbol":dict_data.symbol,"name":dict_data.name,"logo_url":dict_data.logo_url,
                    "rank":dict_data.rank,"price":dict_data.price,"price_date":dict_data.price_date,
                    "market_cap":dict_data.market_cap,"circulating_supply":dict_data.circulating_supply,
                    "max_supply":dict_data.max_supply,"high":dict_data.high,"high_timestamp":dict_data.high_timestamp})
                }
                console.log(currency_data);
                        }
        })
        
    })
}