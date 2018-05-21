const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const {City} = require('../city');

chai.use(chaiAsPromised);
chai.should();

describe('city.js', () => {
	describe('City', () => {
		let c;
		before(() => {
			c = new City();
		});
		after(() => {

		});

		it('should not have created soldier', async () => {
			c.nbUnite.should.be.equal(0);
		});

		it('should get 200 corn', async () => {
			c.gainCorn(200);
			c.corn_.should.be.equals(200);
		});

		it('should create 5 soldier alive and healthy', async () => {
			for (let i = 0; i < 5; i++) {
				c.createUnite();
			}
			c.nbUnite.should.be.equal(5);
			/* C.unite_.is_alive_.every().should.be.equals(true); */
			for (let i = 0; i < c.nbUnite; i++) {
				c.unite_[i].isAlive_.should.be.equals(true);
				c.unite_[i].blessure_.should.be.equals(0);
			}
		});
		it('should kill one soldier', async () => {
			c.unite_[0].killed();
			c.cleanArmy();
			c.nbUnite_.should.be.equals(4);
		});
	});
});
