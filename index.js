const express = require('express');
const { hidePoweredBy } = require('helmet');
const { port } = require('./config.js');

const app = express();

app.use(hidePoweredBy());
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.get('*', (req, _, next) => {
	console.log(`GET ${req.originalUrl}`);
	next();
});

app.get('/', (req, res) => {
	res.status(423).render('index');
});

app.get('/server', (req, res) => {
	res.redirect('https://discord.gg/uV6HsqxBBC');
});

app.get('/serverUrl', (req, res) => {
	res.redirect('https://discord.gg/uV6HsqxBBC');
});

app.use((req, res) => {
	res.status(404).send('<h1>ERROR 404</h1>Podana strona nie istnieje.<br><br><a href="/">Strona główna</a>');
	console.log(`Cannot GET: ${req.originalUrl} [404]`);
});

app.use((err, req, res, next) => {
	res.status(500).send('<h1>ERROR 500</h1>Coś poszło nie tak.');
	console.log(`Cannot GET: ${req.originalUrl} [500]\n${err}`);

	return next;
});

app.listen(port, null, null, () => console.log(`Tymczasowa strona została uruchomiona na porcie ${port}.`));