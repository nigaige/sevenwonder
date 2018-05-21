const EventEmitter = require('events');
const {City} = require('./city');

class Divinity {
	constructor(name, timeFactor, id) {
		this.name_ = name || 'UNKDIVINITY';
		this.corn_ = 0;
		this.gold_ = 0;
		this.worldEvents_ = new EventEmitter();
		this.timeFactor_ = timeFactor || 1000;
		this.id_ = id || 0;
	}

	init() {
		this.gaiaInterval_ = setInterval(() => {
			console.log('divinity' + this.name + ' turn\n');

			this.worldEvents.emit('favor', {
				corn: this.corn * 0.1,
				gold: this.gold * 0.1
			});
			console.log('favor:\ncorn :' + (this.corn * 0.1) +
			'\ngold : ' + (this.gold * 0.1) + '\n');

			if (Math.random() > 0.95) {
				this.worldEvents.emit('blessing', {
					corn: 100 * this.corn,
					gold: 100 * this.gold
				});
				console.log('a blessing is granted:\ncorn :' + (this.corn * 100) +
				'\ngold : ' + (this.gold * 100) + '\n');
			}

			if (Math.random() > 0.99) {
				this.worldEvents.emit('retribution', Math.floor(10000 * Math.random()));
			}
		}, this.timeFactor);
/*
		City.addEventListener('offerCorn', (id, a) => this.offeringCorn(id, a));

		City.addEventListener('offerGold', (id, a) => this.offeringGold(id, a));*/
	}

	offeringCorn(id, offer) {
		if (id === this.id) {
			return new Promise((resolve, reject) => {
				if (typeof offer === 'number') {
					setTimeout(() => {
						this.corn_ = (offer >= 0) ? this.corn + offer : 0;
						resolve();
					}, 4 * this.timeFactor * Math.random());
				} else {
					reject(new Error(
						`You didn't gave a number of corn to ${this.name}, Earth collapsed`
					));
				}
			});
		}
	}

	offeringGold(id, offer) {
		if (id === this.id) {
			return new Promise((resolve, reject) => {
				if (typeof offer === 'number') {
					setTimeout(() => {
						this.gold_ = (offer >= 0) ? this.gold + offer : 0;
						resolve();
					}, 4 * this.timeFactor * Math.random());
				} else {
					reject(new Error(
						`You didn't gave a number of gold to ${this.name}, Earth collapsed`
					));
				}
			});
		}
	}

	get corn() {
		return this.corn_;
	}

	get gold() {
		return this.gold_;
	}

	get worldEvents() {
		return this.worldEvents_;
	}

	get name() {
		return this.name_;
	}

	get timeFactor() {
		return this.timeFactor_;
	}

	endWorld() {
		clearInterval(this.gaiaInterval_);
	}

	get id() {
		return this.id_;
	}
}

module.exports = {Divinity};
