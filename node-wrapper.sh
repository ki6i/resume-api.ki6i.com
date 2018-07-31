#!/bin/bash

CGROUP_FILE='/sys/fs/cgroup/memory/memory.limit_in_bytes'

if [ ! -f ${CGROUP_FILE} ]; then
    echo 'No cgroup file found, unable to tune memory limits - using default (256MB system)'
    NODE_FLAGS="--max_semi_space_size=1 --max_old_space_size=128 --max_executable_size=96"
    exec node ${NODE_FLAGS} "${@}"
fi

AVAIL_MEM=$(cat ${CGROUP_FILE})

if [ -z "${AVAIL_MEM}" ]; then
    echo 'Unable to determine available memory, unable to tune memory limits - using defaults (256MB system)'
    NODE_FLAGS="--max_semi_space_size=1 --max_old_space_size=128 --max_executable_size=96"
    exec node ${NODE_FLAGS} "${@}"
fi

AVAIL_MEM_MB=$(expr $AVAIL_MEM / 1048576)

if [ $AVAIL_MEM_MB -eq 256 ]; then
    echo "Running with flags for 256MB"
    NODE_FLAGS="--max_semi_space_size=1 --max_old_space_size=128 --max_executable_size=96"
elif [ $AVAIL_MEM_MB -eq 512 ]; then
    echo "Running with flags for 512MB"
    NODE_FLAGS="--max_semi_space_size=2 --max_old_space_size=256 --max_executable_size=192"
elif [ $AVAIL_MEM_MB -eq 1024 ]; then
    echo "Running with flags for 1024MB"
    NODE_FLAGS="--max_semi_space_size=8 --max_old_space_size=512 --max_executable_size=384"
else
    echo "No node flags set"
    NODE_FLAGS=""
fi

echo "Starting app with command: node ${NODE_FLAGS} ${@}"
exec node ${NODE_FLAGS} "${@}"
