const {Troop} = require('./troops');
const {Divinity} = require('./divinity');
const {City} = require('./city');

function main() {
	const g1 = new Divinity('Poseidon', 100, 0);
	const g2 = new Divinity('Athena', 100, 1);
	const c1 = new City('Troie', 100, 0);
	const c2 = new City('Athene', 100, 1);
	g1.init();
	g2.init();
	c1.init();
	c2.init();
	console.log('test');
}


main();