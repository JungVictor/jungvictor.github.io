# Memory Management : MemoryPool

## MemoryPool
The `MemoryPool` is the structure that contains all objects in the pool of memory. It is implemented using an array to stock the objects, and a stack to stock the indices of free objects, i.e their position in the array.  
There are three methods that you can use to manipulate the `MemoryPool` :  
* `add(E element)` to add an element to the pool
* `E get()` to get a free element from the pool
* `free(E element, int position)` to put back the element in the array, and pushing its position back to the stack of free indices.

`MemoryPool` can only hold one type of object, so you must have one `MemoryPool<E>` for each object of type `E` you want to manage.  

When creating a new `MemoryPool<E>`, you can specify its initial capacity (default is 10).
```java
MemoryPool<E> pool = new MemoryPool<>(); // MemoryPool with an initial capacity of 10 object of type E
MemoryPool<E> pool = new MemoryPool<>(int capacity); // MemoryPool with the specified initial capacity
```

!> **IMPORTANT NOTE** :  
`MemoryPool` can only manage objects implementing the `MemoryObject` interface !!

## MemoryObject
`MemoryObject` is an interface that must be implemented if you want your object to be able to be reused. It simply consists of three methods :  
* `prepare()` that is used to _reset_ the object as is if it was newly created
* `free()` that push back the object to the `MemoryPool`. You can clean most references when calling this method.
* `setID(int ID)` only used by the MemoryPool to identify the object in the pool of objects (typically, it is its position in the stack), so there's a high chance that you won't have to use it.

The method `prepare()` is mainly used to allocate objects, while the method `free()` is mainly used to free and clean references.

### Implementation
When implementing this interface, you want your object to have *at least* the following shape :  
```java
// MemoryObject variables
private final MemoryPool<MyObject> pool;
private int ID = -1;
//

// You can have multiples constructors with different arguments
// BUT you must ALWAYS have the MemoryPool as an argument.
public MyObject(MemoryPool<MyObject> pool){ this.pool = pool; }


//**************************************//
//           MEMORY FUNCTIONS           //
//**************************************//
// Implementation of MemoryObject interface

@Override
public void prepare(){
    // allocate variables that are dependent from a memory allocator
}

@Override
public void setID(int ID){ this.ID = ID; }

@Override
public void free(){
    // clean all references and
    // free the variables you have to

    this.pool.free(this, ID); // Free the object
}
```


## Create your own allocator
Creating an allocator is really simple. In order to be robust against the library update, I recommend you create your own static class to hold your allocators, for instance `MyMemory`.  
Then, simply follow this template :  
```java
// The pool to stock all created objects
private static final MemoryPool<MyObject> myObjectPool = new MemoryPool<>();

// The allocator. Arguments are facultatives
public static MyObject MyObject(arguments) {
    MyObject object = myObjectPool.get();  // ask the pool for a free object

    // If the object is null, then it means that there is no free object in the pool
    if (object == null) {
        // Therefore, we must create a new object and add it to the pool
        object = new MyObject(myObjectPool, arguments);
        myObjectPool.add(object);
    }
    // Prepare the object to be usable "as a new object".
    object.prepare();
    
    // Here you can put additional manipulation before returning the object

    return object;
}
```
!> **IMPORTANT** : Your class MyObject **must** implements the MemoryObject interface !  

Now, simply call the function `MyMemory.MyObject()` to get a _new_ MyObject ready for use.  

> **Note** :  
> There is no need to implement a `free()` as the one from `Memory` is universal.
