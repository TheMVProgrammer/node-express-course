const express = require('express');
const app = express();
const { products } = require('./data');

app.get('/', (req, res) => {
    res.status(200).send('Home Page');
});

app.get('/about', (req, res) => { 
    res.status(200).send('About Page'); 
});    

app.get('/api/products', (req, res) => { 
    const newProducts = products.map(product => {
        const { id, name, image } = product;
        return { id, name, image }
    })

    res.status(200).send(newProducts); 
});  

app.get('/api/products/:product_id', (req, res) => { 
    const { product_id } = req.params;
    const singleProduct = products.find(product => product.id === Number(product_id));
    if(!singleProduct) {
        return res.status(404).send('<h1>Product not found</h1>');
    }

    return res.status(200).json(singleProduct); 
});     

app.get('/api/products/:product_id/reviews/:review_id', (req, res) => {
    console.log(req.params);
    res.send('Hello world');
});

app.get('/api/v1/query', (req, res) => {
    console.log(req.query);
    const { search, limit } = req.query;
    let sortedProducts = [...products];

    if(search) {
        sortedProducts = sortedProducts.filter(product => {
            return product.name.startsWith(search);
        });
    }
    if(limit) {
        sortedProducts = sortedProducts.slice(0,  Number(limit));
    }
    if(sortedProducts.length < 1) {
        return res.status(200).json({success: true, data:[]});
    }
    
    res.status(200).json(sortedProducts);

});

app.all('*', (req, res) => {
    res.status(404).send('<h1>Resource not found</h1>');
});

app.listen(5000, () => {
    console.log('The server is listening on port 5000...');
});

//app.get
//app.post
//app.put
//app.delete
//app.all
//app.use
//app.listen

