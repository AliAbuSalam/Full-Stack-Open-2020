import diagnosesJson from '../../data/diagnoses.json';
import { DiagnoseData } from '../types';

const diagnosesData: DiagnoseData[] = diagnosesJson;

const getData = () => {
  return diagnosesData;
};

export default {
  getData
};