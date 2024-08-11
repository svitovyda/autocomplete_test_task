import type { QueryType } from '../../../utils/textSearch';
import React from 'react';
import styled from 'styled-components';

interface HighlightedTextProps {
  text: string;
  query: QueryType;
  caseSensitive?: boolean;
}

const Highlight = styled.span`
  background-color: yellow; /* or any other highlight color */
  font-weight: bold;
`;

export const HighlightedText: React.FC<HighlightedTextProps> = React.memo(
  ({ text, query, caseSensitive = false }: HighlightedTextProps) => {
    if (!query) return <>{text}</>;

    const regex = new RegExp(`(${query})`, caseSensitive ? 'g' : 'gi');
    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, index) =>
          regex.test(part) ? <Highlight key={index}>{part}</Highlight> : part
        )}
      </>
    );
  }
);

HighlightedText.displayName = 'HighlightedText';
