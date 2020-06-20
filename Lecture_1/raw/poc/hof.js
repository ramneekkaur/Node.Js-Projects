let arr=[4,14,17,23,48,66];


//map function used to add "1" to even element of array and subtract "1" from odd elements of array and is converted to array named numbers

let numbers = arr.map(function(num) {
    
    if(num%2==0)
    {
        return num+1;
    }
    else{
        return num-1;
    }
  })
console.log(numbers);

//here isPrime function is showing which element is prime
  function isPrime(num) {
    if (num <= 1)
        return false;
    else if (num === 2)
        return true;
    else {
        for (let i = 2; i < num; i++)
            if (num % i === 0)
                return false;
        return true;
    }
}

//Here filter is used to show only prime functions using "filter" to filter out prime numbers from the changed array 
console.log(numbers.filter(isPrime));