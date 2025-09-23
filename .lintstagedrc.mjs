import path from 'path'

const buildCommand = (filenames) => {
  const files = filenames.map((f) => path.relative(process.cwd(), f))
  return [
    `pnpm eslint --fix ${files.join(' ')} --report-unused-disable-directives --max-warnings 0`,
    `pnpm prettier --write ${files.join(' --file ')}`,
    `pnpm jest --runInBand --findRelatedTests ${filenames.join(' ')} --passWithNoTests`
  ]
}

export default {
  '*.(j|t)s': [buildCommand]
}
