const fs = require('fs');
const path = require('path');
// const products = [];
const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
const getProductsFromFile = callback => {
    fs.readFile(p, (err, fileContent) => {
        if (err)
        // console.log(err);
        callback([]);
        else callback(JSON.parse(fileContent));
    });
};

module.exports = class Products {
    constructor(title, imageUrl, price, description) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save() {
        this.id = Math.random().toString();
        getProductsFromFile((products) => {
            // console.log(this);
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
                console.log(err);//parsing the incoming data and writing it to products.json file in json format.
            });
        });
        
    }
    
    
    static fetchAll(callback) {
        getProductsFromFile(callback);
        // const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
        // fs.readFile(p, (err, fileContent) => {
            //     if (err) {
                //         console.log(err);
                //         return callback([]);
        //     }
        //     callback(JSON.parse(fileContent));
        // });
    }

    static findById(id, callback) {
        getProductsFromFile((products) => {
            const product = products.find(p => p.id === id);
            callback(product);
        });
    }
};