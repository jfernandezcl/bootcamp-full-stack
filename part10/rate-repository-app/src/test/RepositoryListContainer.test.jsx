import React from 'react';
import { render } from '@testing-library/react-native';
import RepositoryListContainer from '../components/RepositoryListContainer'; // Asegúrate de ajustar la ruta según tu proyecto

// Helper para formatear números como "1.6k"
const formatNumber = (num) => {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`;
  }
  return String(num);
};

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      const { getAllByTestId } = render(
        <RepositoryListContainer repositories={repositories} />
      );

      const repositoryItems = getAllByTestId('repositoryItem');
      const repositoryData = repositories.edges.map(edge => edge.node);

      // Verificar que el número de elementos renderizados coincida con el número de repositorios
      expect(repositoryItems).toHaveLength(repositoryData.length);

      // Validar cada repositorio
      repositoryItems.forEach((item, index) => {
        const {
          fullName,
          description,
          language,
          forksCount,
          stargazersCount,
          ratingAverage,
          reviewCount,
        } = repositoryData[index];

        expect(item).toHaveTextContent(fullName);
        expect(item).toHaveTextContent(description);
        expect(item).toHaveTextContent(language);
        expect(item).toHaveTextContent(formatNumber(forksCount)); // Bifurcaciones formateadas
        expect(item).toHaveTextContent(formatNumber(stargazersCount)); // Estrellas formateadas
        expect(item).toHaveTextContent(String(ratingAverage));
        expect(item).toHaveTextContent(String(reviewCount));
      });
    });
  });
});
