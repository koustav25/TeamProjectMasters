const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//Load routers
const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const authRouter = require('./routes/authentication');
const dataRouter = require('./routes/data');
const paymentRouter = require('./routes/payment');
const marketplaceRouter = require('./routes/marketplace');
const userRouter = require('./routes/user');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/stylesheets", express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")))
app.use("/javascripts", express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")))
app.use("/javascripts", express.static(path.join(__dirname, "node_modules/jquery/dist")))

// Most routes start with / rather than /<name of file> as the files are being used as descriptive groups of routes
app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/', authRouter);
app.use('/', dataRouter);
app.use('/', paymentRouter);
app.use('/', marketplaceRouter);
app.use('/', userRouter);

app.get('/debug_routes', function (req, res) {
    let routes = [];
    app._router.stack.forEach(function (middleware) {
        if (middleware.route) {
            routes.push(middleware.route.path);
        } else if (middleware.name === 'router') {
            //Extract the base route from the middleware regex
            var root = middleware.regexp.toString().split('|')[0];
            root = root.slice(3, root.length - 1);
            //Remove '?(?=\/' from the string
            root = root.replace('?(?=\\', '');
            root = root.replace('\\/', '');
            //If the root is just a slash, remove it
            if (root === '/') root = '';

            middleware.handle.stack.forEach(function (handler) {
                let route = handler.route;
                route && routes.push(root + route.path);
            });
        }
    });

    //Sort the routes alphabetically
    routes = routes.sort();

    //Remove duplicate routes
    routes = routes.filter(function (item, pos, self) {
        return self.indexOf(item) == pos;
    });

    res.render('debug_links', {routes: routes});
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
