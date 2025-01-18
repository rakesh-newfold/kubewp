export interface ConfigAnswers {
  namespace: string;
  deploymentName: string;
  wordpressImage: string;
  dbHost: string;
  dbUser: string;
  dbPassword: string;
  dbName: string;
  minReplicas: number;
  maxReplicas: number;
  cronjobName: string;
  schedule: string;
  cronjobImage: string;
  command: string;
  ingressName: string;
  host: string;
  serviceName: string;
  servicePort: number;
}
