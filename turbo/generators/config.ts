// Turborepo Generators configuration (Plop-style API)
// See: https://turbo.build/repo/docs/guides/generating-code

import type { PlopTypes } from '@turbo/gen'
import { join } from 'node:path'

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  const generatorsRoot = plop.getPlopfilePath()
  const basicBase = join(generatorsRoot, 'templates', 'pkg-basic')
  const publishableBase = join(generatorsRoot, 'templates', 'pkg-publishable')

  const buildDestination = (answers: { packagePath?: string; packageName: string }) => {
    const parts = ['packages']
    const packagePath = answers.packagePath?.trim()
    if (packagePath && packagePath !== '/') {
      const pathParts = packagePath.split('/').filter(Boolean)
      parts.push(...pathParts)
    }
    parts.push(answers.packageName)
    return join(...parts)
  }

  plop.setGenerator('pkg-basic', {
    description: 'Internal TS package (src/ only, not published)',
    prompts: [
      { type: 'input', name: 'packageName', message: 'Package name (without scope):', validate: (input: string) => input.length > 0 },
      { type: 'input', name: 'packagePath', message: 'Path within packages/ (e.g. integrations or integrations/payment):', default: '/', filter: (input: string) => input.trim() },
      { type: 'input', name: 'scope', message: 'NPM scope (without @):', default: 'myorg' },
      { type: 'input', name: 'description', message: 'Description:' },
    ],
    actions: (answers: { packagePath?: string; packageName: string }) => {
      const destination = buildDestination(answers)
      return [
        {
          type: 'addMany',
          destination,
          base: basicBase,
          templateFiles: [join(basicBase, '**/*'), join(basicBase, '**/.*')],
          globOptions: { dot: true },
        },
      ]
    },
  })

  plop.setGenerator('pkg-publishable', {
    description: 'Publishable TS package (builds to dist/, publishable to npm)',
    prompts: [
      { type: 'input', name: 'packageName', message: 'Package name (without scope):', validate: (input: string) => input.length > 0 },
      { type: 'input', name: 'packagePath', message: 'Path within packages/ (e.g. integrations or integrations/payment):', default: '/', filter: (input: string) => input.trim() },
      { type: 'input', name: 'scope', message: 'NPM scope (without @):', default: 'myorg' },
      { type: 'input', name: 'description', message: 'Description:' },
    ],
    actions: (answers: { packagePath?: string; packageName: string }) => {
      const destination = buildDestination(answers)
      return [
        {
          type: 'addMany',
          destination,
          base: publishableBase,
          templateFiles: [join(publishableBase, '**/*'), join(publishableBase, '**/.*')],
          globOptions: { dot: true },
        },
      ]
    },
  })
}
