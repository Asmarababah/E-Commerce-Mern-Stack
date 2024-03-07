//initialize all dependencies and moduls
const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");  //include path in express server
const cors = require("cors");
const { log } = require("console");

// any req automatically passed through json
app.use(express.json());
// react connect with express app at port 4000
app.use(cors({
    origin: [
        "http://localhost:4000",
        "https://e-commerce-mern-stack-6dgz.onrender.com/"
    ]
}));

// connect with database using mongodb
mongoose.connect("mongodb+srv://asmarababah86:Passpasspass1993@cluster0.b2isyhe.mongodb.net/e-commerce");


//api creation by end points
app.get("/", (req, res) => {
    res.send("express app is running");
})


// image storage engine (by multer)
const storage = multer.diskStorage({
    destination: "./upload/images",
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})


// to generate upload storage through multer
const upload = multer({ storage: storage });

app.use('/images', express.static('upload/images'));

// end point to upload image
app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`,
    })
})

//add product to mongodb
// firstly build the schema OR MODEL
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: false,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
})

//ADD PRODUCT AND SAVE ON DATABASE
app.post("/addproduct", async (req, res) => {
    try {
        let products = await Product.find({});
        let id;
        if (products.length > 0) {
            let last_product_array = products.slice(-1); // make array of product start from last value
            let last_product = last_product_array[0]; // save last value on variable
            id = last_product.id + 1;
        }
        else {
            id = 1;
        }

        const product = new Product({
            id: id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
        });
        console.log(product);
        await product.save();    //add to database
        console.log("saved");
        res.json({              // to generate data as json
            success: true,
            name: req.body.name,
        });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ success: false, error: 'Failed to add product' });
    }
});


//DELETING PRODUCT
app.post("/removeproduct", async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name,
    })
})


//DISPLAY PRODUCT ON FRONTEND
//firstly gitting all products
app.get("/allproducts", async (req, res) => {
    let products = await Product.find({});
    console.log("All Product Is Fetched");
    res.send(products);
})

//API FOR USER AND SAVE CART FOR US
//Schema creating for user model

const Users = mongoose.model("Users", {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

// creating api for register user
app.post("/signup", async (req, res) => {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, errors: "This email already used" });
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }

    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })

    //save user on database
    await user.save();

    const data = {
        user: {
            id: user.id,
        }
    }

    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token });
})

//API FOR USER LOGIN

app.post("/login", async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id,

                }
            }
            const token = jwt.sign(data, "secret_ecom");
            res.json({ success: true, token });
        }
        else {
            res.json({ success: false, errors: "Wrong Password" });   //if password is wrong
        }
    }
    else {   //if email not exist yo should signup
        res.json({ success: false, errors: "Wrong email" });
    }
})


//creating middleware to fetch user
const fetchUser = async (req, res, next) => {  //extract user information and pass it through request
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ errors: "Please authenticate using valid token" });
    }
    else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        }
        catch (error) {
            res.status(401).send({ errors: "please authenticate using valid token" });
        }
    }
}

app.get('/allusers', async (req, res) => {
    try {
        const users = await Users.find(); // Retrieve all users from the database
        res.json(users); // Return the list of users as JSON response
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/getUserNameByEmail', async (req, res) => {
    try {
        const { email } = req.body; // Extract email from the request body
        const user = await Users.findOne({ email }); // Find the user by email
        if (user) {
            res.json({ userName: user.name }); // Return the user's name as JSON response
        } else {
            res.status(404).json({ error: 'User not found' }); // If user not found, return 404 error
        }
    } catch (error) {
        console.error('Error fetching user by email:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

//Adding Products and save on cartData (mongodb)
app.post("/addtocart", fetchUser, async (req, res) => {
    let userData = await Users.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Added");
})

//Removing Products from cartData (mongodb)
app.post("/removefromcart", fetchUser, async (req, res) => {
    let userData = await Users.findOne({ _id: req.user.id });
    if (userData.cartData[req.body.itemId] > 0)
        userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Removed");
})

//Get cartData and retrive default value
app.post('/getcart', fetchUser, async (req, res) => {
    console.log("Get Cart");
    let userData = await Users.findOne({ _id: req.user.id });
    res.json(userData.cartData);

})


//most Popular
app.get("/mostpopular", async (req, res) => {
    let products = await Product.find({});
    let mostpopular = products.slice(1).slice(-8);
    res.send(mostpopular);
})


//display information by id

app.get("/allproducts/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        console.log("Product is fetched successfully");
        res.json(product);
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

//Editing
app.put('/allproducts/:id', async (req, res) => {
    const productId = req.params.id;
    const updateData = req.body;

    try {
        // Find the product by ID and update it
        const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Return the updated product
        res.json(updatedProduct);
        await updatedProduct.save();
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Server error' });
    }
});


// Setting Up The Server
app.listen(port, (error) => {
    if (!error) {
        console.log("connecting on port:" + port)
    }
    else {
        console.log("Error:" + error);
    }
})



