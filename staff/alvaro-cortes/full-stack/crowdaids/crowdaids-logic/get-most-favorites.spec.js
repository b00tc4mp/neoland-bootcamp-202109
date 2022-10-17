require('dotenv').config()

const { expect } = require('chai')
const getMostFavorites = require('./get-most-favorites')
const { mongoose, models: { User } } = require('../crowdaids-data')

const { env: { MONGO_URL } } = process

describe.only('getMostFavorites', () => {

    before(() => mongoose.connect(MONGO_URL))

    beforeEach(() => User.deleteMany())

    let user1, user2, user3

    beforeEach(async () => {
        user1 = {
            name: 'Wendy Pan',
            username: 'wendypan',
            email: 'wendy@pan.com',
            password: '123123123',
            favorites: [
            {
                idBeach: "590927576a2e4300134fbed8",
                nameBeach: "Venice Breakwater"
            },
            {
                idBeach: "5842041f4e65fad6a7708cdc",
                nameBeach: "La Paloma"
            },
            {
                idBeach: "584204204e65fad6a7709b0d",
                nameBeach: "Recco"
            },
            {
                idBeach: "5842041f4e65fad6a7708e31",
                nameBeach: "Santa Teresa"
            },
            {
                idBeach: "584204214e65fad6a7709cdf",
                nameBeach: "Pipeline Overview"
            },
            {
                idBeach: "5842041f4e65fad6a7708de9",
                nameBeach: "Peahi (Jaws)"
            }
        ]}

        user2 = {
            name: 'Peter Pan',
            username: 'peterpan',
            email: 'peter@pan.com',
            password: '123123123',
            favorites: [
            {
                idBeach: "590927576a2e4300134fbed8",
                nameBeach: "Venice Breakwater"
            },
            {
                idBeach: "5842041f4e65fad6a7708cdc",
                nameBeach: "La Paloma"
            },
            {
                idBeach: "5842041f4e65fad6a7708e31",
                nameBeach: "Santa Teresa"
            },
            {
                idBeach: "584204214e65fad6a7709cdf",
                nameBeach: "Pipeline Overview"
            }
        ]}

        user3 = {
            name: 'Lioenel Messi',
            username: 'messito',
            email: 'leo@messi.com',
            password: '123123123',
            favorites: [
            {
                idBeach: "590927576a2e4300134fbed8",
                nameBeach: "Venice Breakwater"
            },
            {
                idBeach: "5842041f4e65fad6a7708cdc",
                nameBeach: "La Paloma"
            },
            {
                idBeach: "584204204e65fad6a7709b0d",
                nameBeach: "Recco"
            },
            {
                idBeach: "5842041f4e65fad6a7708de9",
                nameBeach: "Peahi (Jaws)"
            }
        ]}

        await User.create(user1)
        await User.create(user2)
        await User.create(user3)
    })

    it('Should succeed when contain some favorites', async () => {

        const res = await getMostFavorites()

        expect(res).to.exist
        expect(user1.favorites).to.deep.include.members(res)
        expect(user2.favorites).to.deep.include.members(res)
        expect(user3.favorites).to.deep.include.members(res)
    })

    after(async () => {
        await User.deleteMany()

        await mongoose.disconnect()
    })
})