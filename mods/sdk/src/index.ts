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
import Acls from "./acls"
import Agents from "./agents"
import Domains from "./domains"
import Credentials from "./credentials"
import Peers from "./peers"
import Numbers from "./numbers"
import Trunks from "./trunks"

const SDK = {
  Acls,
  Agents,
  Domains,
  Numbers,
  Peers,
  Trunks,
  Credentials
}

export { SDK as default }
