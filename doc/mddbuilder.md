# MDDBuilder <!-- {docsify-ignore-all} -->

## Common MDD
### Universal
**Definition** :  
The universal MDD is the MDD that contains every possible solutions for a given domain. That is, `MDDUniversal ∩ MDD = MDD` and `MDDUniversal ∪ MDD = MDDUniversal`.  

**Creation** :  
`MDDBuilder.universal(MDD mdd, Domains D, int size)`  
> `mdd` is the MDD that will stock the result, `D` is the domain of the MDD and `size` is the size of the MDD.

**Example** :  
```java
// D[i] = {0,1,2,3,4} for each layer
Domains D = Domains.create(10); // 10 variables
// Equivalent to D.fillAll(D.size(), 0, 5);
for(int i = 0; i < D.size(); i++) {
  for(int v = 0; v < 5; v++) D.set(i, v); // Set the value v in the domain of the ith variable
}
MDD universal = MDDBuilder.universal(MDD.create(), D);
```

## Arithmetic Constraints
**Definition** :  
Given a set of variables `X`, an arithmetic constraint is a mathematical formula linking variables in `X` together.  
It can be a simple formula (`x + y = 5`), or it can be more complex (`(|x - y| * z)^(a + 1) <= |x - b| + a`).  

### ArithmeticModel

**Priorities** :
1. Parenthesis and absolute
2. Power
3. Multiplication and division
4. Addition and substraction
5. Left to right

**Syntax** :  
- Variables : `{x}` with x the index of the variable.
- Operator :  
  - Plus : `+`
  - Minus : `-`
  - Multiply : `*`
  - Divide : `/`
  - Power : `^`
- Special :
  - Absolute : `| ... |`
  - Parenthesis : `( ... )`

**Example** :
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

?> Adding an expression to the model `model.addExpression` performs a logical AND. If you want an OR, you must build different models, build them then perform the union of the DDs.  
This is done this way because the union is a simple operation for Decision Diagrams, as it does not decompress the structure.


## Global Constraints
### Among
**Definition** :  
Given `X` a set of variables, `l` and `u` two integers with `l <= u` and `V` a set of values.  
The **among** constraint ensures that at least `l` variables of `X` and at most `u` will take a value in `V`.  
Consider each variable's domain to be `D = {0,1,2}`, `V = {1}`, `l = 1` and `u = 2`. For a solution of size 5, we can have :  
```java
[0,1,2,1,0] is a solution because the value 1 is taken two times (l <= 2 <= u)
[0,2,2,0,2] is not a solution because the value 1 is never taken  (0 < l)
[1,1,0,2,1] is not a solution because the value 1 is taken three times  (u < 3)
````

**Creation** :  
`MDDBuilder.among(MDD mdd, int q, int min, int max)`  
`MDDBuilder.among(MDD mdd, Domains D, SetOf<Integer> V, int q, int min, int max)`  
> `mdd` is the MDD that will stock the result, `q` is the size of the MDD, `min (= l)` is the minimum and `max (= u)` is the maximum number of time a value must be taken.  
> `D` and `V` are respectively the domains of variables and V the values that are constrained. In particular, `V` is a subset of `D`.

**Example** :  
```java
MDD among = MDDBuilder.among(MDD.create(), 5, 1, 2); // D[i] = {0,1} for each i, V = {1}

Domains D = Domains.create(5);
SetOf<Integer> V = Memory.SetOfInteger();
// D[i] = [0, 9] for each i, V = [0, 4]
for(int i = 0; i < 5; i++) {
    D.fill(i, 0, 9);
    V.add(i);
}
MDD among10 = MDDBuilder.among(MDD.create(), D, V, 5, 1, 2);
```

***

### Sequence
**Definition** :  
The **sequence** constraint is a conjunction of sliding **among** constraints.  
Given `X` a set of variables, `q`, `l` and `u` three integers with `l <= u` and `V` a set of values. The **sequence** constraint holds if and only if for `1 <= i <= n[q]+1`, `among({x[i],...,x[i+q−1]}, V, l, u)` holds.  
Consider the same example as the among constraint. We consider the sequence constraint defined over 6 variables.
```java
[0,1,2,1,0,1] is not a solution : 
[0,1,2,1,0]   taken two times (l <= 2 <= u)
  [1,2,1,0,1] taken three times (u < 3)

[1,0,0,2,1,0] is a solution
[1,0,0,2,1]   taken two times (l <= 2 <= u)
  [0,0,2,1,0] taken one time (l <= 1 <= u)
````

**Creation** :  
`MDDBuilder.sequence(MDD mdd, int q, int min, int max, int size)`  
`MDDBuilder.sequence(MDD mdd, Domains D, SetOf<Integer> V, int q, int min, int max, int size)`  
> `mdd` is the MDD that will stock the result, `q` is the size of the **among** constraint, `min (= l)` is the minimum and `max (= u)` is the maximum number of time a value must be taken, and `size` is the size of the MDD.
> `D` and `V` are respectively the domains of variables and V the values that are constrained. In particular, `V` is a subset of `D`.

**Example** :  
```java
MDD sequence = MDDBuilder.sequence(MDD.create(), 5, 1, 2, 6); // D[i] = {0,1} for each i, V = {1}

Domains D = Domains.create(6);
SetOf<Integer> V = Memory.SetOfInteger();
// D[i] = [0, 9] for each i, V = [0, 4]
for(int i = 0; i < 5; i++) {
    D.fill(i, 0, 9);
    V.add(i);
}
MDD sequence6 = MDDBuilder.sequence(MDD.create(), D, V, 5, 1, 2, 6);
```

> **Note** :  
> In certain case, it is better to generate over a binary domain. You can call the [replace arcs' values function](https://github.com/JungVictor/MDDLib/wiki/Operations#replace-arcs-values) over the MDD to replace the 1 by `V` and 0 by `D \ V`.
> It can be better in the case of intersection with other constraints defined over the same `D` and `V` and that can be abstracted to a binary model without loss. For instance, the GCC defined over the binary domain is simply a sum.

***

### Sum
**Definition** :  
Given `X` a set of variables, `l` and `u` two integers with `l <= u` and `V` a set of values.  
The **sum** constraint ensures that the sum of values taken by the variables of `X` is at least `l` and at most `u`.  

**Creation** :  
`MDDBuilder.sum(MDD mdd, int s_min, int s_max, int size, Domains D)`  
> `mdd` is the MDD that will stock the result, `s_min (= l)` is the minimum and `s_max (= u)` is the maximum value of the sum, `size` is the size of the MDD and `V` is the set of values.  

You can also call the variants :  
- `MDDBuilder.sum(MDD mdd, int s_min, int s_max, int size, SetOf<Integer> V)` where `D[i] = V` for each i
- `MDDBuilder.sum(MDD mdd, int s, int size, Domains D)` where s_min = s_max = s
- `MDDBuilder.sum(MDD mdd, int s, int size, SetOf<Integer> V)` where s_min = s_max = s and `D[i] = V` for each i
- `MDDBuilder.sum(MDD mdd, int s, int size)` where s_min = s_max = s and `D[i] = {0,1}` for each i

**Example** :  
```java
// V = {0,1,2,3,4,5,6,7}
SetOf<Integer> V = Memory.SetOfInteger();
for(int i = 0; i < 8; i++) V.add(i);
Domains D = Domains.create(10);
MDD sum = MDDBuilder.sum(MDD.create(), 10, 20, 10, V); // sum of 10 variables between 10 and 20 with V = [0,7]
MDD binsum = MDDBuilder.sum(MDD.create(), 5, 12); // sum of 12 variables is 5 with V = {0,1}

D.fillAll(D.size(), -4, 10);
MDD sumdomain = MDDBuilder.sum(MDD.create(), 10, 20, 8, D); // sum of 8 variables between 10 and 20 with V = [-4, 10]
```

***

### GCC
**Definition** :  
A **global cardinality constraint** is a constraint in which each value `v[i] ∈ V` is associated with two positive integers `l[i]` and `u[i]` with `l[i] <= u[i]`. Each value `v[i]` must be taken between `l[i]` and `u[i]` times.  
Consider `V = {0,1,2,3}` and the associations `0 -> [1, 3]` and `1 -> [0, 2]`.
```java
[0,2,3,3,2] is a solution
[1,2,3,3,2] is not a solution (0 is never appearing)
[1,2,0,1,1] is not a solution (1 is appearing three times)
```

**Creation** :  
`MDDBuilder.gcc(MDD mdd, int size, MapOf<Integer, TupleOfInt> couples, Domains D)`  
> `mdd` is the MDD that will stock the result, `size` is the size of the MDD, `couples` is the map of associations and `D` is the domain.

**Example** :  
```java
Domains D = Domains.create(5);
// D[i] = {0,1,2,3}
D.fillAll(D.size(), 0, 3);

MapOf<Integer, TupleOfInt> couples = Memory.MapOfIntegerTupleOfInt();
couples.put(0, TupleOfInt.create(1,3)); // 0 -> [1, 3]
couples.put(1, TupleOfInt.create(0,2)); // 1 -> [0, 2]

MDD gcc = MDDBuilder.gcc(MDD.create(), 5, couples, D);

// You can also define the GCC over some variables, not all
// Here, we define the GCC constraint over x0, x1, x2 and x4
SetOf<Integer> variables = Memory.SetOfInteger();
variables.add(0); variables.add(1); variables.add(2); variables.add(4);

MDD rGcc = MDDBuilder.gcc(MDD.create(), 5, couples, D, variables);
```

***

### AllDiff
**Definition** :  
Given `X` a set of variables, and `V` a set of values.  
The **alldiff** constraint ensures that all values taken in `V` by the variables of `X` are all different.  
**Remark** : The **alldiff** constraint is a GCC where each value `v ∈ V` is binded to `v -> [1, 1]`.  

**Creation** :    
`MDDBuilder.alldiff(MDD mdd, Domains D, SetOf<Integer> V, int size, SetOf<Integer> variables)`  
or `MDDBuilder.alldiff(MDD mdd, Domains D, SetOf<Integer> V, int size)`  
or `MDDBuilder.alldiff(MDD mdd, SetOf<Integer> V, int size)`  
> `mdd` is the MDD that will stock the result, `V` is the set of values that are constrained, `D` is the domain, `size` is the size of the MDD and `variables` are the variables constrained by the AllDifferent.  

**Example** :  
```java
// V = {0,1,2,3}
SetOf<Integer> V = Memory.SetOfInteger();
for(int i = 0; i < 4; i++) V.add(i);
MDD alldiff = MDDBuilder.allDifferent(MDD.create(), V, 4);

// Equivalent code with domains
Domains D = Domains.create(4);
D.fillAll(D.size(), 0, 3);
MDD alldiff = MDDBuilder.allDifferent(MDD.create(), D, V, D.size());

// The allDifferent is now defined over x0, x1 and x3
variables.add(0); variables.add(1); variables.add(3);
MDD alldiff = MDDBuilder.allDifferent(MDD.create(), D, V, D.size(), variables);
```

> **Note** :  
> If `D = V` then the size of the alldiff MDD is *at most* `|V|` (otherwise, the constraint cannot be satisfied).

***

### Inequalities
**Definition** :  
Given `X` a set of variables, and `V` a set of values and `OP` an inequality operator (`<`, `<=`, `>`, `>=`, `==`, `!=`).  
The inequality MDD ensures that, for every `x[i] ∈ X`, `x[i] OP x[i+1]`
```java
[0,1,2,3,4] is a solution for OP = {<, <=, !=}.
[0,0,1,2,4] is a solution for OP = {<=}.
[4,3,2,1,0] is a solution for OP = {>, >=, !=}
[0,1,0,1,0] is a solution for OP = {!=}.
```
 
**Creation** :  
- `<` : `MDD lt(MDD mdd, int size, ArrayOfInt V)` 
- `<=` : `MDD leq(MDD mdd, int size, ArrayOfInt V)`  
- `>` : `MDD gt(MDD mdd, int size, ArrayOfInt V)`  
- `>=` : `MDD geq(MDD mdd, int size, ArrayOfInt V)`  
- `==` : `MDD eq(MDD mdd, int size, ArrayOfInt V)`  
- `!=` : `MDD neq(MDD mdd, int size, ArrayOfInt V)`  


**Example** :  
```java
// V = {0,1,2,3,4}
ArrayOfInt V = Memory.ArrayOfInt(5);
for(int i = 0; i < V.length(); i++) V.set(i,i);

MDD lt = MDDBuilder.lt(MDD.create(), 5, V);   // <
MDD geq = MDDBuilder.geq(MDD.create(), 5, V); // >=
MDD neq = MDDBuilder.neq(MDD.create(), 5, V); // !=
```
