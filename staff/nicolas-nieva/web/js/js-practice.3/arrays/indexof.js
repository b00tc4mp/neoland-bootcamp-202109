// TODO implement the standalone version of Array.prototype.indexOf()

function indexOf(array, element, index) {
    //use for loot to iterate on array
    //use if flow to identify if element is found
    //return index from element found, otherwise - 1

    for (let i = index ? index: 0; i < array.length; i++) {
        const item = array[i];
        
        if (item === element)
        return i
    }
    return - 1

}