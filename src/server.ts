import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { engine } from 'express-handlebars';

/**
 * Define a base class for application-specific errors.
 */
class AppError extends Error {
    code: string = 'unknown_error';
}

/**
 * Define an error class for authentication-related errors.
 */
class AuthenticationError extends AppError {
    code: string = 'auth_error';
}

/**
 * Define an error class for missing required fields.
 */
class RequiredFieldError extends AppError {
    code: string = 'required_field_error';
}

/**
 * Create an instance of the Express application.
 */
const app = express();

/**
 * Helper to format a number as Brazilian Reais currency.
 * @param {number} value - The number to format.
 * @returns {string} - The formatted currency string.
 */
const formatCurrencyBRL = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
};

/**
 * Set Handlebars as the template engine with custom helpers.
 */
app.engine('handlebars', engine({
    helpers: {
        /**
         * Custom helper to check if two string values are equal.
         * @param a First string value
         * @param b Second string value
         * @returns True if the values are equal, false otherwise
         */
        equals: (a: string, b: string) => a == b,
        formatCurrencyBRL // Register the new helper
    }
}));

/**
 * Set the view engine to Handlebars.
 */
app.set('view engine', 'handlebars');

/**
 * Set the directory for Handlebars views.
 */
app.set('views', path.resolve(__dirname, '..', 'views'));

/**
 * Serve static files from the "static" directory.
 */
app.use('/static', express.static(path.resolve(__dirname, '..', 'static')));

/**
 * Route to render the "simple" template without a layout.
 */
app.get('/simple', (req, res) => {
    res.render('simple', {
        layout: false,
        value1: 'Example Value 1',
        value2: 'Example Value 2'
    });
});

/**
 * Route to render the homepage using the "home" template.
 */
app.get('/', (req, res) => {
    res.render('home', {
        title: 'Home Page'
    });
});

/**
 * Route to render the "say-name" template with first and last name parameters.
 */
app.get('/saymyname/:fname/:lname', (req, res) => {
    res.render('say-name', {
        fname: req.params.fname,
        lname: req.params.lname
    });
});

/**
 * Route to render the "say-name" template with an alternate layout.
 */
app.get('/saymyname2/:fname/:lname', (req, res) => {
    res.render('say-name', {
        layout: 'alternate.handlebars',
        fname: req.params.fname,
        lname: req.params.lname
    });
});

/**
 * Route to render the "say-name" template with layout partials.
 */
app.get('/partials-example', (req, res) => {
    res.render('say-name', {
        layout: 'layout-partials.handlebars',
        fname: 'John',
        lname: 'Doe'
    });
});

/**
 * Route to render the "list" template, demonstrating the "each" block helper.
 */
app.get('/list', (req, res) => {
    res.render('list', {
        items: ['Item 1', 'Item 2', 'Item 3', 'Item 4']
    });
});

/**
 * Route to render the "products" template with a list of products.
 * Demonstrates the use of each block helper to iterate over the objects array.
 */
app.get('/products', (req, res) => {
    res.render('products', {
        products: [
            { name: 'Product 1', price: 19.99, description: 'Description for Product 1' },
            { name: 'Product 2', price: 29.99, description: 'Description for Product 2' },
            { name: 'Product 3', price: 39.99, description: 'Description for Product 3' }
        ]
    });
});

/**
 * Route to render the "products-partials" template with layout partials and a list of products.
 */
app.get('/products-partials', (req, res) => {
    res.render('products-partials', {
        layout: 'layout-partials.handlebars',
        products: [
            { name: 'Product 1', price: 19.99, description: 'Description for Product 1' },
            { name: 'Product 2', price: 29.99, description: 'Description for Product 2' },
            { name: 'Product 3', price: 39.99, description: 'Description for Product 3' }
        ]
    });
});

/**
 * Route to render the "profile" template, demonstrating the "if" block helper.
 */
app.get('/profile', (req, res) => {
    res.render('profile', {
        isLoggedIn: true,
        username: 'JaneDoe',
        isAdmin: false
    });
});

/**
 * Route to render the "unless-example" template, demonstrating the "unless" block helper.
 */
app.get('/unless-example', (req, res) => {
    res.render('unless-example', {
        isLoggedIn: false,
        username: 'Guest'
    });
});

/**
 * Middleware to handle 404 errors by rendering the "not-found" template.
 */
app.use((req, res) => {
    res.status(404).render('not-found');
});

/**
 * Artificial route to force throwing an authentication error.
 */
app.get("/error-a", (req, res) => {
    throw new AuthenticationError("User or password does not match");
});

/**
 * Artificial route to force throwing a required field error.
 */
app.get("/error-b", (req, res) => {
    throw new RequiredFieldError("A required field is missing");
});

/**
 * Middleware to handle server errors by rendering the "error" template.
 * Logs the error stack trace to the console. And select an appropriate error code.
 * If the error is an instance of AppError, use its code; otherwise, use a generic error code.
 */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    // logs the error to help with debugging
    console.error(err.stack);
    // send a user-friendly error page
    return res.status(500).render('error', {
        code: (err as AppError).code || 'unknown_error'
    });
});

const port = parseInt(process.argv[2]) || 3000;

/**
 * Start the server and listen on the specified port.
 */
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});