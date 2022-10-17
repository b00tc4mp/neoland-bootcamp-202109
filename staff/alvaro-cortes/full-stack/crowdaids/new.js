function nuevoArreglo (numero) {

    const newArray = [];

    for (let i = 1; i <= numero; i++) {

        newArray.push(i);
    }

    return newArray;
}


function similarSplit (palabra) {
    
    const newWord = [];

    for (let i = 0; i < palabra.length; i++) {

        newWord.push(palabra[i]);
    }

    return newWord;
}

function warOfWords (palabra1, palabra2) {

    var abc = {a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,j:10,k:11,l:12,m:13,n:14,o:15,p:16,q:17,r:18,s:19,t:20,u:21,v:22,w:23,x:24,y:25,z:26}
    let mount1 = 0;
    let mount2 = 0;

    for (let i = 0; i < palabra1.length; i++) {
        for (let letra in abc) {
            if (palabra1[i] === letra) {
                mount1 += abc[letra];
            }
        }  
    }

    for (let i = 0; i < palabra2.length; i++) {
        for (let letra in abc) {
            if (palabra2[i] === letra) {
                mount2 += abc[letra];
            }
        }  
    }

    return mount1 >= mount2 ? palabra1 : palabra2
}