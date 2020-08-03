# AWS DevOps Toolkit

<p >
  This utility is a general toolkit for various operations related to DevOps with AWS as your cloud provider
</p>

---

## Usage

You can either add this as a `devDependency` of your project, or use it with `npx`

Run the script by using

```bash
npx aws-devops-toolkit [ACTION] [...OPTIONS]
```

Where `ACTION` is a single phrase that will direct the functionality, and `OPTIONS` is a list of flags that configure that action.

A full list can be found [here](docs/README.md)

### Example

```sh
# The quotes are only necessary if you are using spaces in your arguments

npx aws-devops-toolkit recursive-command --file-path '.' -c 'yarn'
```

This will run the [recursive-command](docs/README.md) service, from your current working directory, executing `yarn` every location down your file tree that has a `package.json`.
