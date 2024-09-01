import React from 'react';
import { ContentItem } from '../../../lib/types';
import Image from 'next/image';

export const metadata: ContentItem = {
  id: 'music-ide',
  slug: 'music-ide',
  title: 'MusicIDE',
  subtitle: 'The need for an Integrated Development Environment for Music Production and Research',
  image: '/images/articles/musicIDE-0.webp',
  imageCaption: '',
  pageViews: 0,
  type: 'article',
  description:
    'An exploration of my annoyances and how Integrated Development Environments will transform the landscape of music production.',
  content: '',
  author: 'Zachary Roth',
  date: 'Aug 2024',
  tags: ['Music', 'Technology'],
  readTime: 10,
  likes: 0,
  comments: 0,
  shares: 0,
  language: 'en',
};

const MusicIDE: React.FC = () => {
  return (
    <article>
      <Image src="/images/articles/musicIDE-0.webp" alt="MusicIDE" width={1000} height={1000} />

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.</p>
      
      <h2>Etiam Porta Sem Malesuada</h2>
      
      <p>Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
      
      <h3>Cras Justo Odio</h3>
      
      <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
      
      <h2>Maecenas Sed Diam Eget</h2>
      
      <p>Maecenas sed diam eget risus varius blandit sit amet non magna. Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue. Curabitur blandit tempus porttitor.</p>
      
      <h3>Fusce Dapibus Tellus</h3>
      
      <p>Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</p>
    </article>
  );
};

export default MusicIDE;
