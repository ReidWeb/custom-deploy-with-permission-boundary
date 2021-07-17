import * as cdk from '@aws-cdk/core';
import {CfnOutput, CfnOutputProps} from '@aws-cdk/core';
import {Bucket, BucketEncryption, BucketProps} from "@aws-cdk/aws-s3";
import {BucketDeployment, BucketDeploymentProps, Source} from "@aws-cdk/aws-s3-deployment";

export class CustomDeployWithPermissionBoundaryStack extends cdk.Stack {
	constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props)

		// The code that defines your stack goes here

		const bucketConfig: BucketProps = {
			websiteIndexDocument: 'index.html',
			websiteErrorDocument: 'index.html',
			publicReadAccess: true,
			encryption: BucketEncryption.S3_MANAGED
		}

		const bucket = new Bucket(this, 'WebsiteBucket', bucketConfig)

		const deploymentConfig: BucketDeploymentProps = {
			sources: [Source.asset('./website')],
			destinationBucket: bucket
		}

		new BucketDeployment(this, 'BucketDeployment', deploymentConfig)

		const outputConfig: CfnOutputProps = {
			description: 'The url of the website',
			value: bucket.bucketWebsiteUrl
		}

		new CfnOutput(this, 'URL', outputConfig)

	}
}
