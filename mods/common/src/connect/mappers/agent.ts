/*
 * Copyright (C) 2024 by Fonoster Inc (https://fonoster.com)
 * http://github.com/fonoster/routr
 *
 * This file is part of Routr.
 *
 * Licensed under the MIT License (the "License");
 * you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 *    https://opensource.org/licenses/MIT
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* eslint-disable require-jsdoc */
import { Privacy } from "../../types"
import { AgentConfig } from "../config"
import { schemaValidators } from "../schemas"
import { Agent, Kind } from "../types"
import { assertValidSchema } from "./assertions"

const valid = schemaValidators.get(Kind.AGENT)

export function mapToAgent(config: AgentConfig): Agent {
  assertValidSchema(config, valid)

  return {
    apiVersion: config.apiVersion,
    ref: config.ref,
    name: config.metadata.name,
    username: config.spec.username,
    privacy: config.spec.privacy ?? Privacy.NONE,
    enabled: config.spec.enabled,
    domainRef: config.spec.domainRef,
    credentialsRef: config.spec.credentialsRef,
    maxContacts: config.spec.maxContacts,
    expires: config.spec.expires,
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime()
  }
}
