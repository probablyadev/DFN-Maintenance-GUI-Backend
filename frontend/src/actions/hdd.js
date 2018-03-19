import {takeLatest} from 'redux-saga/effects';

import {fetchEntity} from '../utils/misc';
import {checkHDD} from '../constants/ActionTypes';
import HDDAPIService from '../utils/api/HDDAPIService';

export const hddSagas = [
  takeLatest(checkHDD.TRIGGER, fetchEntity, checkHDD, HDDAPIService.checkHDD)
];
