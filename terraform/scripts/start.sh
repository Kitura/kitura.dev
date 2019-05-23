#! /usr/bin/env bash

pkill swift
cd .build/release
./kitura.io
cd -
