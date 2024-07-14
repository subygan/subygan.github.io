import boto3

bedrock = boto3.client(service_name="bedrock")

# Create a model invocation job
bedrock.create_model_invocation_job(
    roleArn="<AWS roleArn >", # RoleArn with permissions to access the model
    modelId="<ModelId>", # ModelId from the model registry
    jobName="<jobname>", # Could bed anything
    inputDataConfig=inputDataConfig,
    outputDataConfig=outputDataConfig
)

# Get the status of a specific model invocation job
bedrock.get_model_invocation_job(
    jobIdentifier="<job ARN from create_model_invocation_job >"
)

# List all model invocation jobs with a specific filter, api is also paginated.
bedrock.list_model_invocation_jobs(
    status="ALL" # Status could be "ALL", "FAILED", "SUCCEEDED", "RUNNING"
 )

# Stop a specific model invocation job
bedrock.stop_model_invocation_job(
    jobIdentifier="<job ARN from create_model_invocation_job >"
)