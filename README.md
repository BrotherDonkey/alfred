# Setup

In order to get started with the Pull Request related commands for azure devops you'll need to ...
- install ts-ndoe globally `yarn global add ts-node`
- [download the azure cli](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-windows?view=azure-cli-latest)
- login
- add devops extensions: `az extension add --name azure-devops`
- add engineering as your default organization: `az devops configure --defaults organization=https://ceapex.visualstudio.com/`
- [optional] add a project as your default: ` az devops configure --defaults project=<project>`


Command to create a pull request

az repos pr create --org=ceapex --project=Engineering --repo=docs-ui 

