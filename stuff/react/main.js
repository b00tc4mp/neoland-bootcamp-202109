const title =function(){
    return <h1>hola mundo</h1>
}

const title=React.createElement('h1',null,'hola mundo')

const mon=React.createElement('li',null,'Mon')
const tue=React.createElement('li',null,'Tue')
const wed=React.createElement('li',null,'Wed')
const thu=React.createElement('li',null,'Thu')
const fri=React.createElement('li',null,'Fri')

const list=React.createElement('ul',null, mon,tue,wed,thu,fri)

ReactDom.render([title,list],document,getElemenetById('root'))