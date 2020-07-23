const { resolve } = require('path')
const { readdir } = require('fs').promises
const { createReadStream } = require('fs')
const S3 = require('aws-sdk/clients/s3')
const CloudFront = require('aws-sdk/clients/cloudfront')
const mime = require('mime-types')

// config
const { bucket, distribution } = require('./deploy.json')
const commitRef = process.argv[2]
const buildDir = resolve(__dirname, 'dist')

async function* getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true })
  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name)
    if (dirent.isDirectory()) {
      yield* getFiles(res)
    } else {
      yield res
    }
  }
}

const uploadFile = async (s3, file) => {
  const objectKey = file.replace(`${buildDir}/`, '')
  console.info(`Found file: ${file}\nUploading to: ${objectKey}`)

  const params = {
    Body: createReadStream(file),
    Bucket: bucket,
    Key: objectKey,
    ContentType: mime.lookup(file) || 'application/octet-stream'
  }

  await s3.upload(params).promise()
  params.Body.close()
}

const invalidateFiles = (files) => {
  const paths = files.map((file) => file.replace(`${buildDir}`, ''))
  const cf = new CloudFront()
  const params = {
    DistributionId: distribution,
    InvalidationBatch: {
      CallerReference: commitRef,
      Paths: {
        Quantity: paths.length,
        Items: paths
      }
    }
  }

  return cf.createInvalidation(params).promise()
}

const main = async () => {
  const s3 = new S3()
  if (!bucket) throw new Error('Missing bucket arg')
  if (!commitRef) throw new Error('Missing Commit Ref')
  if (!distribution) throw new Error('Missing CloudFront distribution')

  const uploads = []
  const html = []

  // upload files to S3
  for await (const file of getFiles(buildDir)) {
    uploads.push(uploadFile(s3, file))
    if (/.+\.html$/.test(file)) {
      html.push(file)
    }
  }

  await Promise.all(uploads)
  await invalidateFiles(html)
}

main()
