import dotenv from 'dotenv';
import { AgentMain } from 'react-agents/entry.ts';
import userRender from '../../agent.tsx'; // note: this will be overwritten by the build process
import envTxt from '../../.env.txt';
import * as codecs from 'codecs/ws-codec-runtime-edge.mjs';

Error.stackTraceLimit = 300;

//

// CloudFlare Worker Durable Object class
export class DurableObject {
  agentMain: AgentMain;

  constructor(state: any, env: any) {
    const state2 = {
      ...state,
      userRender,
      codecs,
    };
    const auth2 = dotenv.parse(envTxt);
    this.agentMain = new AgentMain(state2, env, auth2);
  }
  async fetch(request: Request) {
    return await this.agentMain.fetch(request);
  }
  async alarm() {
    return await this.agentMain.alarm();
  }
}
