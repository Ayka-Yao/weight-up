import { Router } from "express";
import bcrypt from "bcrypt";
import { db } from "../db";
import { users } from "../db/schema";

const express = require('express');
const app = express();

const bcrypt = require('bcrypt');
const saltRounds = 10;

