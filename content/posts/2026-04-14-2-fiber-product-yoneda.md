---
title: "2-Fiber Products: Terminal Cones vs. Representability"
date: 2026-04-14
tags: ["category-theory", "higher-categories", "homotopy-theory", "yoneda"]
math: true
---

Let $\mathcal{C}$ be a $(2,1)$-category and $A \xrightarrow{f} B \xleftarrow{g} C$ a cospan. For $X \in \mathcal{C}$, let $\mathbf{Sq}(X)$ be the groupoid whose objects are triples

$$u : X \to A, \quad v : X \to C, \quad \alpha : f \circ u \xRightarrow{\sim} g \circ v,$$

and whose morphisms are pairs $(\phi: u \Rightarrow u', \psi: v \Rightarrow v')$ compatible with $\alpha, \alpha'$. This defines a pseudofunctor $\mathbf{Sq} : \mathcal{C}^{\mathrm{op}} \to \mathbf{Grpd}$.

**Definition A.** $P \in \mathcal{C}$ with $(p_A, p_C, \alpha_P) \in \mathbf{Sq}(P)$ is the *2-fiber product* if it is 2-terminal in $\mathbf{Cone}(f,g)$: for every cone $(X, u, v, \alpha)$,
$$\mathbf{Cone}(f,g)\bigl((X,u,v,\alpha),\,(P,p_A,p_C,\alpha_P)\bigr) \simeq \{*\}.$$

**Definition B.** $P$ is the *2-fiber product* if it represents $\mathbf{Sq}$, i.e., there is a pseudonatural equivalence
$$\mathrm{Hom}_{\mathcal{C}}(-, P) \simeq \mathbf{Sq}(-).$$

**Proposition.** Definitions A and B are equivalent.

*Proof.* By the 2-Yoneda lemma, pseudonatural transformations $\mathrm{Hom}(-, P) \Rightarrow F$ correspond to elements of $F(P)$.

$(B \Rightarrow A)$: Evaluate the equivalence $\eta : \mathrm{Hom}(-, P) \simeq \mathbf{Sq}(-)$ at $\mathrm{id}_P$ to obtain
$$(p_A, p_C, \alpha_P) := \eta_P(\mathrm{id}_P) \in \mathbf{Sq}(P).$$
Pseudonaturality of $\eta$ implies every cone $(X, u, v, \alpha)$ maps to $(P, p_A, p_C, \alpha_P)$ through a contractible groupoid of choices.

$(A \Rightarrow B)$: Define
$$\Phi_X : \mathrm{Hom}(X, P) \to \mathbf{Sq}(X), \qquad h \mapsto (p_A \circ h,\; p_C \circ h,\; \alpha_P \star \mathrm{id}_h).$$
The 2-terminal property makes $\Phi_X$ essentially surjective and fully faithful, hence an equivalence. These equivalences assemble pseudonaturally. $\square$

## Remarks

- **Homotopy pullbacks.** In a model category, the 2-fiber product is the homotopy pullback. The 2-isomorphism $\alpha$ encodes an explicit homotopy between $f \circ u$ and $g \circ v$, the data discarded by the ordinary pullback.

- **Kan extensions.** Definition B exhibits the 2-limit as a right 2-Kan extension of the diagram along $\mathcal{J} \to \{*\}$.

- **Grothendieck fibrations.** $\mathbf{Sq}$ classifies a Street fibration $\mathbf{Cone}(f,g) \to \mathcal{C}$; the 2-fiber product represents its global sections.

## $(\infty,1)$-Categorical Formulation

In an $(\infty,1)$-category $\mathcal{C}$, a cospan is a functor $F : \Lambda^2_2 \to \mathcal{C}$. The $\infty$-limit of $F$ is a terminal object in the slice $\mathcal{C}_{/F}$. By the $\infty$-Yoneda lemma this is equivalent to an equivalence of Kan complexes

$$\mathrm{Map}_{\mathcal{C}}(X, P) \simeq \mathrm{Map}_{\mathrm{Fun}(\Lambda^2_2,\,\mathcal{C})}(\Delta_X, F)$$

for all $X$. The two definitions become *definitionally* identical: the terminal-cone and representability conditions collapse into a single statement, with all coherence data handled by the simplicial structure.
