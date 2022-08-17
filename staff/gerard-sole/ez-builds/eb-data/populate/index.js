require( 'dotenv' ).config()

const { readdir, readFile } = require( 'fs' ).promises
const path = require( 'path' )
const { mongoose, models: { Champion, Item } } = require( '..' )
const { env: { MONGO_URL } } = process


    ; ( async () => {
        try {
            await mongoose.connect( MONGO_URL )

            // champions

            {
                await Champion.deleteMany()

                const folder = path.join( __dirname, 'champions' )

                const files = await readdir( folder )

                const creates = files.map( async file => {
                    const json = await readFile( path.join( folder, file ), 'utf8' )

                    const { data } = JSON.parse( json )

                    const keys = Object.keys( data )

                    const name = keys[0]

                    const info = data[name]

                    const champion = new Champion( {
                        name: info.name,
                        title: info.title,
                        key: Number( info.key )
                    } )

                    await champion.save()
                } )

                await Promise.all( creates )
            }

            //items

            {
                await Item.deleteMany()

                const files = await readFile( './items/items.json' )

                const json = JSON.parse(files)
                
                const keys = Object.keys(json)
                
                const objects = keys[3]

                const items = json[objects]

                const creates = Object.keys(items).map( async (key) => {

                    const item = items[key]

                    const name = item.name
                   
                    const itemModel = new Item ( {
                        name,
                        key
                    })
                    
                    await itemModel.save()
                    
                })

                await Promise.all( creates )

            }
        } catch ( error ) {
            console.error( error )
        } finally {
            mongoose.disconnect()
        }
    } )()