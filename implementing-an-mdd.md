# Implementing an MDD
This library allows you to create your own MDD with custom operations or properties without having to rewrite all the core functions of MDDs.  
When creating your own structures, it is recommended to use the default Memory Management pattern, so don't hesitate to pay a visit to this page : [Memory Management](allocatorof).

## MDD
To create a custom MDD structure, just create a new class that extends a MDD class, for instance `class MyMDD extends MDD` for the base MDD structure. You will then have to create a constructor matching the `super` one, and implement the `create` functions according to the design pattern for the memory management : [Allocable](https://github.com/JungVictor/MDDLib/wiki/Memory-Management#allocable)
```java
public MyMDD(int allocatedIndex){
    super(allocatedIndex);
}

public static MyMDD create(){
    MyMDD mdd = allocator().allocate();
    return mdd;
}
``` 

The next step is to `@Override` the `MDD()` method, in order to return the custom MDD. This will allow all the base operations to return a `MyMDD` when performing operation between multiples `MyMDD`. You'll have to do the same with `Node` if you intend to use a custom Node structure too (more in the next section).  
```java
@Override
public MDD MDD(){
    return MyMDD.create();
}
```
Notice that you'll have to implement an allocator in order to do things nicely, so I recommend checking out this wiki section : [Create your own allocator](https://github.com/JungVictor/MDDLib/wiki/Memory-Management#allocatorof).  

If you add properties, do not forget to also `@Override` the `free()` and method from the `Allocable` interface to allow memory consumption management. You'll have to call the `super` methods first, then perform your own manipulation.
```java
@Override
public void free(){
    // my operation...
    super.free();
}
```

You might also want to `@Override` the `setRoot(Node root)` function to prevent the MDD from accepting any type of Node as root. For instance, if your MDD perform operations on nodes expecting them to be a certain type, you certainly can't accept Node that are not _at least_ from this type.
```java
@Override
public void setRoot(Node node){
    if(node instanceof MyNode) super.setRoot(node);
    else throw new InputMismatchException("Expected the root to be at least a MyNode !");
}
```

And... that's all. You can now implement custom methods and add custom properties to your MDD. Note that you can extend a custom MDD in the exact same way to benefit its properties and methods.

> **Small note on the `Node()` function in the MDD :**  
> When overriding the function, you might want to follow the base pattern, that is to first ask the root to produce a Node of the same type, then produce a predefined Node type if the root does not exist. This permit to create a new type of Node without having to create a new type of MDD (to override the `Node()` function), which is more flexible.

## Node
To create a custom Node structure, just create a new class that extends a Node class, for instance `class MyNode extends Node` for the base Node structure. You will then have to create a constructor matching the `super` one.   
```java
public MyNode(int allocatedIndex){
    super(allocatedIndex);
}
``` 

The next step is to `@Override` the `Node()` method, in order to return the custom Node. This will allow all the base operations to create the same type of Node as the one you are using, thus filling your MDD with consistant nodes. You'll have to do the same with the function `Node` from the MDD if you are creating a type of Node specifically for a certain MDD.
```java
@Override
public Node Node(){
    return MyNode.create();
}
```
Notice that you'll have to implement an allocator in order to do things nicely, so I recommend checking out this wiki section : [Create your own allocator](https://github.com/JungVictor/MDDLib/wiki/Memory-Management#allocatorof).  

If you add properties, do not forget to also `@Override` the `free()` method from the `MemoryObject` interface to allow memory consumption management. You'll have to call the `super` methods first, then perform your own manipulation.
```java
@Override
public void free(){
    // my operation...
    super.free();
}
```
