const express = require('express');
const handlebars = require('express-handlebars');
const livereload = require('connect-livereload');
const morgan = require('morgan');
const path = require('path');

const data = require('./data.js');

const app = express();

app.use(morgan('dev'));

app.use('/node_modules', express.static('node_modules/'));
app.use(express.static('src/'));

const handlebarOptions = {
	extname: 'hbs',
	partialsDir: 'src/partials',
	helpers: {
		times: (n, block) => {
			var accum = '';
			for(var i = 0; i < n; ++i)
					accum += block.fn(i);
			return accum;
		}
	}
};

app.engine('.hbs', handlebars(handlebarOptions));
app.set('view engine', '.hbs');

// Resolve all view in /src path
app.set('views', path.resolve('src'));

app.use(livereload());
app.get('/', function (req, res) {
	res.render('index.hbs', data);
});


app.listen(3000);
