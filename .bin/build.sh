#!/bin/bash

set -eux
set -o pipefail

time node -v
time npm -v
time yarn -v
time yarn
time npx prisma generate
time yarn serve

echo "done :)"
exit 1
