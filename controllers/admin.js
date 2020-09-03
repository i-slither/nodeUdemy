// controllers for products

const Products = require('../models/products');

exports.getAddProduct = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html');
    
    res.render('admin/edit-product', {
        pageTitle: 'add-product',
        path: '/admin/add-product',
        editing: false
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

exports.getEditProduct = (req, res, next) => {
   const editMode = req.query.edit;   
   if (!editMode) {
        return res.redirect('/');
   }
   const prodId = req.params.productId;
   Products.findById(prodId, product => {    
    if (!product) {
        return res.redirect('/');
    }     
    res.render('admin/edit-product', {
           pageTitle: 'Edit-product',
           path: '/admin/edit-product',
           editing: editMode,
           product: product
       });

   });
};

exports.postEditProduct = (req, res, next) => {
    
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

