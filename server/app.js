require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');

const app = express();


app.use(cors());
app.use(express.json());


const User = require('./models/User');
const authRoutes = require('./routes/authRoutes');


async function initialize() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established');
    
    await sequelize.sync();
    console.log('🔄 Database synchronized');
    
 
    app.use('/api/auth', authRoutes);
    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Initialization error:', error);
    process.exit(1);
  }
}

initialize();