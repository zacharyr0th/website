---
title: "MusicIDE"
date: "2024-10-25"
image: /misc/placeholder.webp
description: ""
tags: ["Music", "AI"]
---

import React from 'react';
import { ContentItem } from '@/lib/types';
import Image from 'next/image';

export const metadata: ContentItem = {
  id: 'music-ide',
  slug: 'music-ide',
  title: 'MusicIDE',
  subtitle: 'Cursor + Musescore for Research & Composition',
  image: '/images/articles/musicIDE-0.webp',
  type: 'article',
  description:
    'An exploration of my annoyances and how Integrated Development Environments will transform the landscape of music production.',
  author: 'Zachary Roth',
  date: 'Aug 2024',
  tags: ['Music', 'Technology'],
  language: 'en',
};

const MusicIDE: React.FC = () => {
  return (
    <article>
      <Image src="/images/articles/musicIDE-0.webp" alt="MusicIDE" width={1000} height={1000} />

      <p className="tldr">
        I'm forking Musescore and builidng MusicIDE which will incorporate advanced music theory and LLMs directly into the software. 
      </p>
      <p>
        With the advent of LLMs and AI-wrappers, the barriers to entry in the world of technology are breaking. As 
        Chamath put it, the future is not going to be goverened by people who are good at memorizing things and manually doing 
        laborious computations but rather by tastemakers. Tastemakers are those who know what they want because they've seen what they don't. 
        Unfortunately, when money gets involved, sellouts become a problem but true tastemakers create trends and drive innovation when they 
        stick to their actual tastes rather than cater to their corpoate sponsors or audiences.
      </p>
      <p>
        The more personal something is, the more universal it is.
      </p>
      <p>
        Dominant notation softwares like Sibelius are limited, static, and require painstaking attention to detail throughout every step of the process. In 
        order to substitute a Db Neopolitan 6 chord in first inversion across 18 instruments for the dominant chord in a symphonic score, the chord must be diagnosed and 
        each note must be inputted individually across the instruments. Editing this on paper is one thing but in a notation program, its so annoying. Keyboard shortcuts and MIDI input help but we need more.
      </p>
      <p>
        With MusicIDE, a goal is to be able to prompt the system to do this in the same way that
        Cursor does - to generate and apply all the changes while giving me the option to further edit the changes before accepting them. This tool will know
        that you're in the key of C and will generate a Db chord with an F in the bass. In order to do that, it needs to know what a Neopolitan chord is, what the 6 means, what the notes are in every key, and be able to 
        subsitute the current notes for the new ones across all the instrumemts. Traditionalists will say this is blasphemy and they have a point. How will all the other notes be input? Will there be parallel 5ths that bring
        horror to every music teacher in hearing distance? Will appogiaturas be considered? Does the counterpoint make sense? Why this note here instead of there?
      </p>
      <p>
        These are valid questions and should be considered because every choice matters in music but non-determinism has been thoroughly investigated in the realm of composition and in some sense, having the voicing/counterpoint/music/etc. be 
        generated is just an extension of the non-deterministic outputs that popular composers have been using for over a century. We don't know exactly how these AI models work so we can't predict their exact output - for better or worse. 
      </p>
      <p>
        Generated is the right word but MusicIDE is much more than a generative AI-wrapper. It will also feature exhaustive permutations of music concepts and refernce to historical examples of those concepts. This can help accelerate 
        learning, researching, and writing music in ways that are hard to explain. 
      </p>
      <h3>
        Applications
      </h3>
      <p>
        The overarching goal is to aid individuals in Music Reseach and Music Composition by giving everyone the compositional and anlytical tools 
        that history's greatest musicologists, musicians, and composers have been working with. This means every open source score, textbook, concept from 
        music theory, and analytical resource can be built in to the program to be used as context for learning, researching, and composing music. 
        The longer term roadmap for MusicIDE includes tools to learn music on the instrument of your choosing with the help of AR and guitar-hero inspired visuals. 
      </p>
      <p>

      </p>
    </article>
  );
};

export default MusicIDE;
