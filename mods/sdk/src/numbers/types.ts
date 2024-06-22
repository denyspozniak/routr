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
import { CommonConnect as CC } from "@routr/common"
import { CreateBaseOmit } from "../types"

export type CreateNumberRequest = Omit<CC.INumber, CreateBaseOmit | "trunk">

export type CreateNumberResponse = CC.INumber

export type UpdateNumberRequest = { ref: string } & Partial<
  Omit<CreateNumberRequest, "telUrl" | "city" | "country" | "countryIsoCode">
>

export type UpdateNumberResponse = CC.INumber

export type ListNumberRequest = CC.ListRequest

export type ListNumberResponse = CC.ListResponse<CC.INumber>

export type GetNumberResponse = CC.INumber
