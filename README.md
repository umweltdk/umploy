# umploy - deploy tool

This is a simple command line tool for making a bash script that can deploy
using [dpl][dpl] from a json document with a syntax very much like the deploy
section from travis.yml

It is meant to be used by a build server for executing the bash script and to
be used for encrypting keys in the file on a developer machine.

## Installing

```
npm install -g umploy
```

## Documentation

At the moment this README is all the documentation there is but since the tool
is heavily inspired by the deploy section for travis much of the
[travis deployment documentation][travis-deployment] applies to this tool as
well with the change that the file format for this tool is in JSON as opposed
to YAML.

Another good place to look for documentation is [dpl][dpl] since that is the
tool that does all the heavy lifting.

## Example deploy document

This ```.umploy.json``` file will deploy the dist folder to the my-cool-site
bucket on S3 if the current branch is master.

```
"dpl": {
  "provider": "s3",
  "access_key_id": "AKITJFVMK6HJNRU7NL5A",
  "secret_access_key": {
    "secure": "GxoyXR2o/Yk6i1CtsBswHWJ0kDlW5K5Vfp/D8BGds5nSfdm="
  },
  "bucket": "my-cool-site",
  "local-dir": "dist",
  "skip_cleanup": true,
  "acl": "public_read",
  "on": {
    "branch": "master"
  }
}
```


## Encrypting a key in an existing document

The tool supports encrypting secrets in the ```.umploy.json`` so that the file can be stored in revision control without compromising the secret.

To encrypt a key you need to have either the environment variable ```UMPLOY_KEY``` with the path to an RSA public key or the variable ```UMPLOY_PRIVATE_KEY``` with the path to an RSA private key defined.

Then if you have a ```.umploy.json``` file with the folowing content:

```
"dpl": {
  "provider": "s3",
  "access_key_id": "AWSKEY",
  "secret_access_key": "hush very secret"
}
```

You can encrypt the secret_access_key with the following command:

```
umploy --encrypt dpl.secret_access_key
```


Which will result in the ```.umploy.json``` file being change like this:

```
"dpl": {
  "provider": "s3",
  "access_key_id": "AWSKEY",
  "secret_access_key": {
    "secure": "GxoyXR2oBb7pXUPh4Mos4oCNI7NZRwF4yAras39TV3w/us5gC4bi9wR3odTNuF7"
  }
}
```

## Testing the script output

To test what the generated script looks like for a given ```.deploy.json```
file simply call the tool with no options:

```
umploy
```

## CAVEAT

* No support for before_deploy and after_deploy scripts
* No support for allow_failure option
* No support for using edge version of dpl
* Only supports branch, tags and condition in on section

[dpl]: https://github.com/travis-ci/dpl
[travis-deployment]: http://docs.travis-ci.com/user/deployment/ "travis deployment documentation"
