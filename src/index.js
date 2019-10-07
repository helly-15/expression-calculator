function eval() {
    // Do not use eval!!!
    return;
}

function isDigit(c) {
    return c >= '0' && c <= '9';
}

function expressionCalculator(expr) {
    // write your solution here
    let arrayExpr=[];
    let arrayStack=[];
    let arrayFirst=[];
    let count=0;
    for (let i=0;i<expr.length;i++){
        //console.log ("Array out of expr: " + arrayFirst + ", i: " + i);        
        if (isDigit(expr[i])){
           // console.log ("expr[i]: " + expr[i]);
            count++;
            continue;
        } else if (expr[i]==" ") {
            if (count > 0) {
                arrayFirst.push (expr.slice(i-count,i));
            }
            count = 0;
            continue;
        } else {
            //console.log ("expr.slice(i-count,i): " + expr.slice(i-count,i) + ", i: " + i + ", count: " + count);
            if (count > 0) {
                arrayFirst.push (expr.slice(i-count,i));
            }
            arrayFirst.push (expr[i]);
            count=0;
        }
    }
    if (count > 0) {
        arrayFirst.push (expr.slice(expr.length - count, expr.length));
    }

   //console.log ("Array out of expr: " + arrayFirst);
    
    for (let i=0; i<arrayFirst.length; i++){
       // console.log ("Array stack is: " + arrayStack);
       // console.log ("Array expr is: " + arrayExpr);
        if (arrayFirst[i]>=0){
            arrayExpr.push(+arrayFirst[i]);
        }
        if (arrayFirst[i]=="("){
            arrayStack.push (arrayFirst[i]);
        }
        if (arrayFirst[i]==")"){
            let popStack=arrayStack.pop();            

            while (popStack != "(" && arrayStack.length != 0){
                arrayExpr.push(popStack);
                popStack = arrayStack.pop();   
            }

            if(arrayStack.length == 0 && popStack != "("){
                throw "ExpressionError: Brackets must be paired";
            }

            
        }
        //while ( arrayStack[arrayStack.length-1]!="(" || arrayStack.length>0)


        if (arrayFirst[i]=="+"||arrayFirst[i]=="-"){
           // if(arrayExpr[arrayExpr.length-1]>=0 && arrayExpr[arrayExpr.length-1]>=0){
            
                    while (arrayStack.length>0 && arrayStack[arrayStack.length-1]!="("){
                      arrayExpr.push(arrayStack.pop());  
                    }
                    // arrayExpr.push();
                    
            //}
            arrayStack.push (arrayFirst[i]); 
        }
        if (arrayFirst[i]=="*"||arrayFirst[i]=="/"){
            if (arrayStack[arrayStack.length-1]=="*"||arrayStack[arrayStack.length-1]=="/") {
                arrayExpr.push(arrayStack.pop());
            }
            arrayStack.push (arrayFirst[i]); 
        }
        /*if (arrayFirst[i]=="+"||arrayFirst[i]=="-"||arrayFirst[i]=="*"||arrayFirst[i]=="/"){
           if (arrayExpr[arrayExpr.length-1]>=0 && arrayExpr[arrayExpr.length-1]>=0){
               if (arrayStack[arrayStack.length-1]=="+"){ arrayExpr.push(arrayExpr.pop()+arrayExpr.pop())};
               if (arrayStack[arrayStack.length-1]=="-"){ arrayExpr.push(arrayExpr.pop()-arrayExpr.pop())};
               if (arrayStack[arrayStack.length-1]=="*"){ arrayExpr.push(arrayExpr.pop()*arrayExpr.pop())};
               if (arrayStack[arrayStack.length-1]=="/"){ arrayExpr.push(arrayExpr.pop()/ arrayExpr.pop())};
               arrayStack.pop();
           }
           else arrayStack.push (arrayFirst[i])
        }*/
           
           /* if (arrayStack[arrayStack.length-1]=="*"||arrayStack[arrayStack.length-1]=="/"){
                arrayExpr.push (arrayStack.pop());}
             arrayStack.push (arrayFirst[i]);*/
        
        /*if (arrayFirst[i]=="*"||arrayFirst[i]=="/"){
            while (arrayStack[arrayStack.length-1]=="*" || arrayStack[arrayStack.length-1]=="/"){
                arrayExpr.push (arrayStack.pop());
            }
            arrayStack.push (arrayFirst[i]);
        }*/
        

    };
    //console.log ("Array stack is: " + arrayStack);
    //console.log ("Array expr is: " + arrayExpr);
    for (let i=0;i<arrayStack.length;i++) {
        if (arrayStack[i]=="(") {
            throw "ExpressionError: Brackets must be paired";
        }
    }
    
    let b=arrayStack.length;
    for (let i=0;i<b;i++){
        arrayExpr.push(arrayStack.pop())
    };
   //console.log ("Final Array Expr: "+ arrayExpr);
    let result=0;
    
    for (let i=0; i< arrayExpr.length; i++){
        //console.log(arrayExpr[i])
        if (arrayExpr[i]=="+"){
            result=arrayExpr[i-2]+arrayExpr[i-1];
            arrayExpr[i-2]=result;
            arrayExpr.splice(i-1,2);
            i=i-2;
            //console.log(arrayExpr);
        }
        if (arrayExpr[i]=="-"){
            result=arrayExpr[i-2]- arrayExpr[i-1];
            arrayExpr[i-2]=result;
            arrayExpr.splice(i-1,2);
            i=i-2;
            //console.log(arrayExpr);
        }
        if (arrayExpr[i]=="*"){
            result=arrayExpr[i-2]* arrayExpr[i-1];
            arrayExpr[i-2]=result;
            arrayExpr.splice(i-1,2);
            i=i-2;
           // console.log(arrayExpr);
        }
        if (arrayExpr[i]=="/"){
            result=arrayExpr[i-2] / arrayExpr[i-1];
            arrayExpr[i-2]=result;
            arrayExpr.splice(i-1,2);
            i=i-2;
           // console.log(arrayExpr);
        }
        if (arrayExpr[i]>0){ continue}
        if (arrayExpr[i]==0){ 
            if (arrayExpr[i+1]=="/"){
                throw "TypeError: Division by zero.";
            }
        }
        
    }
    let notRounded =arrayExpr[0];
   return notRounded;     
   
}
//console.log (expressionCalculator(" 91 + 18 / (  42 + 62 + 84 * 95  ) + 30 " ));

module.exports = {
    expressionCalculator
}