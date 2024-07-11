## Infra
- Metrics
- Synthetic monitoring
- Heartbeats

## PPE

- Crypto context manages different secrets for different algorithm
- crypto context => metadata like, algorithm version
- screts => Stored in Hashicorp vault => migrated to AWS Secrets manager
- keys are stored in AWS KMS
- Right now it is a wrapper over AWS KMS and Secrets Manager
- Failover in case of region goes down. Copying keys and others.
- two types of keys Key-encryption-keys(KEK) or masterkey and Data-encryption-keys(DEK)
  - Data Key - hard to rotate because the database has to be re-encrypted
- The KEK is kep inside the KMS in the user AWS account and then it is shared with skyflow AWS account. This enables them to invalidate the key if there is any data leak and make the vault unusable anywhere else
- pdb caches the key (due to performance reasons, it takes 250ms - 500ms to decrypt the key). This means that the above discussed thing does not change, negating the above discussed use case. which is something that would be looked into

## Connections

- Proxy service
- VISA, JP MOrgan, Salesforce use custom code

### SDK

- clie side SDK => Isolation of PII data. Data 