---
title: Workflows of Refactoring
tags:
  - refactoring
---
- Video link: [(70) Martin Fowler @ OOP2014 "Workflows of Refactoring"](https://www.youtube.com/watch?v=vqEg37e4Mkw)

## Test-Driven Development Refactoring
Usually, refactoring is discussed in relation to test-driven development with a technique known as red-green refactoring. The premise of this is as follows:
1. Add a new feature by writing some failing tests
2. Make the tests pass
3. Then refactor the code you wrote

2 and 3 are different steps because, when programming, you have two modes: one for writing new features, one for refactoring. Humans can also only really focus on one thing at a time, so it's better to write down a scrappy solution and then fix it. There are other modes, but again you should always be in one mode at a time. Refactoring and adding functionality also require two fundamentally different mindsets: refactoring preserves functionality, adding function changes functionality


## Litter-Pickup Refactoring
- See something bad in code, fix it.
- Software design has entropy that causes a codebase to tend toward disorder. The way to combat this is to provide a counterforce by refactoring anything that doesn't "look" good
- Always leave something cleaner than it was before you used it
- Lazy refactoring

## Comprehension Refactoring
- After understanding a portion of the codebase, you should change that portion to make the meaning/purpose of that portion clearer
- You should do this because when your understanding is in your head, it's fragile and it's possible you can forget (especially if you really had to do some digging to understand the code). If you write the meaning in the code itself, it'll clarify your thinking by making you write it down and ensure, in the future, you and your team will understand what that code is doing

## Preparatory Refactoring
- "We should've done it this way"
- Changing an old portion of a codebase that makes adding new functionality easier
- Less time to change + add new functionality than just add new functionality in the current state of the codebase

## Planned Refactoring
- Add to project plan to clear up some technical debt in a codebase
- Large scale
- Should be rare, perfect team shouldn't do it at all
- Hard to justify, easier to do a little bit at a time


## Long-Term Refactoring
- Use litter-pickup, comprehension, and preparatory refactoring 
- Clearly define where the codebase should be 
- A strategy is every time you touch a certain portion of the codebase that needs refactoring 

## Why Refactor?
- If you don't pay attention to design on your system, you will slow down. A bad design will make it harder for you to ship features
- Good design should make adding new functionality easy
- Refactoring inherently improves design 




