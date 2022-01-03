# MDD2Dot
The MDD2Dot class is used to convert an MDD into a .dot file.  

?> For more information :
• [DOT Language (Graphviz documentation)](https://www.graphviz.org/doc/info/lang.html)
• [DOT Language (Wikipedia)](https://en.wikipedia.org/wiki/DOT_%28graph_description_language%29)


## Conversion
Simply call the static method `MDD2Dot.convert(MDD mdd, String filename)`. It will create the "filename".dot file at the root of the program directory, in the dot/ directory.  
> If the dot/ directory does not exist, the function will automatically create it.


## Visualisation
To avoid dependencies on the main library, there are no way to visualise the .dot file created from the MDDLib.  
However, you can create the graph represented by the .dot file by installing and using [Graphviz](https://www.graphviz.org/) or by using the online [MDDViewer](https://jungvictor.github.io/MDDViewer/). The latter is more convenient for the user but is limited in term of computational power.

