require('dotenv').config()
const app = require('./src/app')

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});