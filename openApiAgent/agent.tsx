import React from "react";
import { Agent, Action, PendingActionEvent, Prompt } from "react-agents";
import dedent from "dedent";
import { z } from "zod";

import { createApiClient } from "./api"; // Ensure correct import path

const apiClient = createApiClient("https://petstore.swagger.io/v2");

// Dynamically generate actions from API endpoints
const OpenAPIActionGenerator = () => {

  const endpoints = apiClient.api;

  const actions = endpoints.map((endpoint) => {
    const reducedEndpointParameters = endpoint.parameters?.reduce(
      (acc, param) => {
        // @ts-ignore
        if (param.type === "Query") {
          acc.query = acc.query.extend({
            [param.name]: param.schema || z.unknown(),
          });
        } else if (param.type === "Body") {
          acc.body = acc.body.extend({
            [param.name]: param.schema || z.unknown(),
          });
        }
        return acc;
      },
      {
        query: z.object({}),
        body: z.object({}),
      }
    ) || null;

    if (!reducedEndpointParameters) {
      console.log("endpoint.alias", endpoint.alias);
      console.log("typeof endpoint", typeof endpoint);
      console.log("endpoint", endpoint);
      return null
    }

    // Decide whether to merge or separate query and body
    const hasQuery =
      Object.keys(reducedEndpointParameters?.query?.shape || {}).length > 0;
    const hasBody =
      Object.keys(reducedEndpointParameters?.body?.shape || {}).length > 0;

    const hasSeparateQueryAndBody = hasQuery && hasBody;

    let schema;

    if (hasSeparateQueryAndBody) {
      // Keep query and body separate
      schema = z.object({
        query: reducedEndpointParameters.query,
        body: reducedEndpointParameters.body,
      });
    } else if (hasQuery) {
      // Only query exists, merge into the root schema
      schema = z.object({
        query: reducedEndpointParameters.query,
      });
    } else if (hasBody) {
      // Only body exists, merge into the root schema
      schema = reducedEndpointParameters.body;
    } else {
      // No query or body parameters
      schema = z.null()
    }

    if (!schema) {
      return null;
    }


    return (
      <Action
        key={endpoint.alias}
        name={endpoint.alias}
        schema={schema}
        examples={[]}
        description={
          endpoint.description ||
          `Perform ${endpoint.method.toUpperCase()} request to ${endpoint.path}`
        }
        handler={async (e: PendingActionEvent) => {
          try {
            const args = e.data.message.args as any;

            // Use Zodios client method to make the API call
            const response = await apiClient[endpoint.alias]({
              ...(args?.query ? { queries: args.query } : (args?.body || args)), // Include query, body, or any additional parameters
            });

            let limitedResponse = response;
            
            // Limit response to 10 items if it's an array
            if (Array.isArray(response)) {
              // @ts-ignore
              limitedResponse = response.slice(0, 10);
            }

            const monologueString = dedent`\
You took the action ${endpoint.alias}. You sent:
${JSON.stringify(args)} 
and received in response:
${JSON.stringify(limitedResponse, null, 2)}
`;

            // console.log("monologue string", monologueString);

            await e.data.agent.monologue(monologueString);
            await e.commit();
          } catch (error) {
            console.error(`Error in ${endpoint.alias}:`, error);
            throw error;
          }
        }}
      />
    );
  });

  return (
    <Agent>
      <Prompt>
        You strictly answer based on retrieved data. You strictly take only
        actions you can. If you can't take an action, just say it. If there's an
        error, log the raw error. You can take the following actions:
        {endpoints.map((endpoint) => endpoint.alias).join("\n")}
      </Prompt>
      {actions.filter(Boolean)}
    </Agent>
  );
};

export default OpenAPIActionGenerator;
