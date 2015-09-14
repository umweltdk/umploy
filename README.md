# umploy - deploy tool

This is a simple command line tool for make a bash script that can deploy using [dpl](https://github.com/travis-ci/dpl) from a json document with a syntax very much like the deploy section from travis.yml

## Installing

```
npm install -g umploy
```

## Example deploy document

This ```.umploy.json``` file will deploy the dist folder to the my-cool-site bucket on S3 if the current branch is master.

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

## Testing the script

