const EventEmitter = require('events');
const {Troop} = require('./troops');
const {Divinity} = require('./divinity');

class City {
	constructor(name, timeFactor, id) {
		this.name_ = name || 'CITY';
		this.unite_ = new Array();
		this.corn_ = 0;
		this.gold_ = 0;
		this.nbUnite_ = 0;
		this.nbHealthyUnit_ = 0;
		this.farm_ = 1;
		this.cityEvents_ = new EventEmitter();
		this.timeFactor = timeFactor || 1000;
		this.id_ = id;
	}

	init() {
		this.cityInterval_ = setInterval(() => {
			/* AI */
			console.log('city ' + this.name + ' turn\n');
			// Gold Offer
			if (this.gold > (this.farm) * 75 || (this.farm === 0 && this.gold < 5)) {
				this.offerGold(this.gold - (this.farm * 75));
				console.log('offer of  ' + this.gold - (this.farm * 75) +
					' gold to the divinity\n');
				this.gold_ = this.gold - (this.farm * 75);
			}
			// Farm Buying
			if (this.gold > this.farm * 100) {
				this.buyFarm();
				console.log('buy a farm\n');
			}
			// Create Unit
			if (this.corn > (this.nbUnite + 1) * 20) {
				this.createUnite();
				console.log('create a new soldier\n');
			}
			// Corn Giving
			if (this.corn > (this.nbUnite * 20) + 40) {
				this.offerCorn(this.corn - ((this.nbUnite * 20) + 40));
				console.log('offer of  ' + (this.nbUnite * 20) + 40 +
					' corn to the divinity\n');
				this.corn_ = this.corn - ((this.nbUnite * 20) + 40);
			}
			// Update the statue of Army
			this.update();

			if (this.nbHealthyUnit > 10) {
				this.cityEvents_.emit('war', {
					id: this.id,
					power: this.nbHealthyUnit
				});
				console.log('is declaring a war');
			}
		}, this.timeFactor);
		/*
		Divinity.addEventListener('blessing', (a, b) => {
			this.gainCorn(a);
			this.gainGold(b);
		});

		Divinity.addEventListener('favor', (a, b) => {
			this.gainCorn(a);
			this.gainGold(b);
		});*/
		/*
		City.addEventListener('war', (idAttack, power) =>
			this.isAttack(idAttack, power));

		City.addEventListener('defense', (idAttack, power, loot) =>
			this.hasAttack(idAttack, power, loot));
		*/
	}

	update() {
		this.cleanArmy();
		this.healArmy();
		this.ageArmy();
		this.gainCorn(this.farm_);
	}

	offerCorn(quantity) {
		if (quantity > this.corn_) {
			quantity = this.corn_;
		}
		this.cityEvents_.emit('offerCorn', {
			id: this.id_,
			corn: quantity
		});
	}

	offerGold(quantity) {
		if (quantity > this.gold_) {
			quantity = this.gold_;
		}
		this.cityEvents_.emit('offerGold', {
			id: this.id_,
			gold: quantity
		});
	}

	buyFarm() {
		if (this.gold > this.farm_ * 100) {
			this.farm_++;
		}
	}

	createUnite() {
		if (this.corn > 20) {
			this.nbUnite_++;
			const soldier = new Troop();
			this.unite_.push(soldier);
			this.corn_ = this.corn - 20;
		}
	}

	cleanArmy() {
		this.unite_ = this.unite_.filter(a => a.isAlive_);
		this.nbUnite_ = this.unite_.length;
		console.log('soldier : ' + this.nbUnite + '\n');
	}

	healArmy() {
		this.unite_ = this.unite.map(soldier => soldier.heal());
		this.nbHealthyUnit_ = this.unite.filter(a => (a.blessure === 0)).length;
		console.log('in good health : ' + this.nbHealthyUnit + '\n');
	}

	ageArmy() {
		this.unite_ = this.unite.map(soldier => soldier.older());
	}

	woundUnite(damage) {
		this.unite_ = this.unite.map(soldier => soldier.hurt(damage));
	}

	isAttack(idAttack, power) {
		if (idAttack !== this.id) {
			const att = this.nbHealthyUnit;
			const loot = this.defense(power);
			this.cityEvents_.emit('defense', {
				id: this.id,
				power: att,
				loot: loot
			});
		}
	}

	hasAttack(idAttack, power, loot) {
		this.woundUnite(0.30 * power / this.nbUnite);
		this.getLoot(loot);
	}

	attack() {
		return this.unite.filter(
			this.unite.isAlive_ && !this.unite.blessure_).size();
	}

	getLoot(loot) {
		this.gold_ = this.gold + loot;
	}

	defense(attSize) {
		let loot = 0;
		if (attSize > this.nbUnite) {
			loot = this.gold * (attSize - this.nbUnite);
			this.woundUnite(0.70);
		} else {
			this.woundUnite(0.70 * (attSize / this.nbUnite));
		}
		return loot;
	}

	get unite() {
		return this.unite_;
	}

	get name() {
		return this.name_;
	}

	gainCorn(gain) {
		this.corn_ = this.corn + gain;
		console.log('earn ' + gain + 'corn thanks to its farm\n');
	}

	loseCorn(lost) {
		this.corn_ = this.corn - lost;
	}

	gainGold(gain) {
		this.gold_ = this.gold + gain;
	}

	loseGold(lost) {
		this.gold_ = this.gold - lost;
	}

	get corn() {
		return this.corn_;
	}

	get gold() {
		return this.gold_;
	}

	get nbUnite() {
		return this.nbUnite_;
	}

	get farm() {
		return this.farm_;
	}

	get id() {
		return this.id_;
	}

	get nbHealthyUnit() {
		return this.nbHealthyUnit_;
	}

	endWorld() {
		clearInterval(this.cityInterval_);
	}
}

module.exports = {City};
