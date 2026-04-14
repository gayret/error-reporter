#!/usr/bin/env node

'use strict'

const fs = require('fs')
const path = require('path')

const TEMPLATE_PATH = path.resolve(__dirname, '../template/error-reporter.config.js')
const DEST_FILENAME = 'error-reporter.config.js'
const DEST_PATH = path.resolve(process.cwd(), DEST_FILENAME)

function main() {
  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error('[error-reporter] Template file not found: ' + TEMPLATE_PATH)
    process.exit(1)
  }

  if (fs.existsSync(DEST_PATH)) {
    console.log(
      `[error-reporter] ${DEST_FILENAME} already exists in this directory. ` +
        'Remove it first if you want to regenerate it.',
    )
    process.exit(0)
  }

  fs.copyFileSync(TEMPLATE_PATH, DEST_PATH)
  console.log(`[error-reporter] Created ${DEST_FILENAME} in ${process.cwd()}`)
  console.log('[error-reporter] Open the file and adjust the settings to your needs.')
}

main()
