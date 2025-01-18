<p align="center">
  <img width="460" height="300" src="kubewp.svg">
</p>


# WP Kubernetes Configuration Generator

KubeWp provides a script to generate Kubernetes YAML files for a WordPress application deployment. The script dynamically generates configuration files for various Kubernetes resources such as:

- Namespace
- Secret
- PersistentVolumeClaim
- Service
- Deployment
- HorizontalPodAutoscaler (HPA)
- CronJob
- Ingress

The goal is to automate the creation of essential Kubernetes resources and simplify the deployment of WordPress applications in a Kubernetes cluster.

## Features

- **Dynamic YAML Generation**: Generate Kubernetes YAML files by providing simple user inputs via command-line prompts.
- **Customizable Templates**: The script uses customizable Handlebars templates to generate the YAML files. Modify the template files to suit your needs.
- **Support for Scaling**: Includes support for Horizontal Pod Autoscaling (HPA).
- **CronJob Scheduling**: Ability to schedule recurring jobs via CronJobs.
- **Ingress Configuration**: Configure an Ingress for routing traffic to your WordPress application.
- **Persistent Storage**: Configure PersistentVolumeClaims for data storage.
- **Environment Variables**: Securely inject MySQL database credentials via Kubernetes Secrets.

## Requirements

- **Node.js** (>= 14.x)
- **npm** or **yarn**
- **inquirer**: For command-line prompts
- **Handlebars**: For templating
- **fs/promises**: For file operations

## Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/rakesh-newfold/kubewp.git
   cd kubewp
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or using yarn
   yarn install
   ```

3. **Build Codebase**:
   ```bash
   npm run build
   # or using yarn
   yarn build
   ```

## Usage

1. Run the script:

   ```bash
   npm run generate
   ```

   The script will prompt you for the following information:

   - Output Folder
   - Namespace
   - Deployment Name
   - WordPress Image
   - Database Details (host, user, password, etc.)
   - Replica counts for HorizontalPodAutoscaler
   - CronJob configuration
   - Ingress and Service details

2. The generated Kubernetes YAML files will be saved in the output directory added during prompt, default is `kubewp`.

3. Apply the generated YAML files to your Kubernetes cluster:
   ```bash
   kubectl apply -f kubewp/
   ```

## Customizing Templates

You can modify the templates located in the `stubs/` directory to change the structure or default values of the generated Kubernetes resources.

### Example Templates:

- **Deployment**: `stubs/deployment.yaml`
- **Secret**: `stubs/secret.yaml`
- **PersistentVolumeClaim**: `stubs/pvc.yaml`
- **Service**: `stubs/service.yaml`
- **HorizontalPodAutoscaler (HPA)**: `stubs/hpa.yaml`
- **CronJob**: `stubs/cronjob.yaml`
- **Ingress**: `stubs/ingress.yaml`

Feel free to adjust these templates to fit your specific requirements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Handlebars](https://handlebarsjs.com/) for templating.
- [Inquirer](https://www.npmjs.com/package/inquirer) for interactive command-line prompts.
