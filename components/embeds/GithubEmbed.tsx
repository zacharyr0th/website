import React from 'react';

interface GithubEmbedProps {
  owner: string;
  repo: string;
  path?: string;
}

const GithubEmbed: React.FC<GithubEmbedProps> = ({ owner, repo, path }) => {
  const baseUrl = `https://github.com/${owner}/${repo}`;
  const embedUrl = path ? `${baseUrl}/blob/main/${path}` : baseUrl;

  return (
    <div className="github-embed">
      <iframe
        src={`${embedUrl}${path ? '?embedded=true' : ''}`}
        width="100%"
        height="500"
        frameBorder="0"
        scrolling="auto"
      ></iframe>
      <p>
        <a href={embedUrl} target="_blank" rel="noopener noreferrer">
          View on GitHub
        </a>
      </p>
    </div>
  );
};

export default GithubEmbed;