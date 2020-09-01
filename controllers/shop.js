const Products = require('../models/products');
const Cart = require('../models/cart');
exports.getProducts = (req, res, next) => {
    // console.log('shop.js', adminData.products);
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    // const products = adminData.products;
    Products.fetchAll((products) => {// here we are checking if there is any products with the fetchAll method. Upon returning the argument in the callback returns back with values from the products.json file... also instead of a variable we are sending the data as a parameter of the callback... 

        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products',
            // hasProduct: products.length > 0,
            // activeShop: true,
            // productCss: true
        });
    });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Products.findById(prodId, product => {
        res.render('shop/product-view', {
            product : product,
            pageTitle : product.title,
            path: '/products'
        });
    });
    
};

exports.getIndex = (req, res, next) => {
    Products.fetchAll((products) => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
        });
    });
};

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart'
    });
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Products.findById( prodId, product => {
        Cart.addProduct(prodId, product.price);    
    });
    res.redirect('/cart');
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout'
    });
};
exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'Your Orders',
        path: '/orders'
    });
};

