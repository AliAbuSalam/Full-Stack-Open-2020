"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientsService_1 = __importDefault(require("../services/patientsService"));
const utils_1 = __importStar(require("../utils"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.json(patientsService_1.default.getNonSensitiveData());
});
router.post('/', (req, res) => {
    try {
        const newPatient = utils_1.default(req.body);
        const addedPatient = patientsService_1.default.addNewPatient(newPatient);
        res.json(addedPatient);
    }
    catch (error) {
        console.log('error: ', error.message);
        res.status(400).json(error.message);
    }
});
router.get('/:id', (req, res) => {
    const idToFetch = req.params.id;
    const patient = patientsService_1.default.getAPatient(idToFetch);
    if (!patient) {
        res.sendStatus(404);
    }
    else {
        res.json(patient);
    }
});
router.post('/:id/entries', (req, res) => {
    const id = req.params.id;
    const entryToAdd = utils_1.parseEntry(req.body);
    const addingEntryToPatient = patientsService_1.default.addEntryToPatient(entryToAdd, id);
    if (!addingEntryToPatient) {
        res.sendStatus(404);
    }
    else {
        res.sendStatus(200);
    }
});
exports.default = router;
