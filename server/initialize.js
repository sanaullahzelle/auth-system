const sequelize = require('./config/db');
const User = require('./models/User');

async function test() {
  try {
    console.log('Testing database connection...');
    await sequelize.authenticate();
    console.log('✅ Connection successful');
    
    console.log('Testing model definition...');
    await User.sync({ force: false });
    console.log('✅ Model definition successful');
    
    return true;
  } catch (error) {
    console.error('❌ Test failed:', error);
    return false;
  } finally {
    await sequelize.close();
  }
}

test().then(success => process.exit(success ? 0 : 1));