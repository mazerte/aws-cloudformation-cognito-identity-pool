var CfnLambda = require('cfn-lambda');
var AWS = require('aws-sdk');

var IdentityPool = require('./lib/identity-pool');

function CognitoIdentityPoolHandler(event, context) {
  var CognitoIdentityPool = CfnLambda({
    Create: IdentityPool.Create,
    Update: IdentityPool.Update,
    Delete: IdentityPool.Delete,
    SchemaPath: [__dirname, 'src', 'schema.json']
  });
  // Not sure if there's a better way to do this...
  AWS.config.region = currentRegion(context);

  return CognitoIdentityPool(event, context);
}

function currentRegion(context) {
  return context.invokedFunctionArn.match(/^arn:aws:lambda:(\w+-\w+-\d+):/)[1];
}

exports.handler = CognitoIdentityPoolHandler;
