for num in range(1, 101):
    output = ""
    if num % 3 == 0:
        output += " Hello"
    if num % 5 == 0:
        output += " World"
    if num % 7 == 0:
        output += " Yoo"
    
    if not output:
        output = num
    
    print(output, end="," if num < 100 else "")
