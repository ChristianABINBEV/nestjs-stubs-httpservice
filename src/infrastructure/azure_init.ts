// src/infrastructure/azure_init.ts
import { DefaultAzureCredential } from '@azure/identity';
import { SecretClient } from '@azure/keyvault-secrets';

// Variables a traer de azure vault
const envs = [
  'APP_NAME',
  'APP_AUTHOR',
  'APP_PORT',
  'APP_PROD',
  'APP_SECRET',
  'API_KEY',
  'CUSTOMER_HOST',
  'CUSTOMER_PORT',
  'DB_USER',
  'DB_PASS',
  'DB_NAME',
  'DB_HOST',
  'DB_SSL',
  'DB_PORT',
  'DB_SYNC',
  'DB_MIGRATIONS',
  'DB_LOGGIN',
  'DB_LOAD_ENTITIES',
  'DB_KEEP_CONNECTION',
  'LOGS_QUEUE',
];

export async function loadEnvVars() {
  if (process.env.SKIP_AZURE_VARS == 'true') return;

  const url = `https://${process.env.VAULT_NAME}.vault.azure.net`;
  const credential = new DefaultAzureCredential();
  const client = new SecretClient(url, credential);
  let envVar;

  for await (const env of envs) {
    try {
      if (!process.env[env]) {
        envVar = await client.getSecret(env.replace(/_/g, '-'))
        process.env[env] = envVar.value;
      }
    } catch (error) {
      throw new Error(`Enviroment Variables Error: ${error}`);
    }
  }
}
