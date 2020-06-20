let arr=[4,14,17,23,48,66];
var arr1=[];
var arr2=[];
var n;
function mapfn(arr){
  for(let i=0;i<arr.length;i++){
    if(arr[i]%2==0)
    {
        n= arr[i]+1;
    }
    else{
        n= arr[i]-1;
    }
  
arr1.push(n);
}}
mapfn(arr);
console.log(arr1);

  function filterfn(arr1)
  {var n;
      for(let i=0;i<arr1.length;i++)
      {
        if (arr1[i] <= 1)
           arr2.push(arr1[i]);
    else if (arr1[i] === 2)
          arr2.push(arr1[i]);
    else {
        var flag=0;
        for (let j = 2; j < arr1.length; j++)
            if (arr1[i] % j === 0)
                flaf=0;
        flag=1;;
    
if(flag==1){
    arr2.push(arr1[i]);
}}
      }
  }
  
  let tarr=filterfn(arr1);
  console.log(tarr);
