const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const admin = await User.findOne({ username: 'admin' });

        if (admin) {
            console.log('Admin user found. Updating password...');
            admin.password = 'manner';
            await admin.save(); // pre-save hook will hash it
            console.log('Admin password updated to: manner');
        } else {
            console.log('Admin not found. Creating new...');
            const newAdmin = new User({
                username: 'admin',
                email: 'admin@luxe.com',
                password: 'manner',
                role: 'admin'
            });
            await newAdmin.save();
            console.log('Admin created with password: manner');
        }
    } catch (error) {
        console.error(error);
    } finally {
        process.exit();
    }
};

run();
