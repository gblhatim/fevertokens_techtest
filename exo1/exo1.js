

for (let num = 1; num <= 100; num++) {

    output = "";

    if (num % 3 === 0) {
        output += " Hello";
    }

    if (num % 5 === 0) {
        output += " World";
    }
    
    if (num % 7 === 0) {
        output += " Yoo";
    }

    if(output === ""){
        output += " " + num;
    }

    if(num < 100){
        output += ","
    }

    process.stdout.write(output)
}
