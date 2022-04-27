---
description: Create a MDD from a series of arithmetic constraints
---

# :triangular_ruler: ArithmeticModel <!-- {docsify-ignore-all} -->

To build a MDD corresponding to a series of artihmetic constraint, you must first create a new model : `ArithmeticModel model = new ArithmeticModel();`.

Then, you must add an expression using the method `model.addExpression()`. The expression is given to the model as a String.

You can find below the order of priority and the syntax used to create an expression.

## **Priorities**

1. Parenthesis and absolute
2. Power
3. Multiplication and division
4. Addition and substraction
5. Left to right

## **Syntax**

* Variables : `{x}` with x the index of the variable.
* Operator :
  * Plus : `+`
  * Minus : `-`
  * Multiply : `*`
  * Divide : `/`
  * Power : `^`
* Special :
  * Absolute : `| ... |`
  * Parenthesis : `( ... )`

## **Example**

<!-- tabs:start -->

#### Input

```java
// Number of variables
int N = 3;

// Domains = {0,1,2,3}
Domains D = Domains.create(N);
D.fillAll(N, 0, 3); // Fill domains up to N (not included) with values between 0 and 3 (included)

ArithmeticModel model = new ArithmeticModel();
model.addExpression("|{0} - {1}| <= 1");  // |x0 - x1| <= 1
model.addExpression("{0} != {2}");        // x0 != x2
model.addExpression("|{1} - {2}| > 1");   // |x1 - x2| > 1


MDD result = MDD.create();
model.build(result, D, N);
result.reduce();
```

#### Output

![Graph obtained after the code execution](<../.gitbook/assets/arithmetic (1).png>)

<!-- tabs:end -->

?> Adding an expression to the model `model.addExpression` performs a logical AND. If you want an OR, you must build different models, build them then perform the union of the DDs.  
This is done this way because the union is a simple operation for Decision Diagrams, as it does not decompress the structure.