import React from 'react';

const RepositoryItem = ({ repo }) => {
  const formatCount = (count) => (count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <img src={repo.ownerAvatarUrl} alt="Owner avatar" style={styles.avatar} />
        <div style={styles.info}>
          <h3 style={styles.title}>{repo.name}</h3>
          <p style={styles.description}>{repo.description}</p>
          <span style={styles.language}>{repo.language}</span>
        </div>
      </div>
      <div style={styles.stats}>
        <div style={styles.statItem}>
          <strong>{formatCount(repo.stargazersCount)}</strong>
          <p>Stars</p>
        </div>
        <div style={styles.statItem}>
          <strong>{formatCount(repo.forksCount)}</strong>
          <p>Forks</p>
        </div>
        <div style={styles.statItem}>
          <strong>{repo.reviewCount}</strong>
          <p>Reviews</p>
        </div>
        <div style={styles.statItem}>
          <strong>{repo.ratingAverage}</strong>
          <p>Rating</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '5px',
    marginBottom: '10px',
  },
  header: {
    display: 'flex',
    marginBottom: '15px',
  },
  avatar: {
    width: '50px',
    height: '50px',
    borderRadius: '5px',
    marginRight: '15px',
  },
  info: {
    flexGrow: 1,
  },
  title: {
    margin: '0 0 5px',
  },
  description: {
    margin: '0 0 10px',
    color: '#586069',
  },
  language: {
    display: 'inline-block',
    backgroundColor: '#0366d6',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '5px',
  },
  stats: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  statItem: {
    textAlign: 'center',
  },
};

export default RepositoryItem;

