# Printer

The MDDPrinter will print the MDD in the console.  
The MDD will be print layer by layer, node by node.  

For instance, this is the universal MDD with size = 5 and D[v] = [0, 4] for each variable v.
```
Layer 0
root : (0, node0) (1, node0) (2, node0) (3, node0) (4, node0) 

Layer 1
node0 : (0, node1) (1, node1) (2, node1) (3, node1) (4, node1) 

Layer 2
node1 : (0, node2) (1, node2) (2, node2) (3, node2) (4, node2) 

Layer 3
node2 : (0, node3) (1, node3) (2, node3) (3, node3) (4, node3) 

Layer 4
node3 : (0, tt) (1, tt) (2, tt) (3, tt) (4, tt) 

Layer 5
tt
```

## Usage
The MDDPrinter class implements the MDDVisitor interface, which is the [Visitor Pattern](https://en.wikipedia.org/wiki/Visitor_pattern) for MDDs.  
To use it, simply call the `accept` method from your MDD : `mdd.accept(MDDPrinter printer)`. 