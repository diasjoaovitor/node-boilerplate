import path from 'path'

const buildCommand = (filenames) => {
  const files = filenames.map((f) => path.relative(process.cwd(), f))
  return [
    `npx eslint --fix ${files.join(' ')} --report-unused-disable-directives --max-warnings 0`,
    `npx prettier --write ${files.join(' --file ')}`,
    `npx jest --runInBand --findRelatedTests ${filenames.join(' ')} --passWithNoTests`
  ]
}

export default {
  '*.{js,ts}': [buildCommand]
}
