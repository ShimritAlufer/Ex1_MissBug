import { utilService, readJsonFile } from "./src/services/util.service.js"
import { bugService } from './src/services/bug.service.js'

//const bugs = readJsonFile('data/bug.json')
const bugs = bugService.query()
console.log(bugs)