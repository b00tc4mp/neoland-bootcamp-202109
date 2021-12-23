require('dotenv').config()

const { expect } = require('chai')
const scrapeCTBulletin = require('./scrape-ct-bulletin')
const { mongoose, models: { Bulletin } } = require('proyecto-data')
//const { ConflictError, FormatError } = require('proyecto-errors')
//const bcrypt = require('bcryptjs')

const { env: { MONGO_URL } } = process

describe('CT bulletin scrap', () => {

    before(() => mongoose.connect(MONGO_URL))

 //   beforeEach(() => Bulletin.deleteMany())

    it('should succeed with new Bulletin url', () => {
        // const bulletin = {
        //     title: "Precio de Bitcoin: BTC no logra mantenerse y vuelve a caer un 2%",
        //     url: "https://www.cripto247.com/comunidad-cripto/precio-de-bitcoin-btc-no-logra-mantenerse-y-vuelve-a-caer-un-2-208449",
        //     badge: "COTIZACIÓN"
        // },

        return scrapeCTBulletin('https://es.cointelegraph.com/news/cove-markets-to-join-robinhood-crypto-in-latest-acquisition')
    //         .then(res => {
    //             expect(res).to.be.undefined

    //             return Bulletin.findOne({ url })
    //         })
    //         .then(bulletin => {
    //             expect(bulletin).to.exist
    //             expect(bulletin.title).to.equal(title)
    //             expect(bulletin.url).to.equal(url)
    //             expect(bulletin.badge).to.equal(badge)
    //             //expect(bcrypt.compareSync(password, user.password)).to.be.true
    //         })
     });

    after(() =>
         //Bulletin.deleteMany()
           // .then(() => mongoose.disconnect())
            mongoose.disconnect()
    )

});