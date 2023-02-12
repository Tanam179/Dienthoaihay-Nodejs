require('dotenv').config();
import express from 'express'
import helmet from 'helmet';
import path from 'path';
import cors from 'cors'
import Category from './models/category.js';

import Product from './models/product.js';
import Variant from './models/variant.js';
import Color from './models/color.js';
import Memory from './models/memory.js';
require('./utils/connectDB.js')

const app = express();
const port = process.env.APP_PORT;

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'src/public')));
app.use(
    cors({
        origin: 'http://localhost:3000/',
        methods: ['GET', 'PUT', 'POST', 'DELETE'],
    })
);
app.use(
    helmet.contentSecurityPolicy({
        useDefaults: true,
        directives: {
            defaultSrc: ["'self'"],
            connectSrc: ["'self'"],
            scriptSrc: ["'self'", 'https://unpkg.com/phosphor-icons', 'https://unpkg.com/axios/dist/axios.min.js'],
            styleSrc: ["'self'", 'https://unpkg.com/phosphor-icons@1.4.2/src/css/icons.css', "https://unicons.iconscout.com/release/v4.0.0/css/line.css"]
        }
    })
);

// VIEWS SETUP
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'src/views/pages'));


app.get('/', (req, res) => {
    res.status(200).render("client/home")
})

app.get('/details', (req, res) => {
    res.status(200).render("client/productDetail")
})

app.get('/category', async (req, res) => {
    try {
        const allCate = await Category.find();
        res.status(200).json({
            status: "success",
            data: {
                category: allCate
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error
        })
    }
})

app.post('/category', async (req, res) => {
    try {
        const cate = await Category.create({
            name: req.body.categoryName,
            parentId: req.body.parentId
        });
        res.status(200).redirect('/admin/category/all')
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error
        })
    }
})

app.get('/color', async (req, res) => {
    try {
        const color = await Color.find();
        res.status(200).json({
            status: "Success",
            data: {
                color
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error
        })
    }
})

app.post('/color', async (req, res) => {
    try {
        const color = await Color.create(req.body);
        res.status(200).json({
            status: "Success",
            data: {
                color
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error
        })
    }
})

app.get('/memory', async (req, res) => {
    try {
        const memory = await Memory.find();
        res.status(200).json({
            status: "Success",
            data: {
                memory
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error
        })
    }
})

app.post('/memory', async (req, res) => {
    try {
        const memory = await Memory.create(req.body);
        res.status(200).json({
            status: "Success",
            data: {
                memory
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error
        })
    }
})

app.post('/find-product-by-name', async (req, res) => {
    try {
        // const productName = req.body.name;
        // const 
    } catch (error) {
        
    }
})

app.post('/product', async(req, res) => {
    try {
        const product = await Product.create({
            name: req.body.name,
            options: [
                {
                    colorId: {
                        value: "63aa9cf635ba6819c31da73f",
                        image: "den_1662970931.jpg"
                    },
                    memory: "63aa9de7835225f7d2b914bb",
                    quantity: 10,
                },
                {
                    colorId: {
                        value: "63aa9cf635ba6819c31da73f",
                        image: "den_1662970931.jpg"
                    },
                    memory: "63aa9dfa835225f7d2b914bd",
                    quantity: 15,
                    extraPrice: 3000000
                },
            ],
            cateId: req.body.cateId,
        });
        const productId = product._id;

        const variantProd = await Variant.create({
            originalPrice: 33000000,
            description: "iPhone 14 Pro Max chính hãng VN/A mới Fullbox, chưa qua sử dụng, phụ kiện chuẩn gồm hộp, thân máy, dây sạc USB-C to Lightning, sách HDSD và que chọc sim",
            images: ['vang_1662970924.jpg', 'tim_1662970546.jpg', 'trang_1662970932.jpg', 'den_1662970931.jpg'],
            properties: [{key: 'Thẻ SIM: ', value: 'Nano + eSim'}, {key: 'Kiểu thiết kế: ', value: '2 mặt kính, khung thép'}, {key: 'Độ phân giải: ', value: '1290 x 2796 pixels, tỷ lệ 19.5:9'}],
            productId
        })

        res.status(200).json({
            status: "success",
            data: {
                product
            }
        })

    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error
        })
    }
})

app.get('/product/:id', async(req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate({ 
            path: 'options.color.value',
            select: 'options amount extraPrice -_id -productId',
            populate: {
              path: 'options.key',
              select: "name -_id"
            } 
        }).populate('variant', 'originalPrice description images properties -_id');

        // const name = product.name;
        // const {originalPrice, description, images} = product.variant[0];

        // let options = {};
        // product.options.forEach(el => {
        //     const optionsChild = el.options;
        //     optionsChild.forEach(el => {
        //         if(Array.isArray(options[el.key.name])){
        //             options[el.key.name].push(el.value)
        //         } else {
        //             options[el.key.name] = [el.value];
        //         }
        //     })
        // })

        // for(let i in options) {
        //     options[i] = [...new Map(options[i].map(item =>
        //         [item['title'], item])).values()];
        // }

        // console.log(options);

        // res.status(200).render('client/productDetail', {
        //     name,
        //     originalPrice,
        //     description,
        //     images,
        //     options
        // })
        res.status(200).json({
            status: "success",
            data: {
                product
            }
        })

    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message
        })
    }
})

app.get('/test', (req, res) => {
    res.render('client/test');
})

app.post('/test', (req, res) => {
    console.log(req.body);
    for(let i in req.body.colorsValue) {
        console.log(req.body.colorsValue[i], req.body.colorsImage[i], req.body.memorys[i], req.body.stocks[i], req.body.extraPrices[i]);
    }

    res.json({
        colorValue: req.body.colorsValue,
        colorImage: req.body.colorsImage,
        memoryValue: req.body.memorys,
        onStock: req.body.stocks,
        extraPrice: req.body.extraPrices
    })
})

app.get('/admin-dashboard', (req, res) => {
    res.status(200).render('admin/dashboard')
})

app.get('/admin/category/all', async (req, res) => {
    const category = await Category.find();
    
    const arrCate = [];
    
    for(let cate of category) {
        const cateAndParent = {};
        cateAndParent.cate = cate.name;

        if(cate.parentId !== '0') {
            const parent = await Category.findById(cate.parentId);
            cateAndParent.parent = parent.name;
        }
        arrCate.push(cateAndParent);
    }

    console.log(arrCate);
    res.status(200).render('admin/category/all', { arrCate });
})

app.get('/admin/category/add', (req, res) => {
    res.status(200).render('admin/category/add');
})

app.get('/admin/product/all', async (req, res) => {
    res.status(200).render('admin/product/all')
})

app.get('/admin/product/add', async (req, res) => {
    res.status(200).render('admin/product/add')
})

app.listen(port, function() {
    console.log(`App is running on port ${port}`);
})