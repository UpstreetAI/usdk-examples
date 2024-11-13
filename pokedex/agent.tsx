import React from 'react';
import {
  Action,
  Agent,
  PendingActionEvent,
  TTS,
} from 'react-agents';
import { z } from 'zod';
import dedent from 'dedent'; 

//

const PokemonDexAssistant = () => {

  const fetchPokemonDetails = async (pokemonName: string) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const data = await response.json();
    return data;
  };

  const fetchPokemonAbilities = async (pokemonName: string) => {
    const response = await fetchPokemonDetails(pokemonName);
    const abilities = response.abilities;
    return abilities;
  };

  const fetchPokemonMovesNames = async (pokemonName: string) => {
    const response = await fetchPokemonDetails(pokemonName);
    const moves = response.moves.map(move => move.move.name);
    return moves;
  };

  return (
    <>
    <Action 
      name='fetchPokemonMoves'
      description="Retrieve a list of move names for a given Pokemon from the PokeAPI"
      schema={
        z.object({
          pokemonName: z.string(),
        })
      }
      examples={[
        { 
          pokemonName: 'pikachu',
        },
      ]}
      handler={
        async (e: PendingActionEvent) => {
          const { pokemonName } = e.data.message.args as { pokemonName: string };
          const moves =await fetchPokemonMovesNames(pokemonName);
          const monologueString = dedent`\
            Your character fetched details about a pokemon's moves and discovered the following:
          ` + '\n\n' + moves;
          await e.data.agent.monologue(monologueString);  
          await e.commit();
        }
      }
    />
    <Action
      name="fetchPokemonAbilities"
      description="Retrieve a list of ability names for a given Pokemon from the PokeAPI"
      schema={
        z.object({
          pokemonName: z.string(),
        })
      }
      examples={[
        { 
          pokemonName: 'pikachu',
        },
      ]}
      handler={
        async (e: PendingActionEvent) => {
          const { pokemonName } = e.data.message.args as { pokemonName: string };
          const abilities = await fetchPokemonAbilities(pokemonName);
          const monologueString = dedent`\
            Your character fetched details about a pokemon's abilities and discovered the following:
          ` + '\n\n' + abilities;
          await e.data.agent.monologue(monologueString);  
          await e.commit();
        }
      }
    />
    </>
  );
}

export default function MyAgent() {
  return (
    <Agent /* */ >
      {/* <TTS voiceEndpoint="elevenlabs:uni:PSAakCTPE63lB4tP9iNQ" /> */}
      <PokemonDexAssistant />
    </Agent>
  );
}
