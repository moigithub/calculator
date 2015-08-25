var snum="0";

var data=[];
var result = 0;

var ope=["+","-","/","*","%","="];
var isdot = false;
var isop = false; // false = is num.. true = is operation

function display(value){
  $(".display").html(parseFloat(value));
}

$("#bac").click(function(){ 
  data=[];
  snum="0"; 
  isop= false;
  isdot=false;
  display(snum);
});
$("#bce").click(function(){
  data=[];
  snum="0";
  isop=false;
  isdot=false;
  display(snum);
});
$("#b0").click(function(){ 
  // if last button is not operation
  if (isop){
    snum="0";
  } else {
    snum+="0";
  }
  isop=false;
  display(snum);
});
$("#b1").click(function(){ 
  // if last button is not operation
  if (isop){
    snum="1";
  } else {
    snum+="1";
  }
  isop=false;
  display(snum);
});
$("#b2").click(function(){ 
  // if last button is not operation
  if (isop){
    snum="2";
  } else {
    snum+="2";
  }
  isop=false;
  display(snum);
});
$("#b3").click(function(){ 
  // if last button is not operation
  if (isop){
    snum="3";
  } else {
    snum+="3";
  }
  isop=false;
  display(snum);
});
$("#b4").click(function(){ 
  // if last button is not operation
  if (isop){
    snum="4";
  } else {
    snum+="4";
  }
  isop=false;
  display(snum);
});
$("#b5").click(function(){ 
  // if last button is not operation
  if (isop){
    snum="5";
  } else {
    snum+="5";
  }
  isop=false;
  display(snum);
});
$("#b6").click(function(){ 
  // if last button is not operation
  if (isop){
    snum="6";
  } else {
    snum+="6";
  }
  isop=false;
  display(snum);
});
$("#b7").click(function(){ 
  // if last button is not operation
  if (isop){
    snum="7";
  } else {
    snum+="7";
  }
  isop=false;
  display(snum);
});
$("#b8").click(function(){ 
  // if last button is not operation
  if (isop){
    snum="8";
  } else {
    snum+="8";
  }
  isop=false;
  display(snum);
});
$("#b9").click(function(){ 
  // if last button is not operation
  if (isop){
    snum="9";
  } else {
    snum+="9";
  }
  isop=false;
  display(snum);
});
$("#bpoint").click(function(){ 
  if (isdot) return;
  if (isop){
    snum="0";
  } 
  isop=false;
  isdot = true;
  snum+="."; 
  display(snum);
});


$("#bdiv").click(function(){
  putdata("/");
});
  
$("#btimes").click(function(){
  putdata("*");
});
  
$("#bminus").click(function(){
  putdata("-");
});
  
$("#bplus").click(function(){
  putdata("+");
});
  
$("#bpercent").click(function(){
  // example:
  // 1000 * 50 % (should result 500)
  putdata("%");
  /*
  100 * 10 %
  
  10/100 = 0.1
  100 * 0.1 = 10
  -------------
  
  100 + 10%
  10% = 0.1 * 100 = 10
  100+10 = 110
  */
  
  // data = [[100, "*"], [10, "%"]]
  var lon = data.length;
  if (lon<2) {
    // not enough data to process
    console.log("not enough data to process % operation")
    return;
  }
  var percent = data[lon-1][0];  // == 10
  percent = percent/100;      // == 0.1
  var operation = data[lon -2][1];  // *
  var target = data[lon -2][0];  // == 100
  switch(operation){
    case "*":
      var r1 = target * percent; //=== 100 * 0.1 = 10
      data = data.splice(lon-2,0);
      data.push([r1,"*"]);
      break;
    case "/":
      var r1 = target / percent; //=== 100 / 0.1 = 1000
      data = data.splice(lon-2,0);
      data.push([r1,"/"]);
      break;
    case "+":
      var r1 = target * percent; //=== 100 * 0.1 = 10
      var r2 = target + r1;       // 100 + 10 === 110
      data = data.splice(lon-2,0);
      data.push([r2,"+"]);
      break;
    case "-":
      var r1 = target * percent; //=== 100 * 0.1 = 10
      var r2 = target - r1;       // 100 - 10 === 90
      data = data.splice(lon-2,0);
      data.push([r2,"-"]);
      break;
  }
  display(data[data.length-1][0]);
  console.log(data);
  isdot=false;
});
  
$("#bequal").click(function(){
  putdata("=");
  console.log(JSON.stringify(data));
  
  result = 0;
  var num1=0;
  var gotop = false;  // got operation
  var operation, whatop, entry;
  for (var i = 0; i<data.length; i++){
    // data[x][0] == num
    // data[x][1] == operation
    // data = [[1,"+"], [2, "*"], [3, "/"]];
    console.log("i=",i);
    entry = data[i];
    num1 = entry[0];
    whatop = entry[1];
    if (ope.indexOf(whatop)<0 || isNaN(num1)) {
      // no operatior or     is Not a Number
      // error data format.. 
      // this should not happen
      console.log("error data format =",JSON.stringify(data), "num=",num1, "whatop=",whatop,"entry=",entry);
      $(".display").html("error data format");
      return;
    }
    if(i===0){
      result = num1;
      operation = whatop;
      console.log("first op",result, operation);
    } else {
      switch(operation){
        case "+":
          result+=num1;
          break;
        case "-":
          result-=num1;
          break;
        case "*":
          result=result * num1;
          break;
        case "/":
          result=result /num1;
          break;
        // case "%":  // not percent operation.. cuz its a special case.. have his own separace function
      } // end switch

      console.log("result",result, "next op",operation);
      // save next operation
      operation = whatop;
    } // end if
  }// end for
  
  // clear all data
  // save only result
//    var numopepair = [];
//    numopepair.push(result);
//    numopepair.push("=");
  data=[];
  data.push([result,"="]);
  isdot=false;
  display(result);
});


function putdata(operation) {
  console.log("len isop ope",data.length, isop, operation);
  if (data.length===0 ||  !isop){
    // primera entrada OR
    // anterior entrada no es operacion
    // anterior es un numero
    var numopepair = [];
    var num=parseFloat(snum);
    numopepair.push(num);
    numopepair.push(operation);
    snum="0";
    data.push(numopepair);
  } else {
    // if last entry is operation.. 
    // change
    console.log("changed op");
    data[data.length-1][1] = operation;
  }
  isop=true;
  isdot=false;
  console.log(data);
}


$(".display").click(function(){
  console.log(JSON.stringify(data));
});