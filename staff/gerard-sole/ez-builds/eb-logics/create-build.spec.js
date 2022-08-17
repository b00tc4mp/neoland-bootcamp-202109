require( 'dotenv' ).config()

const { expect } = require( 'chai' )
const createBuild = require( './create-build.js' )
const { mongoose, models: { Build, User } } = require( 'eb-data' )
const { ConflictError, FormatError } = require( 'eb-errors' )
const { Types: { ObjectId } } = mongoose

const { env: { MONGO_URL } } = process

describe( 'createBuild', () => {
    before( () => mongoose.connect( MONGO_URL ) )

    beforeEach( () => Build.deleteMany() )
    beforeEach( () => User.deleteMany() )

    let build, user, userId

    beforeEach( () => {
        user = {
            name: 'Wendy Pan',
            username: 'wendypan',
            password: '123123123'
        }

        return User.create( user )
            .then( user => userId = new ObjectId(user.id) )
    } )
    it( 'Should succeed with new build', async () => {

        const arrItemsId2 = [ new ObjectId('61b872fc9bb30b33dbf65c87'), new ObjectId('61b872fc9bb30b33dbf65c88'), new ObjectId('61b872fc9bb30b33dbf65c89'), new ObjectId('61b872fc9bb30b33dbf65c8a'), new ObjectId('61b872fc9bb30b33dbf65c8d'), new ObjectId('61b872fc9bb30b33dbf65c99')]
        const championId2 = new ObjectId('61b872fc9bb30b33dbf65b4c')

        const res = await createBuild( arrItemsId2, championId2, userId )

        const build = await Build.findOne( user.id )

        const { champion, items, userId: resUserId } = build

        expect( build ).to.exist
        expect( champion ).to.deep.equal( championId2 )
        expect( items ).to.deep.equal(arrItemsId2 )

    } )

    after( () =>
        User.deleteMany().then( () =>
            Build.deleteMany()
        )
            .then( () => mongoose.disconnect() ) )
} )
