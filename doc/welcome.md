# MDDLib <!-- {docsify-ignore-all} -->

!> **The wiki is currently under construction.**  
As such, some pages are not yet written or complete, and some pages might be outdated. We're trying our best to update it as soon as possible.  


MDDLib is distributed under MIT License.

Copyright (c) 2021, Victor JUNG, Jean-Charles RÉGIN & Steve MALALEL.

## What is MDDLib

MDDLib is a library to create and manipulate Multi-valud Decision Diagrams, written in **Java 11**.\
MDDLib is designed to be able to run without a garbage collector. In order to do so, give as JVM option one of the following :  

* `-XX:+UnlockExperimentalVMOptions -XX:+UseEpsilonGC`
* `-XX:+UnlockExperimentalVMOptions -XX:+UseSerialGC`


This library is a work in progress. **As such, we do not guarantee any forward compatibility.** 

## Documentation, Support and Issues
The source code is available at https://github.com/JungVictor/MDDLib.  
The Javadoc is available at https://jungvictor.github.io/javadoc/.

## Tools

### MDDViewer
This allows you to visualise a .dot file on your browser, without having to install anything. This was made using the [viz.js](https://github.com/mdaines/viz.js) library under MIT License.  
MDDLib is able to generate MDDs under .dot format.

[pagelink "MDD2Dot":"#/mdd2dot"]


## Roadmap

* [x] **\[90%]** Adding support for pure Binary Decision Diagrams (BDDs).
  * [x] BDD class and components fully implemented
  * [x] Operations between BDD implemented
  * [ ] Loading / saving in testing phase
* [x] **\[90%]** Adding a proxy MDD type to perform operation without loading the whole MDD.
  * [x] Rewrote the base engine for saving / loading DDs
  * [x] Proxy class and components to implement
  * [x] Operations between DD and proxy to implement
  * [ ] Testing
* [ ] \[0%] Adding support for non-deterministic MDDs.
  * [ ] ND-MDD class and component to implement
  * [ ] Operations between ND-MDD to implement
  * [ ] Operations between ND-MDD and D-MDD to implement