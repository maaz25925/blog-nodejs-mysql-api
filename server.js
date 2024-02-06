const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) =>
    err
        ? console.error(`Error starting server: ${err}`)
        : console.log(`Server running at http://localhost:${PORT}`)
);
