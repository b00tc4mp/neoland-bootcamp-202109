// function getValue(numbers, target) {
//     let copyNumbers = numbers;
//     let copyTarget = target;
//     let valueReturn = 0;

//     if (copyTarget === "max") {
//         // Math.max(copyNumbers[0],copyNumbers[1] ... )
//         valueReturn = Math.max(...copyNumbers);
//     }
//     else if (copyTarget === "min") {
//         valueReturn = Math.min(...copyNumbers);
//     }
//     else if (copyTarget === "avg") {
//         let values = 0;
//         copyNumbers.forEach(function(element) {
//             values += element;
//         });
//         valueReturn = values/copyNumbers.length;
//     }
//     return valueReturn;
// }

function getValue(numbers, target) {
    
    let valueReturn = numbers[0];
    let avgValue = 0;

    for(let i = 0; i < numbers.length; i++) {
        if (target === "max" && valueReturn < numbers[i]) {
            valueReturn = numbers[i];

        } else if (target === "min" && valueReturn > numbers[i]) {
            numbers
            
        } else if (target === "avg") {
            avgValue += (numbers[i] / numbers.length);
            valueReturn = avgValue;
        }
    }
    return valueReturn;
}