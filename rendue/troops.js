
class Troop {
	constructor() {
		this.isAlive_ = true;
		this.age_ = 0;
		this.blessure_ = 0;
	}

	hurt(chance) {
		if (Math.random() < chance) {
			this.blessure_ = chance * 10;
		}
	}

	heal() {
		if (this.blessure > 0) {
			this.blessure_--;
		}
	}

	older() {
		this.age_++;
		if (this.age > 40) {
			if (Math.random() < (this.age - 40) / 10) {
				this.isAlive_ = false;
			}
		}
	}

	killed() {
		this.isAlive_ = false;
	}

	get age() {
		return this.age_;
	}

	get isAlive() {
		return this.isAlive_;
	}

	get blessure() {
		return this.blessure_;
	}
}

module.exports = {Troop};
