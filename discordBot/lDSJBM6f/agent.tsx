import React from 'react';
import {
  Agent,
  Discord,
} from 'react-agents';

//

export default function MyAgent() {
  return (
    <Agent /* */ >
      <Discord
        token="paste your token here"
        channels={["general"]}
      />
    </Agent>
  );
}
