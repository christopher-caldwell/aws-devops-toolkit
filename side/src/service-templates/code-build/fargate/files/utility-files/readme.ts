import { splitAndCapKebab } from '@util/formatting'

/**
 * Writes a README for the global scope
 * @param projectName
 */
const generateReadme = (projectName: string): string => {
  const titleName = splitAndCapKebab(projectName, ' ')
  return `# Pipeline for ${titleName} Job

This is the pipeline to deploy the job.

## Deployment

To deploy this pipeline, run \`yarn deploy:$STAGE\`.

## Manual Overrides

If you want to deploy the code from a specific branch, go to the console, and select **Start Build**.

A screen will come up asking if you want to do any overrides.

Enter the name of the branch in the **Source Version** field. Then select **Start Build**
`
}

export default generateReadme
