import { useEffect } from 'react';

interface TwitterEmbedProps {
  tweetId: string;
}

const TwitterEmbed: React.FC<TwitterEmbedProps> = ({ tweetId }) => {
  useEffect(() => {
    // Load Twitter widget script
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <blockquote className="twitter-tweet" data-dnt="true">
      <a href={`https://twitter.com/x/status/${tweetId}`}>Loading tweet...</a>
    </blockquote>
  );
};

export default TwitterEmbed;