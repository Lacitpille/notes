---
title: "Two Paths to 2-Pullbacks: Cones, Representability, and Higher Limits"
date: 2026-04-14
tags: ["category-theory", "higher-categories", "homotopy-theory", "yoneda"]
math: true
---

When formalizing the foundations of $(2,1)$-categories, defining limits rigorously requires handling 2-isomorphisms and their coherences. The 2-fiber product (or 2-pullback) of a cospan is the quintessential example.

There are two primary ways to define a 2-fiber product: via a terminal object in a category of cones (an approach often seen in texts like the Stacks Project), or via a representable pseudofunctor.

This post unpacks the rigorous equivalence between these two definitions and explores the higher categorical structures they reveal.

### The Setup: The Groupoid of Squares

Let $\mathcal{C}$ be a $(2,1)$-category and consider a cospan diagram:

$$A \xrightarrow{f} B \xleftarrow{g} C.$$

For any object $X \in \mathcal{C}$, we define $\mathbf{Sq}(X)$ as the groupoid of 2-commutative squares over this cospan with summit $X$. An object in $\mathbf{Sq}(X)$ is a tuple $(u, v, \alpha)$, where $u: X \to A$ and $v: X \to C$ are 1-morphisms, and $\alpha: f \circ u \Rightarrow g \circ v$ is a 2-isomorphism.

The mapping $X \mapsto \mathbf{Sq}(X)$ naturally extends to a pseudofunctor $\mathbf{Sq}: \mathcal{C}^{\text{op}} \to \mathbf{Grpd}$, where $\mathbf{Grpd}$ is the $(2,1)$-category of groupoids.

### The Two Definitions

**1. The Cone Approach (Stacks Project Style)**

We construct a $(2,1)$-category of cones, $\mathbf{Cone}(f,g)$, where objects are the 2-commutative squares defined above. A 2-fiber product is defined as an object $P$ equipped with a universal square $(p_A, p_C, \alpha_P)$ that is **2-terminal** in $\mathbf{Cone}(f,g)$.

Strictly, this means for any other square $S \in \mathbf{Cone}(f,g)$ with summit $X$, the groupoid of morphisms $\operatorname{Hom}_{\mathbf{Cone}}(S, P)$ is equivalent to the terminal groupoid $\ast$.

**2. The Representability Approach**

A 2-fiber product is an object $P \in \mathcal{C}$ that **represents** the pseudofunctor $\mathbf{Sq}$. This requires a pseudonatural equivalence of groupoids:

$$\operatorname{Hom}_{\mathcal{C}}(-, P) \simeq \mathbf{Sq}(-).$$

For those working on digitizing or formalizing foundations—such as translating Stacks Project machinery into Lean 4 via Mathlib—this second approach is often architecturally superior. It cleanly bypasses the "coherence hell" of explicitly constructing 2-cells and pasting diagrams required to prove terminality in a slice-like category.

### The Bridge: The 2-Yoneda Lemma

The assertion that these two definitions are strictly equivalent is a direct consequence of the **2-Yoneda Lemma**.

- **From Representability to Cones:** If $\operatorname{Hom}_{\mathcal{C}}(-, P) \simeq \mathbf{Sq}(-)$ holds, the 2-Yoneda Lemma dictates that this equivalence is entirely determined by a single "universal element" in $\mathbf{Sq}(P)$. We find this element by evaluating the equivalence at the identity morphism $1_P \in \operatorname{Hom}_{\mathcal{C}}(P, P)$. This universal element is precisely the 2-terminal square $(p_A, p_C, \alpha_P)$ required by the Cone definition.

- **From Cones to Representability:** Conversely, if $P$ is 2-terminal in $\mathbf{Cone}(f,g)$, mapping any object $X$ into $P$ via a morphism $h: X \to P$ induces a square in $\mathbf{Sq}(X)$ by composition with the universal square. The 2-terminal universal property ensures this assignment functor is essentially surjective and fully faithful, yielding the equivalence $\operatorname{Hom}_{\mathcal{C}}(X, P) \simeq \mathbf{Sq}(X)$.

### Deeper Geometry and $\infty$-Categorical Horizons

This equivalence is not just a notational convenience; it exposes fundamental topological and structural realities:

- **Homotopy Pullbacks:** In topological spaces or simplicial sets (viewed through the model category equivalence to a $(2,1)$-category), the 2-fiber product is the **homotopy pullback**. The 2-isomorphism $\alpha$ is literally a path (homotopy) in the mapping space between $f \circ u$ and $g \circ v$.

- **Grothendieck Fibrations:** The data of $\mathbf{Sq}(X)$ describes the fibers of a Street fibration $\mathbf{Cone}(f,g) \to \mathcal{C}$. The 2-limit represents the "global sections" of this fibration.

**The $(\infty, 1)$-Categorical Generalization**

When we step up to $(\infty, 1)$-categories (quasi-categories), the distinction between "cones" and "representability" dissolves elegantly.

Let the cospan be a functor of $\infty$-categories $F: \Lambda^2_2 \to \mathcal{C}$. The $\infty$-category of cones over $F$ is defined using the join of simplicial sets to form the slice $\infty$-category $\mathcal{C}_{/F}$.

The $\infty$-limit is defined simply as a terminal object in $\mathcal{C}_{/F}$. Thanks to the $\infty$-categorical Yoneda lemma, an object $P$ being terminal in this slice category is unconditionally equivalent to an equivalence of mapping spaces (Kan complexes):

$$\operatorname{Map}_{\mathcal{C}}(X, P) \simeq \operatorname{Map}_{\operatorname{Fun}(\Lambda^2_2,\, \mathcal{C})}(\Delta_X, F).$$

By migrating to $(\infty, 1)$-categories, the equivalence observed in the $(2,1)$-categorical case becomes the universal definitional template for all limits, seamlessly managing infinite hierarchies of higher homotopies without manual coherence checks.
