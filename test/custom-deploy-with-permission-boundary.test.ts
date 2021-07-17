import {expect as expectCDK, MatchStyle, matchTemplate} from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as CustomDeployWithPermissionBoundary from '../lib/custom-deploy-with-permission-boundary-stack';

test('Empty Stack', () => {
	const app = new cdk.App();
	// WHEN
	const stack = new CustomDeployWithPermissionBoundary.CustomDeployWithPermissionBoundaryStack(app, 'MyTestStack');
	// THEN
	expectCDK(stack).to(matchTemplate({
		"Resources": {}
	}, MatchStyle.EXACT))
});
