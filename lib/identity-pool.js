var AWS = require('aws-sdk');
var CfnLambda = require('cfn-lambda');

var cognito = new AWS.CognitoIdentity({apiVersion: '2014-06-30'});

var toBoolean = function(obj, prop) {
  if (obj[prop] != undefined) obj[prop] = obj[prop] == "true";
}
var toInteger = function(obj, prop) {
  if (obj[prop] != undefined) obj[prop] = parseInt(obj[prop]);
}

var resolveParamsType = function(params) {
  toBoolean(params, "AllowUnauthenticatedIdentities");
  return params
}

var Create = function(params, reply) {
  params = resolveParamsType(params);
  cognito.createIdentityPool(params, function(err, data) {
    if (err) {
      reply(err);
    } else  {
      reply(null, data.IdentityPoolId);
    }
  });
};

var Update = function(physicalId, params, oldParams, reply) {
  params.IdentityPoolId = physicalId;
  cognito.updateIdentityPool(resolveParamsType(params), function(err, data) {
    if (err) {
      console.error(err);
      reply(err);
    } else {
      reply(null, physicalId);
    }
  });
};

var Delete = function(physicalId, params, reply) {
  var p = {
    IdentityPoolId: physicalId
  };
  cognito.deleteIdentityPool(p, function(err, data) {
    if (err) console.error(err)
    reply(err, physicalId);
  });
};

exports.Create = Create;
exports.Update = Update;
exports.Delete = Delete;
