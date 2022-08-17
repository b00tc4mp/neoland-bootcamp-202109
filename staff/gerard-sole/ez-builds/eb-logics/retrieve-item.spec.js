require('dotenv').config()

const { expect } = require('chai')
const retrieveItem = require('./retrieve-Item')
const { mongoose, models: { Item } } = require('eb-data')
const { Types: { ObjectId } } = mongoose
const { NotFoundError, FormatError } = require('eb-errors')

const { env: { MONGO_URL } } = process
describe('retrieveItem', () => {

    before(() => mongoose.connect(MONGO_URL))

    beforeEach(() => Item.deleteMany())

    let item

    beforeEach(async () => {
        item = {
            name: 'Botas',
            key: 1001
        }

        const item2 = await Item.create(item)
    })

    it('should succeed with correct name for an already existing Item', async () => {
        const { name, key } = item

        const item2 = await retrieveItem(name)

        expect(item2).to.exist
        expect(name).to.equal(name)
        expect(key).to.equal(key)
        
    })

    it('should fail with incorrect name', async () => {
        const { name } = item
        try {
            await retrieveItem(name)
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal(`Wrong Name`)
        }
    })

    describe('when parameters are not valid', () => {
        describe('when name is not valid', () => {
            it('should fail when name is not a string', () => {
                expect(() => retrieveItem(true, () => { })).to.throw(TypeError, 'query is not a string')

                expect(() => retrieveItem(123, () => { })).to.throw(TypeError, 'query is not a string')

                expect(() => retrieveItem({}, () => { })).to.throw(TypeError, 'query is not a string')

                expect(() => retrieveItem(() => { }, () => { })).to.throw(TypeError, 'query is not a string')

                expect(() => retrieveItem([], () => { })).to.throw(TypeError, 'query is not a string')
            })

            it('should fail when name is empty or blank', () => {
                expect(() => retrieveItem('', () => { })).to.throw(FormatError, 'query is empty or blank')

                expect(() => retrieveItem('   ', () => { })).to.throw(FormatError, 'query is empty or blank')
            })
         })
    })
    after(async () => {
        await Item.deleteMany()

        await mongoose.disconnect()
    })
})