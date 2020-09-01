// controllers for products

const Products = require('../models/products');

exports.getAddProduct = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html');
    
    res.render('admin/add-product', {
        pageTitle: 'add-product',
        path: '/admin/add-product',
        // productCss: true,
        // formsCss: true,
        // activeAddProduct: true
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Products(title, imageUrl, price, description);
    product.save();
    res.redirect('/');
};

exports.getAdminProducts = (req, res, next) => {
    Products.fetchAll((products) => {
        res.render('admin/product-list', {
            prods: products,
            pageTitle: 'Products',
            path: '/admin/products',
        });
    });
};

