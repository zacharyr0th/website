---
title: 'MusicIDE'
date: '2024-10-25'
image: /misc/placeholder.webp
subtitle: 'Cursor + Musescore for Research & Composition'
description: 'Cursor + Musescore for Research & Composition.'
tags: ['Music', 'AI']
---

<style jsx>{`
 .prose a {
    text-decoration: underline;
    color: var(--color-accent);
 }
 .prose ol {
    list-style-type: decimal;
    margin-left: 2em; /* Adjust as needed for indentation */
    padding-left: 0.5em; /* Add padding if needed */
 }
 .prose ol li {
    margin-bottom: 0.5em;
    color: var(--color-text-primary);
    line-height: 1.5; /* Adjust line height for better readability */
 }
`}</style>

<div class="tldr-section">

I'm building MusicIDE, which will directly incorporate advanced music theory and LLMs into a Cursor/Musescore/Synthesia-like software.

</div>

With the advent of LLMs and AI wrappers, the barriers to entry in the world of technology are breaking. As Chamath put it, the future will not be governed by people who are good at memorizing things and manually doing laborious computations but rather by tastemakers. Tastemakers know what they want because they've seen what they don't. Unfortunately, when money gets involved, sellouts become a problem. True tastemakers create trends and drive innovation by sticking to their actual tastes rather than catering to their corporate sponsors or audiences. In other words, the more personal something is, the more universal it is.

### Notation Landscape

Dominant notation software like Sibelius is limited, static, and requires meticulous attention to detail throughout every step of the process. To substitute a Db Neopolitan 6 chord in first inversion across 18 instruments for the dominant chord in a symphonic score, the chord must be diagnosed, and each note must be inputted individually across the instruments. Editing this on paper is one thing, but in a notation program, it's so annoying. Keyboard shortcuts and MIDI input help, but we need more.

With MusicIDE, a goal is to be able to prompt the system to do this in the same way that Cursor does - to generate and apply all the changes while giving me the option to further edit the changes before accepting them. This tool will know that you're in the key of C and will generate a Db chord with an F in the bass. To do that, it needs to understand what a Neopolitan chord is, what the six means, what the notes are in every key, and be able to substitute the current notes for the new ones across all the instruments. Traditionalists will say this is blasphemy, and they have a point but this isnt traditional music composition.

### Generated Music?

How will all the other notes be input? Will there be parallel 5ths that bring horror to every music teacher in the hearing distance? Will appogiaturas be considered? Does the counterpoint make sense? Why is this note here instead of there? These are valid questions and should be considered because every choice matters in music, but non-determinism has been thoroughly investigated in the realm of composition and, in some sense, having the voicing/counterpoint/music/etc. being generated is just an extension of the non-deterministic outputs famous composers have used for over a century. We don't know precisely how these AI models work, so we can't predict their exact output - for better or worse.

Generated is the right word to use, but MusicIDE is going to be much more than a generative AI wrapper. It will also feature exhaustive permutations of music concepts and references to historical examples of those concepts. This can help accelerate learning, researching, and writing music in ways that will be easier to explain in future articles once demos are made available.

### Applications

The overarching goal is to aid individuals in Music Research and Composition by giving everyone the compositional and analytical tools that history's greatest musicologists, musicians, and composers have been working with.

This means every open-source score, textbook, concept from music theory, and analytical resource can be built into the program to be used as context for learning, researching, and composing music. The longer-term roadmap for MusicIDE includes tools to learn music on the instrument of your choosing with the help of AR and guitar-hero-inspired visuals for the piano.

Its important to emphasize that while AI is useful for generating templates, boilerplates, ideas, and implementations of ideas - ultimately the choices of AI-assisted composers is by the human - the tastemaker.
