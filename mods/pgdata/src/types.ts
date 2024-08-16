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
import { CommonConnect as CC } from "@routr/common"

export interface PostgresDataConfig {
  bindAddr: string
  externalServerBindAddr: string
}

export type DBDelegate =
  | Exclude<Exclude<CC.Kind, CC.Kind.UNKNOWN>, CC.Kind.ACL>
  | "accessControlList"

export type PrismaOperation = (request: {
  where: {
    ref: string
  }
  include?: Record<string, unknown>
}) => unknown

export type PrismaFindByOperation = (request: {
  where: {
    [key: string]: boolean | string | number
  }
  include?: Record<string, unknown>
}) => unknown

export type PrismaListOperation = (request: {
  take: number
  skip: number
  cursor: {
    ref: string
  }
  orderBy: Record<string, unknown>
  include?: Record<string, unknown>
}) => unknown

export type PrismaCreateOperation = (request: {
  data: any
  include?: Record<string, unknown>
}) => unknown

export type PrismaUpdateOperation = (request: {
  where: {
    ref: string
  }
  data: unknown
  include?: Record<string, unknown>
}) => unknown
