#!/usr/bin/env node
/*
 * Copyright (C) 2024 by Fonoster Inc (https://fonoster.com)
 * http://github.com/fonoster/routr
 *
 * This file is part of Routr
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
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("./tracer").init("pgdata")
import { getLogger } from "@fonoster/logger"
import { BIND_ADDR, EXTERNAL_SERVER_BIND_ADDR } from "./envs"
import pgDataService from "./service"

const logger = getLogger({ service: "pgdata", filePath: __filename })

try {
  pgDataService({
    bindAddr: BIND_ADDR,
    externalServerBindAddr: EXTERNAL_SERVER_BIND_ADDR
  })
} catch (e) {
  logger.error(e)
  process.exit(1)
}
