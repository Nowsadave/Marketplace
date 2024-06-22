const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Product = require('./models/Product'); // Ensure the Product model is imported

const app = express();
const port = 8080;

// MongoDB Connection String
const mongoURI = 'mongodb+srv://nowsadave:Twitter%4022@cluster0.qze2s20.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI)
    .then(async () => {
        console.log('MongoDB connected');
        
        // Insert sample data if the collection is empty
        try {
            const productCount = await Product.countDocuments({});
            if (productCount === 0) {
                const sampleProducts = [
                    { name: 'Shirt', description: 'Cotton shirt', price: 29.99, quantity: 100, category: 'Clothing' },
                    { name: 'Pants', description: 'Denim jeans', price: 49.99, quantity: 200, category: 'Clothing' }
                ];
                await Product.insertMany(sampleProducts);
                console.log('Sample products inserted');
            }
        } catch (err) {
            console.log('Error inserting sample products:', err);
        }
    })
    .catch(err => console.log('MongoDB connection error:', err));

app.use(cors());
app.use(bodyParser.json());

// Import Routes
const productRoutes = require('./routes/productRoutes');

// Use Routes
app.use('/api/products', productRoutes);

// Default route handler
app.get('/', (req, res) => {
    res.send('Welcome to DressStore ');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
