---
title: "Two Definitions of the 2-Fiber Product Are the Same"
date: 2026-04-14
tags: ["category-theory", "higher-categories", "homotopy-theory", "yoneda"]
math: true
---

When one first meets higher category theory, a recurring pattern appears: a single concept admits two definitions that are not obviously identical. For the 2-fiber product in a $(2,1)$-category, the definitions are:

- an object that is *terminal* in a suitable category of cones, and
- an object that *represents* a certain pseudofunctor into groupoids.

The natural question is whether these two formulations are equivalent. They are—and the bridge is the **2-categorical Yoneda lemma**.

## Setup

Fix a $(2,1)$-category $\mathcal{C}$ and a cospan

$$A \xrightarrow{f} B \xleftarrow{g} C.$$

For each object $X \in \mathcal{C}$, define the **groupoid of squares** $\mathbf{Sq}(X)$ as follows. An object of $\mathbf{Sq}(X)$ is a triple $(u, v, \alpha)$ where

$$u : X \to A, \quad v : X \to C, \quad \alpha : f \circ u \Rightarrow g \circ v$$

is a 2-isomorphism. A morphism $(u, v, \alpha) \to (u', v', \alpha')$ in $\mathbf{Sq}(X)$ is a pair of 2-isomorphisms $\phi : u \Rightarrow u'$, $\psi : v \Rightarrow v'$ that intertwine $\alpha$ and $\alpha'$ in the evident sense. The assignment $X \mapsto \mathbf{Sq}(X)$ extends to a pseudofunctor

$$\mathbf{Sq} : \mathcal{C}^{\mathrm{op}} \to \mathbf{Grpd}.$$

## Two Definitions

**Definition A (Terminal cone).** Let $\mathbf{Cone}(f,g)$ be the $(2,1)$-category whose objects are pairs $(X, s)$ where $s \in \mathbf{Sq}(X)$. The 2-fiber product is an object $P$ with a distinguished square $(p_A, p_C, \alpha_P) \in \mathbf{Sq}(P)$ that is **2-terminal** in $\mathbf{Cone}(f,g)$: for every other cone $(X, u, v, \alpha)$ the mapping groupoid

$$\mathbf{Cone}(f,g)\bigl((X,u,v,\alpha),\,(P,p_A,p_C,\alpha_P)\bigr) \simeq \{*\}$$

is contractible (a single object with only the identity).

**Definition B (Representability).** The 2-fiber product is an object $P \in \mathcal{C}$ together with a pseudonatural equivalence of groupoids

$$\mathrm{Hom}_{\mathcal{C}}(-, P) \simeq \mathbf{Sq}(-).$$

## Why They Are Equivalent

The equivalence is a direct consequence of the **2-Yoneda lemma**, which states that for any pseudofunctor $F : \mathcal{C}^{\mathrm{op}} \to \mathbf{Grpd}$ and object $P$, pseudonatural transformations $\mathrm{Hom}(-, P) \Rightarrow F$ are in natural equivalence with elements of $F(P)$.

**B $\Rightarrow$ A.** Given a representing equivalence $\mathrm{Hom}(-, P) \simeq \mathbf{Sq}(-)$, evaluate at the identity $\mathrm{id}_P \in \mathrm{Hom}(P, P)$. The 2-Yoneda lemma produces a canonical element

$$(p_A, p_C, \alpha_P) := \eta_P(\mathrm{id}_P) \in \mathbf{Sq}(P).$$

The pseudonaturality of $\eta$ then shows that any cone $(X, u, v, \alpha)$ maps to $(P, p_A, p_C, \alpha_P)$ via a contractible groupoid of choices—exactly the 2-terminal condition.

**A $\Rightarrow$ B.** Given a 2-terminal cone at $P$, define a functor

$$\Phi_X : \mathrm{Hom}(X, P) \to \mathbf{Sq}(X), \qquad h \mapsto (p_A \circ h,\; p_C \circ h,\; \alpha_P \star \mathrm{id}_h).$$

The 2-terminal property guarantees that $\Phi_X$ is essentially surjective (every square over $X$ factors through $P$, up to equivalence) and fully faithful (the factorization is unique up to a unique 2-cell). Hence $\Phi_X$ is an equivalence of groupoids, and these equivalences assemble into a pseudonatural transformation.

The two definitions are thus strictly equivalent. Neither is more fundamental; they are two windows onto the same universal property.

## Connection to Homotopy Theory

This equivalence is not merely an abstract curiosity. Concretely:

- **Homotopy pullbacks.** In a model category (e.g., topological spaces or simplicial sets), the 2-fiber product over a cospan is the *homotopy pullback*. The 2-isomorphism $\alpha : f \circ u \Rightarrow g \circ v$ encodes an explicit homotopy—a path in the relevant mapping space—between $f \circ u$ and $g \circ v$. This is the data that ordinary pullbacks discard.

- **Kan extensions.** The representability formulation reveals that the 2-limit is a right 2-Kan extension of the diagram along the functor to the terminal category.

- **Grothendieck fibrations.** The pseudofunctor $\mathbf{Sq}$ classifies a Street fibration $\mathbf{Cone}(f,g) \to \mathcal{C}$, and the 2-fiber product represents its "global sections."

## The $(\infty,1)$-Categorical Perspective

The cleanest resolution of this equivalence lives one level up, in the world of **$(\infty,1)$-categories** (quasi-categories in the sense of Joyal–Lurie).

There, a cospan is a functor $F : \Lambda^2_2 \to \mathcal{C}$ from the walking cospan, and the $\infty$-categorical slice $\mathcal{C}_{/F}$ plays the role of the cone category. The $\infty$-limit of $F$ is defined as a **terminal object** in $\mathcal{C}_{/F}$.

By the $\infty$-categorical Yoneda lemma, an object $P \in \mathcal{C}_{/F}$ is terminal if and only if there is an equivalence of $\infty$-groupoids (Kan complexes)

$$\mathrm{Map}_{\mathcal{C}}(X, P) \simeq \mathrm{Map}_{\mathrm{Fun}(\Lambda^2_2,\, \mathcal{C})}(\Delta_X, F)$$

for every $X$, where $\Delta_X$ denotes the constant diagram at $X$. This is simultaneously the terminal-cone definition and the representability definition—they are *definitionally* identified in this framework.

The hierarchy of coherences that must be checked by hand in the $(2,1)$-categorical setting (2-cells, their interchangers, pasting identities) is absorbed automatically into the combinatorics of simplicial sets. The equivalence you might first notice as a coincidence at dimension 2 is, from the $\infty$-categorical vantage point, simply how limits are defined.
