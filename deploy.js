const { resolve } = require('path')
const { readdir } = require('fs').promises
const { readFileSync } = require('fs')
const S3 = require('aws-sdk/clients/s3')

const bucket = process.argv[2]
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

const uploadFile = (s3, file) => {
  const objectKey = file.replace(buildDir, '')
  console.info(`Found file: ${file}\nUploading to: ${objectKey}`)

  const params = {
    Body: readFileSync(file),
    Bucket: bucket,
    Key: objectKey
  }

  return s3.upload(params).promise()
}

const main = async () => {
  const s3 = new S3()
  if (!bucket) {
    throw new Error('Missing bucket arg')
  }

  const uploads = []
  for await (const file of getFiles(buildDir)) {
    uploads.push(uploadFile(s3, file))
  }

  await Promise.all(uploads)
}

main()
