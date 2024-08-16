/*
 * Copyright (C) 2024 by Fonoster Inc (https://fonoster.com)
 * http://github.com/fonoster
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
import { CliUx } from "@oclif/core"
import { BaseCommand } from "../../base"
import { CLIError } from "@oclif/core/lib/errors"
import { aclRuleValidator, nameValidator } from "../../validators"
import { stringToAcl } from "../../utils"
import SDK from "@routr/sdk"

// NOTE: Newer versions of inquirer have a bug that causes the following error:
// (node:75345) [ERR_REQUIRE_ESM] Error Plugin: @routr/ctl [ERR_REQUIRE_ESM]: require() of ES Module
import inquirer from "inquirer"

export default class UpdateCommand extends BaseCommand {
  static readonly description = "Updates an existing ACL"

  static readonly examples = [
    `<%= config.bin %> <%= command.id %>
Updating ACL US East... 80181ca6-d4aa-4575-9375-8f72b07d5555
`
  ]

  static readonly args = [
    { name: "ref", required: true, description: "reference to an ACL" }
  ]

  async run(): Promise<void> {
    const { args, flags } = await this.parse(UpdateCommand)
    const { endpoint, insecure, cacert } = flags
    const api = new SDK.Acls({ endpoint, insecure, cacert })

    try {
      const aclFromDB = await api.getAcl(args.ref)

      this.log("This utility will help you update an existing ACL.")
      this.log("Press ^C at any time to quit.")

      const answers = await inquirer.prompt([
        {
          name: "name",
          message: "Friendly Name",
          type: "input",
          default: aclFromDB.name,
          validate: nameValidator
        },
        {
          name: "deny",
          message: "Deny CIDR Networks",
          type: "input",
          default: aclFromDB.deny.join(","),
          validate: aclRuleValidator
        },
        {
          name: "allow",
          message: "Allow CIDR Networks",
          type: "input",
          default: aclFromDB.allow.join(","),
          validate: aclRuleValidator
        },
        {
          name: "confirm",
          message: "Ready?",
          type: "confirm"
        }
      ])

      answers.ref = args.ref

      // Re-assign allow and deny rules as arrays
      answers.allow = stringToAcl(answers.allow)
      answers.deny = stringToAcl(answers.deny)

      if (!answers.confirm) {
        this.warn("Aborted")
      } else {
        CliUx.ux.action.start(`Updating ACL ${answers.name}`)
        const acl = await api.updateAcl(answers)
        await CliUx.ux.wait(1000)
        CliUx.ux.action.stop(acl.ref)
      }
    } catch (e) {
      throw new CLIError(e.message)
    }
  }
}
